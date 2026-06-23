# Harps Baileys

**A WebSockets library for interacting with WhatsApp Web Multi-Device.**

> Fork/modifikasi dari Baileys dengan optimasi dan penyesuaian khusus. Versi: **3.1.9**

![Version](https://img.shields.io/badge/version-3.1.1-blue)
![Node](https://img.shields.io/badge/Node.js-20+-green)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 Tentang Harps Baileys

**Harps Baileys** (`@vinzsocket/baileys`) adalah library TypeScript/JavaScript berbasis WebSocket yang ringan dan powerful untuk berinteraksi dengan **WhatsApp Web Multi-Device** tanpa menggunakan Selenium atau browser automation.

Library ini cocok untuk membangun **WhatsApp Bot**, **Auto Responder**, **Broadcast System**, **CRM WhatsApp**, dan berbagai aplikasi otomatisasi lainnya.

---

## ✨ Features

### 🔐 Authentication
- QR Code Authentication
- Pairing Code Authentication (tanpa scan QR)
- Multi-Device Support
- Session Management (simpan & load session)
- Automatic Reconnect dengan retry logic

### 💬 Messaging
- Kirim **Text** Message
- Kirim **Image**, **Video**, **Audio**, **Document**
- Kirim **Sticker** (termasuk animated)
- Kirim **Contact**, **Location**, **Poll**
- **Reaction** ke pesan
- **Mention** user / group
- **Quoted** / Reply message
- **View Once** message
- Edit & Delete / Revoke message
- Disappearing messages support

### 👥 Group Management
- Create Group
- Update Subject, Description, Profile Picture
- Add / Remove Participants
- Promote / Demote Admin
- Fetch Group Metadata & Participants
- Group Settings (announcement, restrict, etc.)
- Join via invite link

### 🔒 Security & Encryption
- Signal Protocol (End-to-End Encryption)
- Sender Key Distribution (Group Encryption)
- Session Key Management
- Identity Key Handling

### 🔄 Synchronization
- Chat Sync
- Contact Sync
- Group Sync
- Device Sync
- Message History Sync
- Presence (online, typing, recording)

### 🛠️ Utilities
- Link Preview Generator
- Media Upload & Download
- Binary Protocol Parser
- Event Handler System yang lengkap
- Full TypeScript Definitions
- Business API features (Catalog, Product, Order)

### 📊 Lainnya
- Status / Story (post & view)
- Newsletter & Community support
- High performance & low memory usage

---

## 📦 Installation

```bash
npm install @vinzsocket/baileys
