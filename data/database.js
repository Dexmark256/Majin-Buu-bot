const fs = require('fs')
const path = require('path')

// ─────────────────────────────────────────
//         AKAZA BOT — LOCAL DATABASE
// ─────────────────────────────────────────

const DB_PATH = path.join(__dirname, 'db.json')

// Default database structure
const defaultDB = {
  users: {},
  groups: {},
  settings: {
    botName: 'Akaza',
    autoRead: false,
    autoTyping: false,
  },
}

/**
 * Load the database from disk
 * If it doesn't exist, create it with defaults
 */
const loadDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDB, null, 2))
    return defaultDB
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    console.error('[Akaza] Failed to parse database. Resetting to default.')
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDB, null, 2))
    return defaultDB
  }
}

/**
 * Save the current database state to disk
 */
const saveDB = (db) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

/**
 * Get or create a user entry
 */
const getUser = (jid) => {
  const db = loadDB()
  if (!db.users[jid]) {
    db.users[jid] = {
      jid,
      name: '',
      banned: false,
      messageCount: 0,
      joinedAt: Date.now(),
    }
    saveDB(db)
  }
  return db.users[jid]
}

/**
 * Update a user's data
 */
const updateUser = (jid, data) => {
  const db = loadDB()
  db.users[jid] = { ...db.users[jid], ...data }
  saveDB(db)
}

/**
 * Get or create a group entry
 */
const getGroup = (jid) => {
  const db = loadDB()
  if (!db.groups[jid]) {
    db.groups[jid] = {
      jid,
      name: '',
      antiLink: false,
      welcome: false,
      createdAt: Date.now(),
    }
    saveDB(db)
  }
  return db.groups[jid]
}

/**
 * Update a group's data
 */
const updateGroup = (jid, data) => {
  const db = loadDB()
  db.groups[jid] = { ...db.groups[jid], ...data }
  saveDB(db)
}

/**
 * Get global bot settings
 */
const getSettings = () => {
  const db = loadDB()
  return db.settings
}

/**
 * Update global bot settings
 */
const updateSettings = (data) => {
  const db = loadDB()
  db.settings = { ...db.settings, ...data }
  saveDB(db)
}

module.exports = {
  loadDB,
  saveDB,
  getUser,
  updateUser,
  getGroup,
  updateGroup,
  getSettings,
  updateSettings,
}
    
