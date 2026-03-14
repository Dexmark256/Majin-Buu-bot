import { cmd } from "../command.js"

// Registering the ping command
cmd({
    pattern: "ping",
    desc: "Check if bot is working",
    category: "main"
},
async (sock, m) => {
    await sock.sendMessage(
        m.key.remoteJid,
        { text: "🏓 Pong! AKAZA BOT is alive." }
    )
})
