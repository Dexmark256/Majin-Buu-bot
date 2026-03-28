<!-- HEADER BANNER -->
<div align="center">

```
  █████╗ ██╗  ██╗ █████╗ ███████╗ █████╗     ██╗  ██╗███╗   ███╗██████╗
 ██╔══██╗██║ ██╔╝██╔══██╗╚══███╔╝██╔══██╗    ╚██╗██╔╝████╗ ████║██╔══██╗
 ███████║█████╔╝ ███████║  ███╔╝ ███████║     ╚███╔╝ ██╔████╔██║██║  ██║
 ██╔══██║██╔═██╗ ██╔══██║ ███╔╝  ██╔══██║     ██╔██╗ ██║╚██╔╝██║██║  ██║
 ██║  ██║██║  ██╗██║  ██║███████╗██║  ██║    ██╔╝ ██╗██║ ╚═╝ ██║██████╔╝
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝
```

# ᴀᴋᴀᴢᴀ ❄️-xᴍᴅ

**Next-Gen WhatsApp Bot • Multi-Number Support • Powered by Baileys**

[![Node.js](https://img.shields.io/badge/Node.js-≥18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Multi--Device-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://web.whatsapp.com)
[![Baileys](https://img.shields.io/badge/Baileys-Whiskeysockets-blueviolet?style=for-the-badge)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/xking6/akaza-xmd?style=for-the-badge&logo=github&color=yellow)](https://github.com/xking6/akaza-xmd/stargazers)

> *"Open infrastructure for a freer internet"*  
> Sponsored by **ᴅᴀɴᴛᴇ ᴅᴇᴠ** ⚡

---

<img src="https://files.catbox.moe/e5gscw.jpg" alt="ᴀᴋᴀᴢᴀ ❄️-xᴍᴅ Banner" width="100%" style="border-radius: 12px;" />

---

</div>

## 🌐 Overview

**ᴀᴋᴀᴢᴀ ❄️-xᴍᴅ** is a powerful, feature-rich WhatsApp Multi-Device bot built on the [Baileys](https://github.com/WhiskeySockets/Baileys) library. Designed for speed, scalability, and automation — it supports **multiple WhatsApp numbers simultaneously**, persistent GitHub-based session management, OTP verification, media tools, and much more.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔗 **Multi-Number Pairing** | Connect and manage multiple WhatsApp numbers from one instance |
| 🔄 **Auto-Reconnect** | Sessions are stored on GitHub and automatically restored on restart |
| 👁️ **Auto View Status** | Automatically views WhatsApp statuses of contacts |
| ❤️ **Auto Like Status** | Reacts to statuses with randomized emojis |
| 🎙️ **Auto Recording** | Shows recording indicator when processing messages |
| 🔐 **OTP Config Updates** | Secure config changes via OTP verification sent to your number |
| 🖼️ **Media Processing** | Image manipulation via Jimp & Canvas, sticker creation, FFmpeg support |
| 🎵 **YouTube Downloader** | Download audio/video directly via commands |
| 🗣️ **Text-to-Speech** | Google TTS integration for voice responses |
| 📰 **Newsletter Broadcasts** | Push messages to WhatsApp newsletter channels |
| 👑 **Admin Controls** | Admin-only commands with dynamic admin list management |
| 🌍 **Timezone Support** | Timestamps localized via `moment-timezone` |
| 🧠 **Web Scraping** | Cheerio + ruhend-scraper for dynamic content fetching |
| 🔧 **REST API** | Express-based API for external control and integrations |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│  Runtime        │  Node.js ≥ 18.x                       │
│  WA Library     │  @whiskeysockets/baileys (baileys-mod) │
│  Web Server     │  Express.js                           │
│  Session Store  │  GitHub (via @octokit/rest)           │
│  Media          │  FFmpeg · Jimp · Canvas · Sharp        │
│  Downloads      │  yt-search · denethdev-ytmp3           │
│  TTS            │  google-tts-api                       │
│  Scraping       │  Cheerio · ruhend-scraper             │
│  HTTP Client    │  Axios · node-fetch                   │
│  Time           │  moment-timezone                      │
└─────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Deploy

### 1. Fork & Clone

```bash
git clone https://github.com/xking6/akaza-xmd.git
cd akaza-xmd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Bot

Edit the `config` block inside `pair.js`:

```js
const config = {
    PREFIX: '.',                  // Command prefix
    OWNER_NUMBER: 'your_number',  // Your WhatsApp number (with country code)
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'true',
    AUTO_RECORDING: 'true',
    CHANNEL_LINK: 'your_channel_link',
    // ...
};
```

### 4. Start the Bot

```bash
npm start
```

> Server will run on `http://0.0.0.0:8000`  
> Navigate to `/pair` in your browser to connect a WhatsApp number.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Landing page |
| `GET` | `/pair` | Pairing UI for new numbers |
| `GET` | `/code` | Pairing code generation router |
| `GET` | `/code/reconnect` | Reconnect all saved numbers |
| `GET` | `/code/update-config` | Trigger config update via OTP |
| `GET` | `/code/verify-otp` | Verify OTP and apply config |
| `GET` | `/code/getabout` | Fetch a number's WhatsApp About |

---

## 📁 Project Structure

```
ᴀᴋᴀᴢᴀ-xᴍᴅ/
├── index.js        # Express server entry point
├── pair.js         # Core bot logic, commands & WebSocket handling
├── msg.js          # Message sending utilities
├── Id.js           # ID/JID helpers
├── main.html       # Landing page UI
├── admin.json      # Admin whitelist
├── number.json     # Tracked number list
├── package.json    # Dependencies & metadata
└── LICENSE         # MIT License
```

---

## 🔐 Session Management

ᴀᴋᴀᴢᴀ ❄️-xᴍᴅ uses **GitHub as a remote session store** via the Octokit REST API:

- Sessions are saved as `empire_<number>_<timestamp>.json` on your GitHub repo
- On boot, `autoReconnectFromGitHub()` fetches all numbers from `session/numbers.json` and restores connections
- Duplicate session files are auto-cleaned, keeping only the latest

> 🔑 Set your GitHub PAT in `pair.js` to enable session persistence.

---

## 🛡️ Security Notes

- OTP verification is required for remote config changes (5-minute expiry)
- Admin commands are restricted to numbers listed in `admin.json`
- All number inputs are sanitized by stripping non-numeric characters

---

## 📦 Dependencies

<details>
<summary>Click to expand full dependency list</summary>

```json
"@whiskeysockets/baileys": "baileys-mod"
"express": "^4.18.2"
"axios": "^1.2.5"
"@octokit/rest": "^20.0.2"
"canvas": "latest"
"jimp": "^0.16.1"
"sharp": "0.34.1"
"ffmpeg": "^0.0.4"
"@ffmpeg-installer/ffmpeg": "^1.1.0"
"google-tts-api": "^2.0.2"
"wa-sticker-formatter": "^4.4.4"
"yt-search": "2.12.1"
"denethdev-ytmp3": "1.0.3"
"cheerio": "1.1.0"
"ruhend-scraper": "9.0.1"
"node-fetch": "3.3.2"
"moment-timezone": "^0.6.0"
"pino": "^9.7.0"
"qrcode": "^1.5.3"
"fs-extra": "^11.2.0"
```

</details>

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo 🔱
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request ✅

---

## ⭐ Support

If you find this project useful, please consider giving it a **star ✨** — it helps more people discover it!

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

**Built with ❄️ by [ᴅᴀɴᴛᴇ ᴅᴇᴠ](https://whatsapp.com/channel/0029VbC24qF84OmF4G1kCy3N)**

*Remember to fork 🔱 & star ✨ the repo!*

</div>
