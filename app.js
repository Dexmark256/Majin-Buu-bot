const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  jidDecode,
} = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const qrcode = require('qrcode-terminal')
const path = require('path')
const log = require('./utils/logger')
const config = require('./config')
const { runCommand } = require('./command')
const { getSender, getMessageText, parseCommand, isOwner, isGroup } = require('./lib/functions')
const { getUser, updateUser } = require('./data/database')

// ─────────────────────────────────────────
//         AKAZA BOT — CORE APP
// ─────────────────────────────────────────

// Load all plugins (registers all commands)
require('./plugins/menu')

// In-memory store to cache chats/messages
const store = makeInMemoryStore({})

const startAkaza = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.join(__dirname, 'sessions', config.sessionName)
  )

  const { version } = await fetchLatestBaileysVersion()
  log.info(`Using WA v${version.join('.')}`)

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: require('pino')({ level: 'silent' }), // silence baileys internal logs
    browser: ['Akaza-MD', 'Chrome', '1.0.0'],
    syncFullHistory: false,
  })

  // Bind store to socket events
  store.bind(sock.ev)

  // ── SAVE CREDENTIALS ──────────────────
  sock.ev.on('creds.update', saveCreds)

  // ── CONNECTION HANDLER ────────────────
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      log.connection('Scan the QR code below to connect Akaza:')
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut

      log.warn(`Connection closed. Status: ${statusCode}`)

      if (shouldReconnect) {
        log.connection('Reconnecting Akaza...')
        startAkaza()
      } else {
        log.error('Akaza was logged out. Please delete the sessions folder and restart.')
      }
    }

    if (connection === 'open') {
      log.success(`Akaza ❄️ connected successfully! 🔥`)
    }
  })

  // ── MESSAGE HANDLER ───────────────────
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return

    for (const msg of messages) {
      if (!msg.message) continue
      if (msg.key.fromMe) continue // ignore self messages

      const sender = getSender(msg)
      const chatJid = msg.key.remoteJid
      const text = getMessageText(msg)
      const inGroup = isGroup(chatJid)
      const senderIsOwner = isOwner(sender)

      // Track user in database
      try {
        const user = getUser(sender)
        updateUser(sender, {
          name: msg.pushName || user.name,
          messageCount: (user.messageCount || 0) + 1,
        })

        // Block banned users
        if (user.banned) {
          log.warn(`Blocked message from banned user: ${sender}`)
          continue
        }
      } catch (err) {
        log.error(`DB error for ${sender}: ${err.message}`)
      }

      // Auto read messages if enabled
      if (config.autoRead) {
        await sock.readMessages([msg.key])
      }

      // Reply helper — sends a message back to the same chat
      const reply = async (text) => {
        await sock.sendMessage(chatJid, { text }, { quoted: msg })
      }

      // React helper — sends a reaction to a message
      const react = async (emoji) => {
        await sock.sendMessage(chatJid, {
          react: { text: emoji, key: msg.key },
        })
      }

      // Build context object passed to every command
      const context = {
        sock,
        msg,
        sender,
        chatJid,
        inGroup,
        isOwner: senderIsOwner,
        args: [],
        reply,
        react,
        store,
      }

      // ── COMMAND ROUTING ───────────────
      if (text) {
        const parsed = parseCommand(text, config.prefix)

        if (parsed) {
          context.args = parsed.args
          log.command(sender, parsed.command)

          const found = await runCommand(parsed.command, context)

          if (!found) {
            await reply(config.messages.unknownCommand(config.prefix))
          }
        }
      }
    }
  })

  // ── GROUP PARTICIPANT UPDATES ─────────
  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    log.info(`Group event [${action}] in ${id} for ${participants}`)
    // Welcome/goodbye messages can be added here later
  })

  return sock
}

module.exports = { startAkaza }
