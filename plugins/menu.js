const { addCommand } = require('../command')
const { getCommandsByCategory } = require('../command')
const { getTimestamp, formatUptime } = require('../lib/functions')
const config = require('../config')

// ─────────────────────────────────────────
//         AKAZA BOT — MENU PLUGIN
// ─────────────────────────────────────────

addCommand({
  name: ['menu', 'help'],
  description: 'Show all available commands',
  category: 'general',
  ownerOnly: false,
  handler: async ({ sock, sender, reply }) => {
    const categories = getCommandsByCategory()
    const uptime = formatUptime(process.uptime() * 1000)
    const time = getTimestamp()

    let menu = `
╔═══════════════════════╗
║     *AKAZA ❄️ - MD*       ║
╚═══════════════════════╝

┌─────────────────────
│ 👤 *Bot:* ${config.botName}
│ ⏱️ *Uptime:* ${uptime}
│ 🕐 *Time:* ${time}
│ 📌 *Prefix:* \`${config.prefix}\`
└─────────────────────

*Available Commands:*\n`

    for (const [category, cmds] of Object.entries(categories)) {
      menu += `\n┌── *${category.toUpperCase()}*\n`
      cmds.forEach((cmd) => {
        menu += `│ ${config.prefix}${cmd.name}`
        if (cmd.aliases.length > 0) {
          menu += ` _(${cmd.aliases.map(a => config.prefix + a).join(', ')})_`
        }
        menu += `\n│ ➥ _${cmd.description}_\n`
      })
      menu += `└──────────────────\n`
    }

    menu += `\n> 🤖 *Powered by dante-dev*`

    await reply(menu)
  },
})

addCommand({
  name: 'ping',
  description: 'Check if Akaza is alive',
  category: 'general',
  ownerOnly: false,
  handler: async ({ reply }) => {
    const start = Date.now()
    await reply(`🏓 Pong! *${Date.now() - start}ms*`)
  },
})

addCommand({
  name: 'uptime',
  description: 'Check how long Akaza has been running',
  category: 'general',
  ownerOnly: false,
  handler: async ({ reply }) => {
    const uptime = formatUptime(process.uptime() * 1000)
    await reply(`⏱️ *Akaza* has been running for *${uptime}*`)
  },
})

addCommand({
  name: 'info',
  description: 'Show info about Akaza',
  category: 'general',
  ownerOnly: false,
  handler: async ({ reply }) => {
    await reply(`
╔══════════════════╗
║  *AKAZA ❄️- MD*     ║
╚══════════════════╝

📌 *Prefix:* ${config.prefix}
🤖 *Bot Name:* ${config.botName}
⚙️ *Platform:* WhatsApp Multi-Device
📦 *Library:* Baileys (@whiskeysockets)
👑 *Owner:* ${config.ownerName}

> _Akaza is always watching_ 👁️
    `)
  },
})

// ── OWNER ONLY COMMANDS ──────────────────

addCommand({
  name: 'broadcast',
  description: 'Send a message to all saved chats',
  category: 'owner',
  ownerOnly: true,
  handler: async ({ args, reply }) => {
    if (!args.length) return reply('⚠️ Please provide a message to broadcast.\nUsage: `.broadcast Hello everyone!`')
    // Broadcast logic will be handled in app.js via sock
    await reply(`📢 Broadcast feature coming soon!`)
  },
})

addCommand({
  name: 'shutdown',
  description: 'Shut down the bot',
  category: 'owner',
  ownerOnly: true,
  handler: async ({ reply }) => {
    await reply(`👋 *Akaza* is shutting down... Goodbye!`)
    setTimeout(() => process.exit(0), 1500)
  },
})

addCommand({
  name: 'setname',
  description: 'Change the bot display name',
  category: 'owner',
  ownerOnly: true,
  handler: async ({ args, reply }) => {
    if (!args.length) return reply('⚠️ Provide a new name.\nUsage: `.setname Akaza V2`')
    const newName = args.join(' ')
    config.botName = newName
    await reply(`✅ Bot name updated to *${newName}*`)
  },
})
      
