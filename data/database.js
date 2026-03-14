// Simple in-memory database for AKAZA BOT

const db = {
    users: {},       // stores user info
    chats: {},       // stores chat-specific settings
    stats: {}        // stores bot statistics
}

// Get value from db safely
export function get(path, defaultValue = null) {
    return path.split(".").reduce((o, k) => (o || {})[k], db) ?? defaultValue
}

// Set value in db
export function set(path, value) {
    const keys = path.split(".")
    let obj = db
    keys.forEach((k, i) => {
        if (i === keys.length - 1) {
            obj[k] = value
        } else {
            obj[k] = obj[k] || {}
            obj = obj[k]
        }
    })
}

// Export db for direct access if needed
export { db }
