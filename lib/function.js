// Common helper functions for AKAZA BOT

// Format milliseconds into hh:mm:ss
export function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60
    const minutes = Math.floor(ms / (1000 * 60)) % 60
    const hours = Math.floor(ms / (1000 * 60 * 60))
    return `${hours}h:${minutes}m:${seconds}s`
}

// Capitalize first letter of a string
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

// Simple reply function
export async function reply(sock, jid, text) {
    await sock.sendMessage(jid, { text })
      }
