# 📱 Harps-Baileys

<div align="center">

**Fork WebSocket library WhatsApp Web Multi-Device — dasar dari ekosistem bot Harps-MD**

[![GitHub](https://img.shields.io/badge/GitHub-VinzSocket/Baileys-blue?style=for-the-badge&logo=github)](https://github.com/VinzSocket/Baileys)
![Version](https://img.shields.io/badge/version-3.2.14-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Type](https://img.shields.io/badge/type-ESM-yellow)

`npm install @vinzsocket/baileys`

</div>

---

## 📚 Daftar Isi

1. [Tentang Harps-Baileys](#-tentang-harps-baileys)
2. [Kenapa Fork Ini Dibuat](#-kenapa-fork-ini-dibuat)
3. [Instalasi](#-instalasi)
4. [Requirements](#-requirements)
5. [Quick Start](#-quick-start)
6. [Autentikasi (Auth State)](#-autentikasi-auth-state)
7. [Konfigurasi Koneksi](#-konfigurasi-koneksi)
8. [Struktur Package](#-struktur-package)
9. [JID & Utilitas Dasar](#-jid--utilitas-dasar)
10. [Mengirim Pesan — Dasar](#-mengirim-pesan--dasar)
    - [Teks & Link Preview](#teks--link-preview)
    - [Media: Gambar, Video, Audio, Sticker, Dokumen](#media-gambar-video-audio-sticker-dokumen)
    - [Kontak](#kontak)
    - [Lokasi](#lokasi)
    - [Reaksi (Reaction)](#reaksi-reaction)
    - [Polling (Poll)](#polling-poll)
    - [Event / Undangan Acara](#event--undangan-acara)
    - [Hapus, Edit, Pin Pesan](#hapus-edit-pin-pesan)
    - [View Once & PTV](#view-once--ptv)
    - [Mention & Tag Semua](#mention--tag-semua)
    - [Forward Pesan](#forward-pesan)
11. [Tombol & List — Native Flow](#-tombol--list--native-flow)
    - [Shorthand `buttons` / `templateButtons` / `interactiveButtons`](#shorthand-buttons--templatebuttons--interactivebuttons)
    - [Shorthand `sections` (List Message)](#shorthand-sections-list-message)
    - [Shorthand `cards` (Carousel)](#shorthand-cards-carousel)
12. [Fitur Eksklusif Harps-Baileys (`dugong.js`)](#-fitur-eksklusif-harps-baileys-dugongjs)
    - [NF V7 Button Builders](#nf-v7-button-builders)
    - [Multi-Select Message](#multi-select-message)
    - [Nested List Message](#nested-list-message)
    - [Group Status V2 (Story Grup)](#group-status-v2-story-grup)
    - [Story Card Generator (`renderStoryCard`)](#story-card-generator-renderstorycard)
    - [Payment Request Message](#payment-request-message)
    - [Product Message](#product-message)
    - [Album Message](#album-message)
    - [Poll Result Snapshot](#poll-result-snapshot)
    - [`buildInteractiveAdditionalNodes` — Kenapa Wajib Ada](#buildinteractiveadditionalnodes--kenapa-wajib-ada)
13. [Mention Utilities (`mention.js`)](#-mention-utilities-mentionjs)
14. [Sistem Event](#-sistem-event)
15. [Grup (Groups API)](#-grup-groups-api)
16. [Komunitas (Communities API)](#-komunitas-communities-api)
17. [Business API](#-business-api)
18. [Newsletter / Channel API](#-newsletter--channel-api)
19. [Chats, Profil & Privasi](#-chats-profil--privasi)
20. [Mengunduh & Memperbarui Media](#-mengunduh--memperbarui-media)
21. [Penanganan Error](#-penanganan-error)
22. [Reliabilitas & Retry](#-reliabilitas--retry)
23. [Referensi Shorthand Field `sendMessage`](#-referensi-shorthand-field-sendmessage)
24. [Tipe Data (Types) Penting](#-tipe-data-types-penting)
24. [WAProto](#-waproto)
25. [Contoh Lengkap: Struktur Bot dengan Plugin](#-contoh-lengkap-struktur-bot-dengan-plugin)
26. [Migrasi dari Baileys Upstream / Fork Lain](#-migrasi-dari-baileys-upstream--fork-lain)
27. [Troubleshooting / FAQ](#-troubleshooting--faq)
28. [Referensi Cepat: Semua Method `sock`](#-referensi-cepat-semua-method-sock)
29. [Contoh Penerapan di Sistem RPG](#-contoh-penerapan-di-sistem-rpg)
30. [Tips Performa](#-tips-performa)
31. [Keamanan & Best Practices](#-keamanan--best-practices)
32. [Opsi Lengkap `sendMessage`](#-opsi-lengkap-sendmessagejid-content-options)
33. [Deployment](#-deployment)
34. [Perbandingan dengan Baileys Upstream](#-perbandingan-dengan-baileys-upstream)
35. [Glosarium Istilah](#-glosarium-istilah)
36. [Changelog Ringkas](#-changelog-ringkas)
37. [Ucapan Terima Kasih](#-ucapan-terima-kasih)
38. [Sumber Daya Tambahan](#-sumber-daya-tambahan)
39. [Kontribusi](#-kontribusi)
40. [Lisensi](#-lisensi)

---

## 📖 Tentang Harps-Baileys

**Harps-Baileys** (dipublikasikan sebagai `@vinzsocket/baileys`) adalah fork dari library [Baileys](https://github.com/WhiskeySockets/Baileys) — WebSocket client untuk WhatsApp Web Multi-Device — yang dikembangkan dan dirawat oleh Alvin (VinzSocket) sebagai fondasi dari ekosistem bot **Harps-MD**.

Fork ini mempertahankan seluruh API inti Baileys (koneksi socket, autentikasi Signal Protocol, sinkronisasi riwayat chat, pengiriman & penerimaan pesan multi-device) sambil menambahkan sejumlah kapabilitas baru yang tidak tersedia di upstream, khususnya di area:

- **Native Flow interaktif generasi terbaru (NF V7)** — tombol URL, telepon, salin kode, reminder, alamat, lokasi, quick reply, dropdown tunggal/ganda, review pembayaran, review order, hingga multi-product message (MPM).
- **Group Status V2** — mengirim story/status langsung ke dalam grup, mendukung semua tipe media dengan caption.
- **Multi-Select Message** — satu pesan dengan beberapa dropdown independen sekaligus.
- **Nested List Message** — list legacy dengan auto-flatten section bersarang.
- **Story Card Generator** — membuat gambar status bergaya gradient (title/body/footer) secara programatik tanpa tools desain eksternal.
- **Shorthand pengiriman pesan** (`buttons`, `sections`, `cards`) yang menyederhanakan pembuatan payload interactive message modern.
- Perbaikan-perbaikan kompatibilitas & bug fix yang bersumber dari pengalaman menjalankan bot produksi (Harps-MD) sehari-hari.

Semua fitur tambahan ini dirancang agar **backward compatible** dengan pola-pola umum yang dipakai komunitas Baileys (mis. `buttonsMessage`, `templateButtons`, shape dari fork-fork populer lain) sehingga migrasi dari Baileys/fork lain ke Harps-Baileys seharusnya minim gesekan.

---

## 🎯 Kenapa Fork Ini Dibuat

Baileys upstream berkembang cepat mengikuti perubahan protokol WhatsApp Web, tapi API interaktifnya (button, list, carousel) sering kali:

- Tidak konsisten antara versi (`buttonsMessage` legacy vs `interactiveMessage` modern).
- Tidak menyertakan binary node hint (`additionalNodes`) yang diperlukan supaya pesan interaktif benar-benar **tampil** di client penerima — banyak bot yang mengirim pesan sukses (tidak ada error) tapi pesannya kosong/tidak muncul di HP penerima.
- Tidak punya cara mudah untuk fitur-fitur yang cukup dibutuhkan komunitas bot Indonesia: kirim status ke grup, dropdown ganda dalam satu pesan, atau list bersarang.

Harps-Baileys mengisi celah tersebut dengan lapisan `dugong.js` (`ExtendedMessageBuilder`) dan util pendukungnya, sambil tetap 100% memakai jalur `relayMessage()` bawaan Baileys sehingga tidak menyimpang dari cara kerja protokol resminya.

---

## 📦 Instalasi

```bash
npm install @vinzsocket/baileys
```

Atau dengan Yarn:

```bash
yarn add @vinzsocket/baileys
```

Atau dengan pnpm:

```bash
pnpm add @vinzsocket/baileys
```

### Peer Dependencies Opsional

Beberapa fitur bersifat opsional dan baru aktif kalau peer dependency-nya terpasang:

| Package | Dibutuhkan Untuk | Wajib? |
|---|---|---|
| `jimp` | `renderStoryCard()`, decoding sticker/gambar tanpa native binding | Opsional |
| `sharp` | Konversi/optimasi gambar performa tinggi (alternatif `jimp`) | Opsional |
| `link-preview-js` | Link preview otomatis pada `extendedTextMessage` | Opsional |
| `audio-decode` | Decode metadata/durasi audio untuk voice note | Opsional |

Pasang sesuai kebutuhan, misalnya:

```bash
npm install jimp sharp link-preview-js audio-decode
```

Jika Anda memanggil fitur yang butuh salah satu package di atas tanpa menginstallnya, Harps-Baileys akan melempar error `Boom` yang jelas (bukan crash diam-diam), contohnya:

```
Error: renderStoryCard() requires the optional "jimp" peer dependency. Install it with: npm i jimp
```

---

## ✅ Requirements

- **Node.js ≥ 20.0.0** (dicek otomatis lewat script `preinstall` → `engine-requirements.js`)
- Package ini adalah **ESM murni** (`"type": "module"` di `package.json`). Untuk import di proyek CommonJS:

```js
// CJS project — pakai dynamic import
const baileys = await import('@vinzsocket/baileys')
const makeWASocket = baileys.default
```

Atau, jika Node.js Anda sudah ≥ 20.19.0 (atau ≥ 22.12.0 / ≥ 23.x), Anda bisa memakai `require()` langsung berkat dukungan `require(esm)` bawaan Node:

```js
const { default: makeWASocket } = require('@vinzsocket/baileys')
```

Skrip `engine-requirements.js` akan:

- **Menghentikan instalasi** (`process.exit(1)`) jika Node.js Anda di bawah versi 20.
- Menampilkan **peringatan** (bukan error fatal) jika Node.js Anda di antara 20.0–20.18 / 22.0–22.11, karena `require(esm)` belum stabil di rentang tersebut — solusinya pakai `import()` dinamis seperti contoh di atas.

---

## 🚀 Quick Start

Contoh paling sederhana: konek ke WhatsApp, tampilkan QR, dan balas pesan “ping” dengan “pong”.

```js
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@vinzsocket/baileys'
import { Boom } from '@hapi/boom'

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('sesi_auth')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true // catatan: opsi ini deprecated di Baileys upstream terbaru,
                                 // gunakan qrcode-terminal manual jika ingin QR di console modern
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect =
                lastDisconnect?.error instanceof Boom &&
                lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Koneksi terputus, reconnect:', shouldReconnect)
            if (shouldReconnect) startBot()
        } else if (connection === 'open') {
            console.log('✅ Terhubung ke WhatsApp!')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ''

        if (text.toLowerCase() === 'ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'pong 🏓' }, { quoted: msg })
        }
    })
}

startBot()
```

Jalankan:

```bash
node index.js
```

Scan QR yang muncul di terminal menggunakan WhatsApp di HP Anda (**Linked Devices → Link a Device**).

---

## 🔐 Autentikasi (Auth State)

Harps-Baileys menyediakan helper `useMultiFileAuthState()` yang menyimpan kredensial sesi (`creds.json`) beserta seluruh key Signal Protocol (pre-key, sender key, session) sebagai file-file terpisah di sebuah folder — cocok untuk development maupun deployment sederhana berbasis filesystem.

```js
import { useMultiFileAuthState } from '@vinzsocket/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./sesi_auth')

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

**Cara kerja:**

- Folder `./sesi_auth` akan otomatis dibuat jika belum ada.
- Setiap file di dalamnya merepresentasikan satu "kunci" (`creds.json`, `app-state-sync-key-*.json`, `pre-key-*.json`, `session-*.json`, `sender-key-*.json`, dst).
- `saveCreds()` dipanggil setiap kali event `creds.update` terpicu (biasanya setelah pairing awal, rotasi key, atau update signature akun).
- Untuk produksi berskala besar / multi-instance, disarankan mengganti implementasi ini dengan auth state custom yang menyimpan ke database (Redis, MongoDB, Postgres) — cukup implementasikan interface `AuthenticationState` yang sama (`creds` + `keys` dengan method `get`/`set`).

### Auth State Custom (Database)

Pola umum jika ingin menulis auth state sendiri:

```js
const authState = {
    creds: /* objek AuthenticationCreds, load dari DB atau buat baru via initAuthCreds() */,
    keys: {
        get: async (type, ids) => {
            // ambil banyak key sekaligus by id, kembalikan sebagai { [id]: value }
        },
        set: async (data) => {
            // data: { [type]: { [id]: value | null } }
            // null berarti key tsb harus dihapus
        }
    }
}
```

Lihat `Types/Auth.js` / `Types/Auth.d.ts` untuk bentuk lengkap `AuthenticationCreds` dan `SignalDataTypeMap` yang harus didukung oleh implementasi `keys.get` / `keys.set` Anda (pre-key, session, sender-key, app-state-sync-key, app-state-sync-version, sender-key-memory).

### Pairing dengan Nomor Telepon (tanpa scan QR)

```js
const sock = makeWASocket({ auth: state })

if (!sock.authState?.creds?.registered) {
    const code = await sock.requestPairingCode('6281234567890') // nomor tanpa tanda +
    console.log('Kode pairing Anda:', code)
}
```

Masukkan kode tersebut di WhatsApp: **Linked Devices → Link with phone number instead**.

---

## ⚙️ Konfigurasi Koneksi

`makeWASocket(config)` menerima objek konfigurasi yang di-*merge* di atas `DEFAULT_CONNECTION_CONFIG`. Berikut opsi-opsi yang tersedia beserta nilai default aktualnya (dari `Defaults/index.js`):

| Opsi | Default | Keterangan |
|---|---|---|
| `version` | `[2, 3000, 1035194821]` | Versi protokol WhatsApp Web yang disimulasikan. |
| `browser` | `Browsers.macOS('Chrome')` | Identitas browser yang dikirim saat pairing (memengaruhi tampilan "linked device" di HP). |
| `waWebSocketUrl` | `'wss://web.whatsapp.com/ws/chat'` | Endpoint WebSocket WhatsApp Web. |
| `connectTimeoutMs` | `20000` | Timeout koneksi awal (ms). |
| `keepAliveIntervalMs` | `30000` | Interval ping keep-alive (ms). |
| `logger` | `pino` child logger | Instance logger (pino-compatible). |
| `emitOwnEvents` | `true` | Jika `true`, pesan yang dikirim sendiri via `sendMessage` ikut memicu `messages.upsert`. |
| `defaultQueryTimeoutMs` | `60000` | Timeout default untuk query IQ ke server. |
| `customUploadHosts` | `[]` | Daftar host upload media custom (override host bawaan WA). |
| `retryRequestDelayMs` | `250` | Delay antar retry request yang gagal. |
| `maxMsgRetryCount` | `5` | Batas maksimum percobaan ulang pengiriman pesan gagal. |
| `fireInitQueries` | `true` | Jalankan query inisialisasi standar (privacy, blocklist, dll) saat konek. |
| `auth` | `undefined` | **Wajib diisi** — objek `AuthenticationState` (lihat bagian Auth State). |
| `markOnlineOnConnect` | `true` | Set status "online" otomatis saat tersambung. |
| `syncFullHistory` | `true` | Minta sinkronisasi riwayat chat penuh dari HP saat pairing pertama. |
| `patchMessageBeforeSending` | `msg => msg` | Hook untuk memodifikasi payload pesan mentah sebelum dikirim (lanjutan). |
| `shouldSyncHistoryMessage` | `({syncType}) => syncType !== FULL` | Filter jenis histori mana yang diproses. |
| `shouldIgnoreJid` | `() => false` | Hook untuk mengabaikan JID tertentu (mis. broadcast list, JID spam). |
| `linkPreviewImageThumbnailWidth` | `192` | Lebar thumbnail untuk link preview otomatis. |
| `transactionOpts` | `{ maxCommitRetries: 10, delayBetweenTriesMs: 3000 }` | Retry policy transaksi signal store. |
| `generateHighQualityLinkPreview` | `false` | Jika `true`, thumbnail link preview diunggah kualitas tinggi (butuh 1 request tambahan). |
| `enableAutoSessionRecreation` | `true` | Otomatis membuat ulang sesi Signal jika terdeteksi rusak/kadaluarsa. |
| `enableRecentMessageCache` | `true` | Cache pesan terbaru untuk mempercepat resolusi `getMessage` (retry, edit, delete). |
| `options` | `{}` | Opsi tambahan untuk `fetch` (mis. custom agent/dispatcher). |
| `appStateMacVerification` | `{ patch: false, snapshot: false }` | Verifikasi MAC saat sinkronisasi app-state (kontak, chat, dsb). |
| `countryCode` | `'US'` | Kode negara default untuk normalisasi nomor. |
| `getMessage` | `async () => undefined` | **Sangat disarankan diisi** — resolver pesan by key, dipakai untuk retry/decrypt ulang. |
| `cachedGroupMetadata` | `async () => undefined` | Resolver metadata grup dari cache Anda sendiri (mengurangi query `groupMetadata`). |
| `makeSignalRepository` | `makeLibSignalRepository` | Implementasi Signal repository (bisa diganti custom). |

### Contoh Konfigurasi Lengkap Produksi

```js
import makeWASocket, { useMultiFileAuthState, Browsers, makeCacheableSignalKeyStore } from '@vinzsocket/baileys'
import pino from 'pino'
import NodeCache from '@cacheable/node-cache'

const logger = pino({ level: 'silent' })
const msgRetryCounterCache = new NodeCache()
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false })

const { state, saveCreds } = await useMultiFileAuthState('sesi_auth')

const sock = makeWASocket({
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
    },
    logger,
    browser: Browsers.ubuntu('Chrome'),
    syncFullHistory: false,
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    getMessage: async (key) => {
        // idealnya diarahkan ke store pesan Anda sendiri (DB/cache)
        return undefined
    }
})

sock.ev.on('groups.update', ([update]) => {
    const cached = groupCache.get(update.id)
    if (cached) groupCache.set(update.id, { ...cached, ...update })
})

sock.ev.on('group-participants.update', async ({ id }) => {
    groupCache.del(id) // invalidate, biar di-fetch ulang saat dibutuhkan
})
```

`Browsers` menyediakan beberapa preset umum: `Browsers.ubuntu(name)`, `Browsers.macOS(name)`, `Browsers.windows(name)`, `Browsers.appropriate(name)` — masing-masing memengaruhi bagaimana perangkat ini tampil di daftar "Linked Devices" pengguna.

---

## 🗂️ Struktur Package

```
@vinzsocket/baileys
├── WAProto/            → definisi protobuf pesan WhatsApp (proto.Message, dll)
├── engine-requirements.js  → cek versi Node.js saat preinstall
└── lib/
    ├── Defaults/       → konstanta & DEFAULT_CONNECTION_CONFIG
    ├── Signal/         → implementasi Signal Protocol (libsignal repository)
    ├── Socket/         → lapisan socket bertingkat (lihat di bawah) + dugong.js
    │   └── Client/     → WebSocket transport & tipe client
    ├── Types/          → semua TypeScript type (Auth, Chat, Message, dll)
    ├── Utils/          → helper: pesan, media, mention, auth-state, story-card, dll
    ├── WABinary/        → encode/decode binary XML node WhatsApp + util JID
    ├── WAM/            → WhatsApp Analytics/Metrics binary encoder
    └── WAUSync/        → USync protocol (query device/status massal)
```

Socket dibangun **bertingkat** (setiap layer membungkus layer sebelumnya), urutannya dari `Socket/index.js`:

```
makeCommunitiesSocket
  └─ makeChatsSocket
       └─ makeNewsletterSocket   (dan seterusnya menurun ke)
            └─ makeBusinessSocket
                 └─ makeGroupsSocket
                      └─ makeMessagesSocket (messages-send + messages-recv)
                           └─ socket dasar (Socket/socket.js — WebSocket, noise handshake, dsb)
```

Setiap layer menambahkan sekumpulan method ke objek `sock` yang dikembalikan `makeWASocket()`, sehingga API akhirnya terasa seperti satu objek datar (`sock.sendMessage`, `sock.groupCreate`, `sock.newsletterCreate`, dst) meskipun implementasinya berlapis.

---

## 🔎 JID & Utilitas Dasar

WhatsApp mengidentifikasi entitas (user, grup, channel, dst) lewat **JID** (Jabber ID). Harps-Baileys mengekspor beberapa helper dari `WABinary`:

```js
import {
    jidEncode, jidDecode, areJidsSameUser,
    isJidUser, isPnUser, isLidUser,
    isJidGroup, isJidBroadcast, isJidStatusBroadcast,
    isJidNewsletter, isJidMetaAI
} from '@vinzsocket/baileys'
```

| Fungsi | Kegunaan |
|---|---|
| `jidDecode(jid)` | Pecah JID jadi `{ user, server, device, agent }`. |
| `jidEncode(user, server, device?, agent?)` | Rakit ulang JID dari komponennya. |
| `areJidsSameUser(a, b)` | Bandingkan apakah dua JID merujuk user yang sama (mengabaikan device). |
| `isPnUser(jid)` | `true` jika JID berformat nomor telepon (`@s.whatsapp.net`). |
| `isLidUser(jid)` | `true` jika JID berformat LID (`@lid`) — identitas privasi baru WhatsApp. |
| `isJidGroup(jid)` | `true` jika JID adalah grup (`@g.us`). |
| `isJidBroadcast(jid)` | `true` jika JID adalah broadcast list. |
| `isJidStatusBroadcast(jid)` | `true` khusus untuk `status@broadcast`. |

### Konstanta JID Penting

```js
import { S_WHATSAPP_NET, STORIES_JID, OFFICIAL_BIZ_JID } from '@vinzsocket/baileys'

console.log(S_WHATSAPP_NET) // '@s.whatsapp.net'
console.log(STORIES_JID)    // 'status@broadcast'
```

### Catatan Tentang LID (Linked Identity)

WhatsApp secara bertahap memigrasikan identitas pengguna dari nomor telepon (`@s.whatsapp.net`) ke identitas tersamar (`@lid`) demi privasi, terutama di dalam grup besar. Ini berarti:

- `msg.key.participant` di sebuah grup **bisa** berupa `@lid`, bukan nomor telepon asli.
- Jangan asumsikan Anda selalu bisa menampilkan nomor telepon dari sebuah JID — kadang WhatsApp memang tidak mengungkapkannya.
- Harps-Baileys menyediakan `buildTagAllText()` (lihat bagian [Mention Utilities](#-mention-utilities-mentionjs)) yang menangani kasus ini dengan aman, alih-alih menampilkan digit LID mentah yang membingungkan pengguna.

---

## ✉️ Mengirim Pesan — Dasar

Semua pengiriman pesan melewati satu pintu: `sock.sendMessage(jid, content, options?)`. Bentuk `content` menentukan tipe pesan apa yang dihasilkan — Harps-Baileys memakai pola *"shorthand key detection"*: Anda cukup memberi field yang relevan (`text`, `image`, `poll`, dst) dan library akan merakit payload protobuf yang benar secara otomatis lewat `generateWAMessageContent()`.

### Teks & Link Preview

```js
await sock.sendMessage(jid, { text: 'Halo dari Harps-Baileys!' })
```

Reply / quote pesan lain:

```js
await sock.sendMessage(jid, { text: 'Ini balasan' }, { quoted: msg })
```

Link preview otomatis terdeteksi dari URL di dalam teks (butuh `link-preview-js` terpasang):

```js
await sock.sendMessage(jid, {
    text: 'Cek repo ini: https://github.com/VinzSocket/Baileys'
})
```

Kontrol manual link preview:

```js
await sock.sendMessage(jid, {
    text: 'Lihat websitenya di bawah',
    linkPreview: {
        'matched-text': 'https://example.com',
        title: 'Judul Custom',
        description: 'Deskripsi custom',
        jpegThumbnail: fs.readFileSync('./thumb.jpg')
    }
})
```

Matikan link preview sama sekali:

```js
await sock.sendMessage(jid, { text: 'https://example.com tanpa preview', linkPreview: null })
```

Teks dengan warna latar (bubble style — umumnya tampil di beberapa versi client sebagai "status text style"):

```js
await sock.sendMessage(jid, {
    text: 'Teks dengan gaya',
    backgroundColor: '#FF5722', // atau nilai integer ARGB
    font: 2 // 0-5, tergantung dukungan client
})
```

### Media: Gambar, Video, Audio, Sticker, Dokumen

**Gambar dengan caption:**

```js
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/foto.jpg' }, // atau Buffer / { stream }
    caption: 'Ini captionnya'
})
```

**Video dengan caption + GIF playback:**

```js
await sock.sendMessage(jid, {
    video: fs.readFileSync('./video.mp4'),
    caption: 'Video kegiatan',
    gifPlayback: false // true = tampil sebagai GIF loop
})
```

**Audio / Voice Note:**

```js
// Voice note (PTT)
await sock.sendMessage(jid, {
    audio: { url: 'https://example.com/voice.ogg' },
    ptt: true,
    mimetype: 'audio/ogg; codecs=opus'
})

// Audio musik biasa
await sock.sendMessage(jid, {
    audio: fs.readFileSync('./lagu.mp3'),
    ptt: false,
    mimetype: 'audio/mp4'
})
```

**Sticker:**

```js
await sock.sendMessage(jid, { sticker: { url: 'https://example.com/sticker.webp' } })
```

**Dokumen:**

```js
await sock.sendMessage(jid, {
    document: { url: 'https://example.com/laporan.pdf' },
    mimetype: 'application/pdf',
    fileName: 'Laporan-Bulanan.pdf',
    caption: 'Laporan bulan ini'
})
```

**Dokumen dengan thumbnail preview (patch fork ini):**

Harps-Baileys mendukung `jpegThumbnail` untuk dokumen (di-*monkey-patch* agar dokumen bisa menampilkan preview gambar seperti file PDF/gambar di WhatsApp Desktop):

```js
await sock.sendMessage(jid, {
    document: fs.readFileSync('./brosur.pdf'),
    mimetype: 'application/pdf',
    fileName: 'Brosur.pdf',
    jpegThumbnail: fs.readFileSync('./cover-brosur.jpg')
})
```

### Kontak

```js
await sock.sendMessage(jid, {
    contacts: {
        displayName: 'Nama Kontak',
        contacts: [{
            vcard:
                'BEGIN:VCARD\nVERSION:3.0\nFN:Nama Kontak\nTEL;type=CELL;type=VOICE;waid=6281234567890:+62 812-3456-7890\nEND:VCARD'
        }]
    }
})
```

Untuk mengirim lebih dari satu kontak sekaligus, cukup tambahkan lebih banyak entri ke array `contacts.contacts` — Harps-Baileys otomatis memilih antara `contactMessage` (1 kontak) dan `contactsArrayMessage` (lebih dari 1).

### Lokasi

```js
await sock.sendMessage(jid, {
    location: {
        degreesLatitude: -6.200000,
        degreesLongitude: 106.816666,
        name: 'Monas',
        address: 'Jakarta Pusat'
    }
})
```

### Reaksi (Reaction)

```js
await sock.sendMessage(jid, {
    react: {
        text: '❤️', // kosongkan string ('') untuk menghapus reaksi
        key: msg.key
    }
})
```

### Polling (Poll)

```js
// Single-choice poll
await sock.sendMessage(jid, {
    poll: {
        name: 'Menu makan siang hari ini?',
        values: ['Nasi Padang', 'Bakso', 'Mie Ayam', 'Soto'],
        selectableCount: 1
    }
})

// Multiple-choice poll
await sock.sendMessage(jid, {
    poll: {
        name: 'Pilih semua yang kamu suka',
        values: ['Gunung', 'Pantai', 'Kota', 'Hutan'],
        selectableCount: 2
    }
})

// Poll khusus grup komunitas/announcement
await sock.sendMessage(jid, {
    poll: {
        name: 'Pengumuman: pilih jadwal rapat',
        values: ['Senin', 'Rabu', 'Jumat'],
        selectableCount: 1,
        toAnnouncementGroup: true
    }
})
```

> Catatan: `selectableCount: 1` otomatis menghasilkan `pollCreationMessageV3` (single-select), sedangkan `> 1` menghasilkan `pollCreationMessage` (multi-select). `toAnnouncementGroup: true` mengarah ke `pollCreationMessageV2` untuk grup komunitas.

Membaca hasil vote dari event `messages.update`:

```js
import { getAggregateVotesInPollMessage } from '@vinzsocket/baileys'

sock.ev.on('messages.update', (updates) => {
    for (const { key, update } of updates) {
        if (update.pollUpdates) {
            const votes = getAggregateVotesInPollMessage({
                message: originalPollMessage, // ambil dari store Anda via key
                pollUpdates: update.pollUpdates
            }, sock.user.id)
            console.log(votes)
        }
    }
})
```

### Event / Undangan Acara

```js
await sock.sendMessage(jid, {
    event: {
        name: 'Rapat Koordinasi Bulanan',
        description: 'Bahas roadmap fitur Q3',
        startDate: new Date('2026-08-01T09:00:00+07:00'),
        endDate: new Date('2026-08-01T11:00:00+07:00'),
        location: { degreesLatitude: -6.2, degreesLongitude: 106.8, name: 'Kantor Pusat' },
        extraGuestsAllowed: true
    }
})
```

Event dengan tombol join-call otomatis (audio/video call link):

```js
await sock.sendMessage(jid, {
    event: {
        name: 'Sync Mingguan (Voice)',
        description: 'Join lewat tombol di bawah',
        startDate: new Date(),
        call: 'audio' // atau 'video' — butuh getCallLink di config (createCallLink)
    }
})
```

### Hapus, Edit, Pin Pesan

**Hapus (revoke) pesan:**

```js
await sock.sendMessage(jid, { delete: msg.key })
```

**Edit pesan:**

```js
await sock.sendMessage(jid, {
    text: 'Teks yang sudah diperbarui',
    edit: msg.key
})
```

**Pin pesan di chat (1 hari):**

```js
await sock.sendMessage(jid, {
    pin: msg.key,
    type: 1, // 1 = pin, 2 = unpin
    time: 86400 // durasi pin dalam detik
})
```

### View Once & PTV

**View once (media sekali lihat):**

```js
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/rahasia.jpg' },
    caption: 'Cuma bisa dilihat sekali',
    viewOnce: true
})
```

**Video pesan bulat (PTV — Push To Video, seperti voice note tapi video):**

```js
await sock.sendMessage(jid, {
    video: fs.readFileSync('./ptv.mp4'),
    ptv: true
})
```

### Mention & Tag Semua

Mention manual di teks:

```js
await sock.sendMessage(jid, {
    text: `Halo @${'6281234567890'}, cek pesan ini ya!`,
    mentions: ['6281234567890@s.whatsapp.net']
})
```

Tag semua anggota grup (tanpa menuliskan satu per satu — non-JID mentions, muncul sebagai "@all" style di beberapa client):

```js
await sock.sendMessage(jid, {
    text: 'Pengumuman penting untuk semua anggota!',
    mentionAll: true
})
```

> Untuk tag-all yang menampilkan nama tiap anggota dengan aman (menangani kasus JID `@lid`), gunakan `buildTagAllText()` — lihat bagian [Mention Utilities](#-mention-utilities-mentionjs).

### Forward Pesan

```js
await sock.sendMessage(jid, {
    forward: msg,     // pesan WAMessage yang ingin diteruskan
    force: false      // true untuk memaksa status forwarded meski baru diteruskan 1x
})
```

---

## 🔘 Tombol & List — Native Flow

WhatsApp modern hanya mendukung **Native Flow** (`interactiveMessage.nativeFlowMessage`) untuk tombol interaktif. Bentuk lama (`buttonsMessage`, `templateMessage`/hydrated template) sudah **deprecated oleh WhatsApp** dan sempat menjadi subjek advisory keamanan (rawan spoofing) di komunitas Baileys — karena itu Harps-Baileys **tidak pernah** menghasilkan payload legacy tersebut, walaupun Anda menulis kode dengan gaya lama. Semua shorthand di bawah ini otomatis dikonversi ke Native Flow modern.

### Shorthand `buttons` / `templateButtons` / `interactiveButtons`

Ketiga nama field ini diperlakukan sama — pilih mana saja yang paling familiar untuk Anda (berguna saat migrasi dari fork lain).

```js
await sock.sendMessage(jid, {
    text: 'Pilih salah satu opsi di bawah:',
    footer: 'Harps-MD',
    buttons: [
        { id: 'menu_1', text: '📋 Menu Utama' },
        { id: 'menu_2', text: '⚙️ Pengaturan' },
        { id: 'menu_3', text: '❓ Bantuan' }
    ]
}, { quoted: msg })
```

Dengan gambar/video sebagai header (otomatis dijadikan `interactiveMessage.header`):

```js
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/banner.jpg' },
    caption: 'Selamat datang di Harps-MD!',
    footer: 'Ketuk salah satu tombol',
    buttons: [
        { id: 'start', text: '🚀 Mulai' },
        { id: 'info', text: 'ℹ️ Info Bot' }
    ]
})
```

Format button yang didukung `normalizeToNativeFlowButtons()` (semua di bawah ini valid & saling setara secara fungsi):

```js
// 1. Native flow langsung (paling eksplisit)
{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'OK', id: 'ok' }) }

// 2. Legacy template wrapper
{ urlButton: { displayText: 'Website', url: 'https://example.com' } }
{ callButton: { displayText: 'Telepon', phoneNumber: '+6281234567890' } }
{ quickReplyButton: { displayText: 'Ya', id: 'yes' } }

// 3. Classic buttonsMessage shape
{ buttonId: 'yes', buttonText: { displayText: 'Ya' } }

// 4. Simple shape (paling ringkas, direkomendasikan)
{ id: 'yes', text: 'Ya' }
{ id: 'yes', displayText: 'Ya' }
```

### Shorthand `sections` (List Message)

```js
await sock.sendMessage(jid, {
    text: 'Silakan pilih menu:',
    title: '📋 Katalog Harps Shop',
    buttonText: 'Buka Menu',
    footer: 'Harps-MD',
    sections: [
        {
            title: '⚔️ Senjata',
            rows: [
                { rowId: 'sword', title: 'Pedang Besi', description: '40 ATK' },
                { rowId: 'bow', title: 'Busur', description: '30 ATK' }
            ]
        },
        {
            title: '🛡️ Armor',
            rows: [
                { rowId: 'shield', title: 'Perisai Kayu', description: '15 DEF' }
            ]
        }
    ]
}, { quoted: msg })
```

### Shorthand `cards` (Carousel)

Carousel horizontal-scroll — cocok untuk katalog produk atau daftar item RPG dengan gambar:

```js
await sock.sendMessage(jid, {
    text: 'Geser untuk lihat item lainnya:',
    footer: 'Harps Shop',
    cards: [
        {
            image: { url: 'https://example.com/sword.jpg' },
            title: 'Pedang Legendaris',
            body: 'ATK +100, harga 5000 gold',
            buttons: [{ id: 'buy_sword', text: '💰 Beli' }]
        },
        {
            image: { url: 'https://example.com/shield.jpg' },
            title: 'Perisai Naga',
            body: 'DEF +80, harga 3500 gold',
            buttons: [{ id: 'buy_shield', text: '💰 Beli' }]
        }
    ]
})
```

Setiap kartu (`card`) menerima field yang sama seperti pesan interaktif tunggal: `image`/`video`, `title`, `body` (atau `text`/`caption`), `footer`, dan `buttons` (format sama seperti shorthand `buttons` di atas).

---

## 🐉 Fitur Eksklusif Harps-Baileys (`dugong.js`)

`Socket/dugong.js` adalah jantung dari fitur-fitur khas Harps-Baileys — sebuah `ExtendedMessageBuilder` yang dipasang otomatis di dalam `sendMessage()`. Ia mendeteksi tipe pesan lanjutan berdasarkan field yang Anda kirim (`requestPaymentMessage`, `productMessage`, `interactiveMessage`, `albumMessage`, `eventMessage`, `pollResultMessage`, `groupStatusMessage`, `nestedListMessage`, `multiSelectMessage`) dan merakit payload protobuf yang sesuai — termasuk `additionalNodes` binary hint yang wajib ada supaya WhatsApp benar-benar merender pesan tersebut.

### NF V7 Button Builders

Semua builder ini bisa diimpor langsung untuk kontrol penuh atas payload (dipakai bersama `interactiveMessage.buttons` di level rendah, atau lewat shorthand `buttons` seperti dijelaskan sebelumnya):

```js
import {
    nfButtonUrl, nfButtonCall, nfButtonCopy,
    nfButtonReminder, nfButtonCancelReminder,
    nfButtonAddress, nfButtonLocation,
    nfButtonQuickReply, nfButtonSingleSelect,
    nfButtonMultiSelect,
    nfButtonReviewPay, nfButtonReviewOrder, nfButtonMPM
} from '@vinzsocket/baileys/lib/Socket/dugong.js'
```

| Builder | `name` Proto | Fungsi |
|---|---|---|
| `nfButtonUrl` | `cta_url` | Buka URL eksternal |
| `nfButtonCall` | `cta_call` | Panggil nomor telepon |
| `nfButtonCopy` | `cta_copy` | Salin kode/teks ke clipboard |
| `nfButtonReminder` | `cta_reminder` | Set reminder kalender |
| `nfButtonCancelReminder` | `cta_cancel_reminder` | Batalkan reminder yang sudah dibuat |
| `nfButtonAddress` | `address_message` | Minta pengguna isi & kirim alamat |
| `nfButtonLocation` | `send_location` | Minta pengguna kirim lokasi GPS |
| `nfButtonQuickReply` | `quick_reply` | Balasan cepat (mengirim id ke bot) |
| `nfButtonSingleSelect` | `single_select` | Satu tombol dropdown (list picker) |
| `nfButtonMultiSelect` | `single_select` × N | Beberapa tombol dropdown sekaligus |
| `nfButtonReviewPay` | `review_and_pay` | Alur pembayaran (review & pay) |
| `nfButtonReviewOrder` | `review_order` | Review status pesanan |
| `nfButtonMPM` | `mpm` | Multi-Product Message (katalog produk) |

Contoh penggunaan campuran beberapa builder dalam satu `interactiveMessage`:

```js
await conn.sendMessage(jid, {
    interactiveMessage: {
        title: '🎛️ Mixed Buttons',
        footer: 'Harps-MD',
        buttons: [
            nfButtonQuickReply({ id: 'ok', displayText: '✅ OK' }),
            nfButtonUrl({ displayText: '🌐 Website', url: 'https://example.com' }),
            nfButtonCopy({ displayText: '📋 Salin', copyCode: 'KODE123' }),
            nfButtonCall({ displayText: '📞 Hubungi Kami', phoneNumber: '+6281234567890' }),
            nfButtonReminder({
                displayText: '⏰ Ingatkan Saya',
                title: 'Cek stok baru',
                notes: 'Reminder dari Harps-MD',
                startTime: Math.floor(Date.now() / 1000) + 3600,
                endTime: Math.floor(Date.now() / 1000) + 7200
            }),
            nfButtonLocation({ displayText: '📍 Bagikan Lokasi' }),
            nfButtonSingleSelect({
                displayText: '📋 Pilih Kategori',
                sections: [
                    { title: 'Kategori', rows: [
                        { id: 'a', title: 'Opsi A' },
                        { id: 'b', title: 'Opsi B' }
                    ]}
                ]
            })
        ]
    }
}, { quoted: msg })
```

Contoh `nfButtonReviewPay` (alur pembayaran):

```js
const paymentButton = nfButtonReviewPay({
    currency: 'IDR',
    totalAmount1000: 150000000, // Rp150.000 (dikalikan 1000 sesuai konvensi WA)
    subtotal: 140000000,
    tax: 10000000,
    items: [{ name: 'Paket Premium Harps-MD', amount: { value: 140000000, offset: 1000 }, quantity: 1 }],
    merchant: { displayName: 'Harps Store' }
})
```

Contoh `nfButtonMPM` (multi-product message):

```js
const mpmButton = nfButtonMPM({
    sections: [
        { title: 'Produk Unggulan', productItems: [{ productId: 'prod_001' }, { productId: 'prod_002' }] }
    ]
})
```

### Multi-Select Message

Satu pesan dengan **beberapa** tombol dropdown independen — masing-masing tombol membuka bottom sheet-nya sendiri dengan section & row berbeda. Sangat berguna untuk form konfigurasi multi-langkah (mis. pilih senjata + armor sekaligus di RPG).

```js
await conn.sendMessage(jid, {
    multiSelectMessage: {
        title: '⚙️ Konfigurasi Karakter',
        footer: 'Pilih semua opsi',
        selectors: [
            {
                displayText: '⚔️ Pilih Senjata',
                sections: [
                    {
                        title: '🗡️ Melee',
                        rows: [
                            { id: 'sword', title: '⚔️ Iron Sword', description: '40 ATK' },
                            { id: 'axe', title: '🪓 Battle Axe', description: '60 ATK' }
                        ]
                    },
                    {
                        title: '🏹 Ranged',
                        rows: [
                            { id: 'bow', title: '🏹 Busur', description: '30 ATK' },
                            { id: 'xbow', title: '🔫 Crossbow', description: '55 ATK' }
                        ]
                    }
                ]
            },
            {
                displayText: '🛡️ Pilih Armor',
                sections: [
                    {
                        title: '🧥 Light',
                        rows: [
                            { id: 'cloth', title: '👕 Cloth', description: '10 DEF' },
                            { id: 'leather', title: '🥼 Leather', description: '25 DEF' }
                        ]
                    }
                ]
            }
        ],
        // Tombol tambahan opsional, digabung setelah semua dropdown selector
        extraButtons: [
            { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '✅ Konfirmasi', id: 'confirm' }) }
        ]
    }
}, { quoted: msg })
```

Menangkap balasan dari selector di handler pesan masuk — setiap selector merespons sebagai `single_select` biasa, jadi Anda membaca `selectedRowId` dari respons native flow seperti biasa, dan gunakan konteks percakapan (state bot Anda) untuk tahu selector mana yang sedang dijawab.

### Nested List Message

`listMessage` legacy dengan **auto-flatten**: baris (`row`) yang memiliki `rows` miliknya sendiri otomatis dipecah menjadi *section* baru, bukan nested secara visual (karena WhatsApp tidak mendukung nesting sungguhan di list message).

```js
await conn.sendMessage(jid, {
    nestedListMessage: {
        title: '🛒 Harps Shop',
        buttonText: '📋 Buka Katalog',
        footer: 'Pilih item',
        sections: [
            {
                title: '⚔️ Senjata',
                rows: [
                    // Row biasa (flat), tetap ada di section "⚔️ Senjata"
                    { rowId: 'dagger', title: '🗡️ Dagger', description: '25 ATK' },
                    // Row dengan `.rows` → otomatis jadi SECTION BARU "🏹 Jarak Jauh"
                    {
                        title: '🏹 Jarak Jauh',
                        rows: [
                            { rowId: 'bow', title: '🏹 Busur', description: '30 ATK' },
                            { rowId: 'xbow', title: '🔫 Crossbow', description: '55 ATK' }
                        ]
                    }
                ]
            }
        ]
    }
}, { quoted: msg })
```

Hasil setelah flatten (`buildNestedListMessage()`) akan berupa 2 section terpisah: `⚔️ Senjata` (berisi Dagger) dan `🏹 Jarak Jauh` (berisi Busur & Crossbow) — keduanya tetap tampil sebagai list picker WhatsApp standar.

`buildNestedListMessage()` juga bisa dipanggil langsung tanpa lewat `sendMessage` jika Anda hanya ingin objek payload-nya:

```js
import { buildNestedListMessage } from '@vinzsocket/baileys/lib/Socket/dugong.js'

const payload = buildNestedListMessage({
    title: 'Menu',
    buttonText: 'Buka',
    sections: [ /* ... */ ]
})
// payload => { listMessage: { title, description, buttonText, listType: 1, sections: [...] } }
```

### Group Status V2 (Story Grup)

Fitur untuk mengirim **story/status langsung ke sebuah grup** (bukan status pribadi Anda) — muncul sebagai ring status khusus untuk anggota grup tersebut. Mendukung semua tipe media dengan caption.

**Teks biasa:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: { text: '📢 Pengumuman penting dari admin!' }
})
```

**Teks dengan gaya warna latar:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        text: 'Status dengan background merah',
        backgroundColor: 0xFFE53935, // ARGB
        textArgb: 0xFFFFFFFF,
        font: 1 // 0-5
    }
})
```

**Foto dengan caption:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        image: { url: 'https://example.com/photo.jpg' }, // atau Buffer
        caption: '📸 Foto kegiatan hari ini!'
    }
})
```

**Video dengan caption:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        video: { url: 'https://example.com/video.mp4' },
        caption: '🎬 Video kegiatan',
        seconds: 30 // opsional, durasi
    }
})
```

**GIF (video dengan `gifPlayback`):**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        video: { url: 'https://example.com/anim.mp4' },
        gifPlayback: true
    }
})
```

**Audio voice note:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        audio: { url: 'https://example.com/voice.ogg' },
        ptt: true,
        seconds: 15
    }
})
```

**Audio musik:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        audio: { url: 'https://example.com/music.mp3' },
        ptt: false,
        mimetype: 'audio/mp4' // atau 'audio/mpeg'
    }
})
```

**Sticker:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: { sticker: { url: 'https://example.com/sticker.webp' } }
})
```

**Dokumen dengan caption:**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        document: { url: 'https://example.com/file.pdf' },
        mimetype: 'application/pdf',
        fileName: 'Laporan.pdf',
        caption: '📄 Laporan bulan ini'
    }
})
```

**Story card yang di-generate otomatis (lihat bagian berikutnya):**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        card: {
            title: 'Level Up!',
            body: 'Karaktermu naik ke level 25',
            footer: 'Harps-MD RPG System',
            gradient: 'sunset'
        },
        caption: '🎉 Selamat!'
    }
})
```

**Pre-built WAMessage (advanced, kontrol penuh):**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: {
        message: { imageMessage: { /* ...payload imageMessage lengkap yang sudah jadi... */ } }
    }
})
```

**Raw relay (forward story apa adanya):**

```js
await conn.sendMessage(groupJid, {
    groupStatusMessage: { raw: existingMessagePayload }
})
```

> ⚠️ **Penting:** sejak v3.2.14, setiap mode `handleGroupStory()` **wajib** menyertakan `additionalNodes` (node `<meta is_vsn2="1">`) di panggilan `relayMessage()`-nya. Tanpa ini, pesan tetap terkirim & ter-enkripsi normal (tidak ada error), tapi klien penerima tidak tahu payload tersebut harus dirender sebagai story grup — sehingga tidak pernah muncul sebagai ring status untuk anggota lain. Detail lengkap bug ini ada di [Changelog v3.2.14](#-changelog-ringkas). Jika Anda memakai versi ≥ 3.2.14, ini sudah otomatis tertangani.

### Story Card Generator (`renderStoryCard`)

`Utils/story-card.js` menyediakan generator gambar status bergaya gradient — **tanpa dependency native**, hanya memakai [Jimp](https://github.com/jimp-dev/jimp) (opsional peer dependency, di-*lazy import* sehingga tidak membebani konsumen yang tidak memakainya).

```js
import { renderStoryCard, STORY_GRADIENTS } from '@vinzsocket/baileys'

const buffer = await renderStoryCard({
    title: 'Selamat Datang!',
    body: 'Bot Harps-MD sudah online 24 jam.',
    footer: 'harps-md.dev',
    gradient: 'ocean',   // lihat daftar preset di bawah
    direction: 'vertical' // atau 'diagonal'
})

await sock.sendMessage(jid, { image: buffer, caption: 'Story otomatis!' })
```

**Opsi `renderStoryCard(opts)`:**

| Opsi | Default | Keterangan |
|---|---|---|
| `title` | — | Teks besar (headline) |
| `body` | — | Teks subtitle di bawah title |
| `footer` | — | Teks kecil branding, ditempel di bawah kanvas |
| `gradient` | `'purple'` | Preset gradasi: lihat `STORY_GRADIENTS` |
| `colors` | — | `[from, to]` ARGB hex eksplisit — mengalahkan `gradient` jika diisi |
| `direction` | `'vertical'` | `'vertical'` atau `'diagonal'` |
| `width` | `1080` | Lebar kanvas (rasio default status WA: 1080×1920) |
| `height` | `1920` | Tinggi kanvas |

**Preset gradient (`STORY_GRADIENTS`):**

```js
console.log(STORY_GRADIENTS)
// ['sunset', 'purple', 'ocean', 'forest', 'midnight', 'fire']
```

| Preset | Warna |
|---|---|
| `sunset` | Oranye → Peach |
| `purple` | Ungu tua → Ungu terang |
| `ocean` | Biru laut → Cyan muda |
| `forest` | Hijau tua → Hijau muda |
| `midnight` | Abu gelap → Abu lebih terang |
| `fire` | Merah → Kuning |

Warna kustom (override total, mengabaikan preset):

```js
const buffer = await renderStoryCard({
    title: 'Custom Color',
    colors: ['#FF0080', '#7928CA'],
    direction: 'diagonal'
})
```

Jika `jimp` tidak terpasang, pemanggilan ini akan melempar:

```
Error: renderStoryCard() requires the optional "jimp" peer dependency. Install it with: npm i jimp
```

### Payment Request Message

```js
await conn.sendMessage(jid, {
    requestPaymentMessage: {
        amount: 5000000, // Rp50.000 (x1000)
        currency: 'IDR',
        from: '0@s.whatsapp.net',
        note: 'Pembayaran untuk item RPG',
        expiry: Math.floor(Date.now() / 1000) + 86400
    }
})
```

Dengan sticker sebagai catatan visual (opsional, menggantikan `note` teks):

```js
await conn.sendMessage(jid, {
    requestPaymentMessage: {
        amount: 10000000,
        currency: 'IDR',
        sticker: { stickerMessage: preparedStickerMessage }
    }
})
```

### Product Message

```js
await conn.sendMessage(jid, {
    productMessage: {
        title: 'Sword of Fire',
        description: 'Senjata legendaris dengan efek terbakar',
        thumbnail: { url: 'https://example.com/sword.jpg' },
        productId: 'sword_fire_001',
        retailerId: 'harps-shop',
        priceAmount1000: 500000000,
        currencyCode: 'IDR',
        body: 'Dapatkan sekarang di Harps Shop!',
        footer: 'Stok terbatas',
        buttons: [{ id: 'buy', text: '💰 Beli Sekarang' }]
    }
})
```

Product message dibungkus otomatis sebagai `viewOnceMessage` berisi `interactiveMessage` dengan header produk (`header.productMessage`) — konsisten dengan cara WhatsApp Business menampilkan katalog produk single-item.

### Album Message

Kirim beberapa foto/video sebagai satu **album** (dikelompokkan visual di client, mirip carousel foto Instagram):

```js
await conn.sendMessage(jid, {
    albumMessage: [
        { image: { url: 'https://example.com/1.jpg' } },
        { image: { url: 'https://example.com/2.jpg' } },
        { video: { url: 'https://example.com/clip.mp4' } }
    ]
})
```

Di balik layar, `handleAlbum()`:

1. Mengirim pesan "container" album kosong (`albumMessage` dengan `expectedImageCount` / `expectedVideoCount`).
2. Mengirim setiap item media satu per satu sebagai pesan terpisah yang di-*link* ke container lewat `messageContextInfo.messageAssociation` (`associationType: MEDIA_ALBUM`), sehingga client mengelompokkannya secara visual sebagai satu album.

### Poll Result Snapshot

Mengirim **snapshot hasil polling** (mis. untuk mengumumkan pemenang polling tanpa perlu vote lagi):

```js
await conn.sendMessage(jid, {
    pollResultMessage: {
        name: 'Menu favorit bulan ini',
        pollVotes: [
            { optionName: 'Nasi Padang', optionVoteCount: 42 },
            { optionName: 'Bakso', optionVoteCount: 27 },
            { optionName: 'Mie Ayam', optionVoteCount: 15 }
        ]
    }
})
```

### `buildInteractiveAdditionalNodes` — Kenapa Wajib Ada

Ini adalah salah satu fitur paling penting (dan paling mudah terlewat) di seluruh keluarga fork Baileys. WhatsApp **tidak cukup** hanya menerima payload protobuf pesan interaktif — server juga butuh **binary node hint** terpisah yang dikirim bersamaan lewat parameter `additionalNodes` pada `relayMessage()`, di luar isi pesan itu sendiri. Tanpa hint ini:

- Pesan tetap **terkirim & ter-enkripsi dengan sukses** (tidak ada exception).
- Tapi klien penerima **tidak tahu** bahwa payload tersebut harus dirender sebagai list/interactive/story — pesan bisa muncul kosong, sebagai pesan biasa, atau tidak muncul sama sekali.

`buildInteractiveAdditionalNodes(jid, message)` di `Utils/messages.js` menghasilkan node yang tepat berdasarkan isi pesan:

| Isi Pesan | Node yang Dihasilkan |
|---|---|
| `listMessage` | `<biz><list type="product_list" v="2"/></biz>` |
| `interactiveMessage` / `buttonsMessage` / `templateMessage` / `productMessage` | `<biz><interactive type="native_flow" v="1"><native_flow name="mixed" v="9"/></interactive></biz>` |
| `interactiveMessage.carouselMessage` | sama seperti di atas, tapi `name="carousel"` |
| `groupStatusMessageV2` (khusus di dalam grup) | `<meta is_vsn2="1"/>` |
| (tambahan, jika bukan grup & ada node interaktif) | `<bot biz_bot="1"/>` |

**Harps-Baileys sudah memanggil fungsi ini secara otomatis** di dalam `sendMessage()` dan seluruh handler `dugong.js` — Anda **tidak perlu** memanggilnya manual untuk penggunaan normal. Namun jika Anda melakukan `relayMessage()` secara manual (mis. dari plugin custom yang bypass `sendMessage`), pastikan menyertakannya:

```js
import { buildInteractiveAdditionalNodes } from '@vinzsocket/baileys'

await sock.relayMessage(jid, msg.message, {
    messageId: msg.key.id,
    additionalNodes: buildInteractiveAdditionalNodes(jid, msg.message)
})
```

Fungsi pendukung terkait, `patchInteractiveMessage(m)`, membungkus payload interactive/button/list/product ke dalam `viewOnceMessage` dengan `messageContextInfo.deviceListMetadataVersion` — konvensi yang dipakai mayoritas fork komunitas (baileys-pro, dsb) agar kompatibel dengan cara WhatsApp memvalidasi pesan tersebut. Fungsi ini juga dipanggil otomatis oleh `generateWAMessageContent()`.

---

## 🏷️ Mention Utilities (`mention.js`)

`Utils/mention.js` diporting dari fork **baileys-lily** dan diadaptasi ke ESM untuk Harps-Baileys. Menyediakan tiga fungsi:

### `normalizeMentions(mentions)`

Menormalisasi input mention (string tunggal, array, atau campuran nomor mentah/JID) menjadi array JID valid. Hasilnya **di-cache** (maksimum 1000 entri, auto-clear jika penuh) untuk performa di bot dengan volume mention tinggi.

```js
import { normalizeMentions } from '@vinzsocket/baileys/lib/Utils/mention.js'

normalizeMentions('6281234567890')
// => ['6281234567890@s.whatsapp.net']

normalizeMentions(['6281234567890', '6289876543210@s.whatsapp.net', null, ''])
// => ['6281234567890@s.whatsapp.net', '6289876543210@s.whatsapp.net']
```

### `applyMentions(msg, mentions, contextInfo?)`

Menyisipkan daftar mention ke dalam sebuah objek pesan mentah — menangani tiga lokasi berbeda sekaligus (`messageContextInfo.mentionedJid`, `contextInfo.mentionedJid` yang diberikan, dan `interactiveMessage.contextInfo.mentionedJid` jika ada), tanpa duplikasi.

```js
import { applyMentions } from '@vinzsocket/baileys/lib/Utils/mention.js'

const msg = { extendedTextMessage: { text: 'Halo semua' } }
applyMentions(msg, ['6281234567890@s.whatsapp.net'])
```

### `buildTagAllText(participants, options?)`

Membangun teks "tag semua anggota" beserta daftar `mentions`-nya dari `participants` hasil `groupMetadata(jid)` — **menangani kasus JID `@lid` dengan aman**: jika WhatsApp tidak mengungkapkan nomor telepon asli seorang anggota (mode privasi `addressingMode: 'lid'`), fungsi ini **tidak** menampilkan digit LID mentah sebagai `@206244447002720` (yang tidak berarti apa-apa bagi manusia), melainkan jatuh ke nama tampilan (jika Anda punya lookup) atau label generik `@Member`.

```js
import { buildTagAllText } from '@vinzsocket/baileys/lib/Utils/mention.js'

const metadata = await sock.groupMetadata(groupJid)

const { text, mentions } = buildTagAllText(metadata.participants, {
    header: '📢 Pengumuman untuk semua anggota grup!',
    footer: 'Harap dibaca sampai selesai.',
    getDisplayName: (jid) => myContactStore[jid]?.notify // opsional, lookup nama dari store Anda
})

await sock.sendMessage(groupJid, { text, mentions })
```

**Perilaku penamaan per anggota:**

| Kondisi | Yang Ditampilkan |
|---|---|
| WhatsApp mengungkapkan nomor telepon asli | `@6281234567890` (nomor asli) |
| Hanya LID + ada `getDisplayName` yang mengembalikan nama | `@NamaKontak` |
| Hanya LID + tidak ada lookup nama | `@Member` (label generik, bukan digit LID) |

Ini penting karena menampilkan LID mentah bisa terlihat seperti nomor telepon acak/rusak dan membingungkan pengguna — dengan `buildTagAllText`, tampilan tetap rapi apa pun status privasi anggotanya.

---

## 📡 Sistem Event

Semua event WhatsApp diterima lewat `sock.ev` — sebuah `EventEmitter` (dari `@hapi/boom`-style bare event emitter, bukan dari library eksternal). Berikut daftar lengkap event yang dipancarkan oleh Harps-Baileys:

| Event | Kapan Dipancarkan |
|---|---|
| `connection.update` | Status koneksi berubah (`connecting`, `open`, `close`) atau QR baru tersedia. |
| `creds.update` | Kredensial auth berubah — **wajib** disimpan via `saveCreds()`. |
| `messages.upsert` | Pesan baru masuk (atau riwayat sedang sinkron, cek `type`). |
| `messages.update` | Pesan yang sudah ada berubah (status baca, reaksi, poll vote, dst). |
| `messages.delete` | Satu atau beberapa pesan dihapus. |
| `messages.reaction` | Reaksi emoji baru pada sebuah pesan. |
| `messages.media-update` | Hasil `updateMediaMessage()` — media berhasil/gagal di-refresh. |
| `message-receipt.update` | Update tanda terima (delivered/read) per device. |
| `message-capping.update` | Update terkait batasan tampilan pesan (mis. status kadaluarsa). |
| `messaging-history.set` | Batch sinkronisasi riwayat chat/kontak/pesan diterima. |
| `messaging-history.status` | Status progres sinkronisasi riwayat (mulai/selesai/timeout). |
| `chats.upsert` | Chat baru ditambahkan ke daftar. |
| `chats.update` | Metadata chat berubah (unread count, pin, mute, dst). |
| `chats.delete` | Chat dihapus dari daftar. |
| `chats.lock` | (internal) penguncian transaksi app-state untuk chat tertentu. |
| `contacts.upsert` | Kontak baru ditambahkan/disinkronkan. |
| `contacts.update` | Data kontak berubah (nama, status, dsb). |
| `groups.upsert` | Grup baru ditemukan/dibuat. |
| `groups.update` | Metadata grup berubah (subjek, deskripsi, setting). |
| `group-participants.update` | Anggota ditambah/dikeluarkan/dipromosikan/diturunkan. |
| `group.join-request` | Ada permintaan join grup baru (mode approval). |
| `group.member-tag.update` | Update label/tag anggota grup. |
| `blocklist.update` | Daftar kontak yang diblokir berubah. |
| `call` | Ada panggilan masuk/status panggilan berubah. |
| `presence.update` | Status online/typing/recording seseorang berubah. |
| `labels.edit` | Label chat (fitur WhatsApp Business) diubah. |
| `labels.association` | Label ditambahkan/dilepas dari chat/pesan tertentu. |
| `newsletter.view` | Statistik view newsletter/channel berubah. |
| `newsletter.reaction` | Reaksi baru pada post newsletter/channel. |
| `newsletter-settings.update` | Pengaturan newsletter/channel berubah. |
| `newsletter-participants.update` | Admin/follower newsletter berubah. |
| `lid-mapping.update` | Pemetaan JID nomor telepon ↔ LID diperbarui. |
| `settings.update` | Pengaturan akun WhatsApp berubah. |
| `event` | Update terkait event/undangan (RSVP, dsb). |

### Contoh Pola Umum

```js
sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return // 'notify' = pesan baru real-time
    for (const msg of messages) {
        if (!msg.message) continue
        console.log('Pesan masuk dari:', msg.key.remoteJid)
    }
})

sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    if (action === 'add') {
        for (const p of participants) {
            await sock.sendMessage(id, { text: `Selamat datang @${p.split('@')[0]}!`, mentions: [p] })
        }
    }
})

sock.ev.on('call', async (calls) => {
    for (const call of calls) {
        if (call.status === 'offer') {
            console.log('Panggilan masuk dari', call.from)
        }
    }
})
```

### Menggabungkan Banyak Event (Event Buffering)

Untuk workload berat (sinkronisasi riwayat besar), Baileys menyediakan `makeEventBuffer` (via `Utils/event-buffer.js`) yang menggabungkan banyak event kecil menjadi satu batch — biasanya sudah dipakai secara internal oleh `sock.ev` (yang sebenarnya adalah `BaileysEventEmitter` dengan buffering opsional lewat `sock.ev.buffer()` / `sock.ev.flush()`):

```js
sock.ev.buffer() // mulai buffering
// ...lakukan banyak operasi...
await sock.ev.flush() // proses semua event yang tertunda sekaligus
```

Ini berguna saat Anda melakukan operasi berat (mis. restore banyak kontak) dan ingin event yang berhubungan digabung agar handler Anda tidak dipanggil ratusan kali secara terpisah.

---

## 👥 Grup (Groups API)

Semua method grup tersedia langsung di objek `sock` (dari layer `makeGroupsSocket`).

### Membuat & Mengelola Grup

```js
// Buat grup baru
const group = await sock.groupCreate('Nama Grup Baru', ['6281234567890@s.whatsapp.net', '6289876543210@s.whatsapp.net'])
console.log(group.id) // JID grup baru

// Keluar dari grup
await sock.groupLeave(groupJid)

// Ubah nama grup
await sock.groupUpdateSubject(groupJid, 'Nama Grup yang Diperbarui')

// Ubah deskripsi grup
await sock.groupUpdateDescription(groupJid, 'Deskripsi baru untuk grup ini')
```

### Mengelola Anggota

```js
// Tambah anggota
await sock.groupParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'add')

// Keluarkan anggota
await sock.groupParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'remove')

// Jadikan admin
await sock.groupParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'promote')

// Copot admin
await sock.groupParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'demote')
```

`action` menerima salah satu dari: `'add'`, `'remove'`, `'promote'`, `'demote'`.

### Mode Approval Join Request

Untuk grup dengan mode "admin harus menyetujui anggota baru":

```js
// Lihat daftar permintaan join yang pending
const requests = await sock.groupRequestParticipantsList(groupJid)

// Setujui atau tolak
await sock.groupRequestParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'approve')
await sock.groupRequestParticipantsUpdate(groupJid, ['6281234567890@s.whatsapp.net'], 'reject')
```

### Undangan Grup

```js
// Ambil kode undangan
const code = await sock.groupInviteCode(groupJid)
console.log(`https://chat.whatsapp.com/${code}`)

// Cabut & buat ulang kode undangan (kode lama jadi tidak valid)
const newCode = await sock.groupRevokeInvite(groupJid)

// Terima undangan via kode
const joinedGroupId = await sock.groupAcceptInvite(inviteCode)

// Lihat info grup dari kode undangan TANPA join
const info = await sock.groupGetInviteInfo(inviteCode)

// Undang JID tertentu langsung (V4 invite — dikirim sebagai pesan groupInviteMessage)
await sock.groupRevokeInviteV4(groupJid, targetJid)
```

### Pengaturan Grup

```js
// Hanya admin yang bisa kirim pesan ('announcement') atau semua anggota ('not_announcement')
await sock.groupSettingUpdate(groupJid, 'announcement')

// Siapa yang boleh edit info grup: 'locked' (admin saja) / 'unlocked' (semua)
await sock.groupSettingUpdate(groupJid, 'locked')

// Mode tambah anggota: 'all_member_add' / 'admin_add'
await sock.groupMemberAddMode(groupJid, 'admin_add')

// Mode approval join: 'on' / 'off'
await sock.groupJoinApprovalMode(groupJid, 'on')

// Pesan sekali lihat (disappearing messages) di grup
await sock.groupToggleEphemeral(groupJid, 7 * 24 * 60 * 60) // 7 hari, dalam detik
await sock.groupToggleEphemeral(groupJid, 0) // matikan
```

### Membaca Metadata Grup

```js
const metadata = await sock.groupMetadata(groupJid)
console.log({
    subject: metadata.subject,
    desc: metadata.desc,
    owner: metadata.owner,
    participants: metadata.participants.length,
    memberAddMode: metadata.memberAddMode
})

// Ambil semua grup yang diikuti akun ini
const allGroups = await sock.groupFetchAllParticipating()
console.log(Object.keys(allGroups).length, 'grup diikuti')
```

**Field penting pada objek metadata grup:** `id`, `subject`, `subjectOwner`, `subjectTime`, `size`, `creation`, `owner`, `desc`, `descId`, `descOwner`, `descOwnerPn`, `descOwnerUsername`, `descTime`, `restrict`, `announce`, `isCommunity`, `isCommunityAnnounce`, `joinApprovalMode`, `memberAddMode`, `participants` (array `{ id, admin, jid?, phoneNumber? }`).

---

## 🏘️ Komunitas (Communities API)

Struktur API-nya **sangat mirip Groups API**, karena komunitas WhatsApp pada dasarnya adalah "grup induk" yang menaungi beberapa grup anak.

```js
// Buat komunitas baru
const community = await sock.communityCreate('Nama Komunitas', 'Deskripsi komunitas')

// Buat grup baru langsung di dalam komunitas
const subGroup = await sock.communityCreateGroup('Nama Grup', ['6281234567890@s.whatsapp.net'], community.id)

// Keluar dari komunitas
await sock.communityLeave(communityJid)

// Ubah subjek/deskripsi
await sock.communityUpdateSubject(communityJid, 'Nama Baru')
await sock.communityUpdateDescription(communityJid, 'Deskripsi baru')

// Hubungkan / lepaskan grup yang sudah ada ke/dari komunitas
await sock.communityLinkGroup(existingGroupJid, communityJid)
await sock.communityUnlinkGroup(existingGroupJid, communityJid)

// Lihat semua grup yang terhubung ke komunitas ini
const linkedGroups = await sock.communityFetchLinkedGroups(communityJid)

// Kelola anggota (sama seperti grup)
await sock.communityParticipantsUpdate(communityJid, [jid], 'add')
await sock.communityRequestParticipantsList(communityJid)
await sock.communityRequestParticipantsUpdate(communityJid, [jid], 'approve')

// Undangan
const code = await sock.communityInviteCode(communityJid)
await sock.communityRevokeInvite(communityJid)
await sock.communityAcceptInvite(code)
await sock.communityRevokeInviteV4(communityJid, targetJid)
const info = await sock.communityGetInviteInfo(code)

// Pengaturan
await sock.communityToggleEphemeral(communityJid, 0)
await sock.communitySettingUpdate(communityJid, 'announcement')
await sock.communityMemberAddMode(communityJid, 'admin_add')
await sock.communityJoinApprovalMode(communityJid, 'on')

// Metadata & daftar semua komunitas yang diikuti
const metadata = await sock.communityMetadata(communityJid)
const all = await sock.communityFetchAllParticipating()
```

Field metadata komunitas mencakup: `desc`, `descId`, `memberAddMode`, `isCommunity: true`, plus field umum grup lainnya (`subject`, `owner`, `participants`, dst).

---

## 💼 Business API

Untuk akun WhatsApp Business — mengelola katalog produk, koleksi, dan profil bisnis.

```js
// Ambil detail order (mis. dari pesan review_order)
const order = await sock.getOrderDetails(orderId, tokenBase64)

// Ambil katalog produk milik JID bisnis tertentu (atau diri sendiri jika tidak diisi)
const catalog = await sock.getCatalog({ jid: businessJid, limit: 20 })

// Ambil koleksi produk (grouping produk di katalog)
const collections = await sock.getCollections(businessJid, 10)

// Tambah produk baru ke katalog
const newProduct = await sock.productCreate({
    name: 'Kaos Harps-MD',
    description: 'Kaos official merchandise',
    price: 15000000, // dalam sen/x1000 tergantung mata uang
    currency: 'IDR',
    images: [{ url: 'https://example.com/kaos.jpg' }]
})

// Update produk
await sock.productUpdate(productId, { price: 12000000 })

// Hapus produk
await sock.productDelete([productId])

// Update profil bisnis (deskripsi, kategori, jam buka, dsb)
await sock.updateBussinesProfile({ description: 'Toko resmi Harps-MD', address: 'Jakarta' })

// Update / hapus foto sampul profil bisnis
await sock.updateCoverPhoto(imageBuffer)
await sock.removeCoverPhoto()
```

---

## 📰 Newsletter / Channel API

Untuk fitur **WhatsApp Channel** (sebelumnya disebut "Newsletter" secara internal oleh protokol WA).

```js
// Buat channel baru
const channel = await sock.newsletterCreate('Nama Channel', 'Deskripsi channel')

// Ambil metadata channel (by invite code atau by jid)
const metaByJid = await sock.newsletterMetadata('jid', channelJid)
const metaByInvite = await sock.newsletterMetadata('invite', inviteCode)

// Update info channel
await sock.newsletterUpdateName(channelJid, 'Nama Baru')
await sock.newsletterUpdateDescription(channelJid, 'Deskripsi baru')
await sock.newsletterUpdatePicture(channelJid, imageBuffer)
await sock.newsletterRemovePicture(channelJid)

// Lihat daftar subscriber
const subs = await sock.newsletterSubscribers(channelJid)

// React ke sebuah post channel
await sock.newsletterReactMessage(channelJid, serverMessageId, '❤️')

// Ambil pesan-pesan channel (untuk ditampilkan / diarsipkan)
const messages = await sock.newsletterFetchMessages(channelJid, 20 /* count */)

// Berlangganan update real-time dari sebuah channel
await sock.subscribeNewsletterUpdates(channelJid)

// Manajemen admin
const adminCount = await sock.newsletterAdminCount(channelJid)
await sock.newsletterChangeOwner(channelJid, newOwnerJid)
await sock.newsletterDemote(channelJid, adminJid)

// Hapus channel
await sock.newsletterDelete(channelJid)
```

Event terkait channel yang perlu didengarkan: `newsletter.view`, `newsletter.reaction`, `newsletter-settings.update`, `newsletter-participants.update` (lihat [Sistem Event](#-sistem-event)).

---

## 💬 Chats, Profil & Privasi

Layer `makeChatsSocket` menyediakan mayoritas method operasional sehari-hari.

### Manajemen Chat

```js
// Arsipkan chat
await sock.chatModify({ archive: true, lastMessages: [msg] }, jid)

// Pin / unpin chat
await sock.chatModify({ pin: true }, jid)

// Mute chat 8 jam (dalam ms, atau `null` untuk unmute)
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)

// Tandai chat sudah dibaca / belum dibaca
await sock.chatModify({ markRead: true, lastMessages: [msg] }, jid)

// Hapus chat
await sock.chatModify({ delete: true, lastMessages: [msg] }, jid)

// Bintangi / batalkan pesan tertentu
await sock.star([{ id: msg.key.id, remoteJid: jid, fromMe: msg.key.fromMe }], true)
```

### Label Chat & Pesan (WhatsApp Business)

```js
await sock.addLabel(jid, { labelId1: 1, labelId2: 0 }) // 1 = tambah, 0 = hapus
await sock.addChatLabel(jid, 'labelId')
await sock.removeChatLabel(jid, 'labelId')
await sock.addMessageLabel(jid, messageId, 'labelId')
await sock.removeMessageLabel(jid, messageId, 'labelId')
```

### Balasan Cepat (Quick Reply)

```js
await sock.addOrEditQuickReply({ shortcut: '/halo', message: 'Halo! Ada yang bisa dibantu?' })
await sock.removeQuickReply(timestamp)
```

### Kontak

```js
await sock.addOrEditContact(jid, { firstName: 'Budi', fullName: 'Budi Santoso' })
await sock.removeContact(jid)
```

### Profil Akun Sendiri

```js
// Ganti nama tampilan (push name)
await sock.updateProfileName('Nama Bot Baru')

// Ganti status "about"
await sock.updateProfileStatus('Sibuk melayani pengguna 🤖')

// Ganti foto profil
await sock.updateProfilePicture(sock.user.id, imageBuffer)
await sock.removeProfilePicture(sock.user.id)

// Ambil URL foto profil (jid apa pun)
const url = await sock.profilePictureUrl(jid, 'image') // 'preview' untuk thumbnail kecil
```

### Pengaturan Privasi

```js
await sock.updateLastSeenPrivacy('contacts')        // all | contacts | contact_blacklist | none
await sock.updateOnlinePrivacy('all')                // all | match_last_seen
await sock.updateProfilePicturePrivacy('contacts')
await sock.updateStatusPrivacy('contacts')
await sock.updateReadReceiptsPrivacy('all')          // all | none
await sock.updateGroupsAddPrivacy('contacts')
await sock.updateCallPrivacy('all')                  // all | known
await sock.updateMessagesPrivacy('all')
await sock.updateDefaultDisappearingMode(7 * 24 * 60 * 60)
await sock.updateBlockStatus(jid, 'block')           // 'block' | 'unblock'

const settings = await sock.fetchPrivacySettings()
const blocklist = await sock.fetchBlocklist()
const duration = await sock.fetchDisappearingDuration(jid)
const businessProfile = await sock.getBusinessProfile(jid)
```

### Presence (Online/Typing)

```js
await sock.sendPresenceUpdate('available')      // online
await sock.sendPresenceUpdate('unavailable')    // offline
await sock.sendPresenceUpdate('composing', jid) // "sedang mengetik..."
await sock.sendPresenceUpdate('recording', jid) // "sedang merekam suara..."
await sock.sendPresenceUpdate('paused', jid)    // berhenti mengetik/merekam

// Berlangganan update presence seseorang (perlu untuk melihat "online"/"typing" mereka)
await sock.presenceSubscribe(jid)
```

### Call Link

```js
const callToken = await sock.createCallLink('video') // atau 'audio'
```

### Sinkronisasi App-State Manual

```js
// Paksa resync ulang seluruh app-state (kontak, chat, label, dst) — berguna jika data terasa basi
await sock.resyncAppState(['critical_unblock_low', 'regular'], false)
```

---

## ⬇️ Mengunduh & Memperbarui Media

### `downloadMediaMessage`

```js
import { downloadMediaMessage } from '@vinzsocket/baileys'

sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    const mediaType = Object.keys(msg.message || {})[0]
    if (['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(mediaType)) {
        const buffer = await downloadMediaMessage(
            msg,
            'buffer', // atau 'stream'
            {},
            {
                logger: sock.logger,
                reuploadRequest: sock.updateMediaMessage
            }
        )
        fs.writeFileSync('./media-diterima', buffer)
    }
})
```

Parameter ke-4 (`ctx`) menyediakan `reuploadRequest` — jika media sudah kedaluwarsa di server WA (biasanya setelah beberapa hari/re-fetch gagal), Baileys otomatis meminta pengirim untuk mengunggah ulang media tersebut lewat mekanisme *media retry*.

### `updateMediaMessage`

Dipakai secara internal oleh `downloadMediaMessage` saat retry, tapi bisa dipanggil manual jika Anda tahu sebuah media perlu di-refresh URL/direct path-nya:

```js
const refreshed = await sock.updateMediaMessage(msg)
// msg.message.imageMessage.url sekarang sudah diperbarui, siap didownload ulang
```

---

## 🛡️ Penanganan Error

Harps-Baileys secara konsisten melempar error sebagai instance **`Boom`** (dari `@hapi/boom`), yang membawa `error.output.statusCode` mirip HTTP status code.

```js
import { Boom } from '@hapi/boom'
import { DisconnectReason } from '@vinzsocket/baileys'

sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
        const statusCode = (lastDisconnect?.error instanceof Boom)
            ? lastDisconnect.error.output?.statusCode
            : undefined

        switch (statusCode) {
            case DisconnectReason.badSession:
                console.log('Sesi rusak, hapus folder auth dan pairing ulang.')
                break
            case DisconnectReason.connectionClosed:
            case DisconnectReason.connectionLost:
            case DisconnectReason.timedOut:
                console.log('Koneksi putus sementara, reconnect otomatis.')
                startBot()
                break
            case DisconnectReason.connectionReplaced:
                console.log('Sesi diambil alih perangkat lain, hentikan instance ini.')
                break
            case DisconnectReason.loggedOut:
                console.log('Akun logout dari HP, perlu pairing ulang dari nol.')
                break
            case DisconnectReason.restartRequired:
                console.log('WhatsApp minta restart socket, reconnect.')
                startBot()
                break
            case DisconnectReason.multideviceMismatch:
                console.log('Perangkat tidak mendukung multi-device, cek versi WA.')
                break
            default:
                console.log('Terputus, alasan tidak diketahui:', statusCode)
                startBot()
        }
    }
})
```

**Praktik yang disarankan saat memanggil method socket:**

```js
try {
    await sock.sendMessage(jid, { text: 'Halo' })
} catch (err) {
    if (err instanceof Boom) {
        console.error('Gagal kirim pesan:', err.output?.statusCode, err.message)
    } else {
        console.error('Error tidak terduga:', err)
    }
}
```

---

## 🔁 Reliabilitas & Retry

Beberapa mekanisme bawaan yang membuat koneksi lebih tahan banting terhadap gangguan jaringan/protokol:

- **`enableAutoSessionRecreation`** (default `true`) — otomatis membuat ulang sesi Signal Protocol jika terdeteksi rusak/kadaluarsa saat decrypt gagal, tanpa perlu intervensi manual.
- **`message-retry-manager`** (`Utils/message-retry-manager.js`) — melacak percobaan ulang pengiriman pesan yang gagal terkirim ke device tertentu (di luar batas `maxMsgRetryCount`, pesan dianggap gagal permanen dan tidak diulang lagi).
- **`transactionOpts`** — retry policy untuk transaksi app-state (`maxCommitRetries`, `delayBetweenTriesMs`) saat terjadi konflik konkuren pada sinkronisasi kontak/chat/label.
- **`offline-node-processor`** (`Utils/offline-node-processor.js`) — memproses antrian node yang sempat diterima saat koneksi terputus (mis. pesan yang masuk saat bot offline sesaat) setelah koneksi pulih.
- **`identity-change-handler`** (`Utils/identity-change-handler.js`) — menangani notifikasi perubahan identitas Signal (mis. lawan bicara ganti HP/install ulang WhatsApp), memastikan pesan berikutnya tetap terenkripsi dengan key yang benar alih-alih gagal diam-diam.
- **`stanza-ack`** (`Utils/stanza-ack.js`) — melacak acknowledgment level-protokol dari server untuk setiap node yang dikirim, dengan timeout & retry.
- **`pre-key-manager`** (`Utils/pre-key-manager.js`) — mengelola pool pre-key Signal Protocol, otomatis mengisi ulang (`MIN_PREKEY_COUNT: 5`, target `INITIAL_PREKEY_COUNT: 812`) saat stok menipis agar sesi enkripsi baru selalu bisa dibuat.

Untuk bot produksi, kombinasi berikut biasanya paling stabil:

```js
const sock = makeWASocket({
    auth: state,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true,
    getMessage: async (key) => await myMessageStore.get(key), // penting untuk retry & decrypt ulang
    cachedGroupMetadata: async (jid) => await myGroupCache.get(jid),
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 }
})
```

---

## 🗝️ Referensi Shorthand Field `sendMessage`

Tabel lengkap semua field shorthand yang dikenali `generateWAMessageContent()` pada parameter `content` dari `sendMessage(jid, content)`, untuk dijadikan referensi cepat saat lupa nama field yang tepat.

| Field | Menghasilkan Tipe Pesan | Field Pendamping |
|---|---|---|
| `text` | `conversation` / `extendedTextMessage` | `linkPreview`, `mentions`, `mentionAll`, `backgroundColor`, `font` |
| `image` | `imageMessage` | `caption`, `viewOnce`, `jpegThumbnail` |
| `video` | `videoMessage` | `caption`, `gifPlayback`, `ptv`, `viewOnce`, `seconds` |
| `audio` | `audioMessage` | `ptt`, `mimetype`, `seconds` |
| `sticker` | `stickerMessage` | — |
| `document` | `documentMessage` | `mimetype`, `fileName`, `caption`, `jpegThumbnail` |
| `contacts` | `contactMessage` / `contactsArrayMessage` | `displayName` |
| `location` | `locationMessage` | `name`, `address` |
| `react` | `reactionMessage` | `key` |
| `poll` | `pollCreationMessage(V2/V3)` | `values`, `selectableCount`, `toAnnouncementGroup` |
| `event` | `eventMessage` | `startDate`, `endDate`, `location`, `call`, `extraGuestsAllowed` |
| `delete` | `protocolMessage` (REVOKE) | — |
| `edit` | `protocolMessage` (MESSAGE_EDIT) | `text` |
| `pin` | `pinInChatMessage` | `type`, `time` |
| `forward` | (menyalin `message` dari sumber) | `force` |
| `buttons` / `templateButtons` / `interactiveButtons` | `interactiveMessage.nativeFlowMessage` | `footer`, `image`/`video` header |
| `sections` | `listMessage` | `title`, `buttonText`, `footer` |
| `cards` | `interactiveMessage.carouselMessage` | `footer` |
| `requestPaymentMessage` | `requestPaymentMessage` | `amount`, `currency`, `note`/`sticker` |
| `productMessage` | `interactiveMessage` (viewOnce, header produk) | `title`, `thumbnail`, `buttons` |
| `albumMessage` | `albumMessage` + item terpisah | array item media |
| `pollResultMessage` | `pollResultMessage` | `name`, `pollVotes` |
| `groupStatusMessage` | `groupStatusMessageV2` (khusus di grup) | `text`/`image`/`video`/`audio`/`sticker`/`document`/`card`/`message`/`raw` |
| `multiSelectMessage` | `interactiveMessage` (multi `single_select`) | `selectors`, `extraButtons` |
| `nestedListMessage` | `listMessage` (auto-flatten) | `sections` |

### Mentions & Konteks

| Field | Keterangan |
|---|---|
| `mentions` | Array JID yang di-mention di dalam teks. |
| `mentionAll` | `true` untuk tag semua anggota grup tanpa menuliskan JID satu-satu. |
| `quoted` | Bukan bagian dari `content`, melainkan opsi kedua `sendMessage` — pesan yang di-reply. |
| `contextInfo` | Override manual `contextInfo` mentah (jarang perlu diisi langsung). |

### Aturan Prioritas Deteksi

`generateWAMessageContent()` memeriksa field dalam urutan tertentu — jika beberapa field "utama" hadir sekaligus (jarang terjadi, tapi penting diketahui saat debugging), prioritas umumnya mengikuti urutan: pesan sistem (`delete`/`edit`/`pin`/`react`) → pesan interaktif eksklusif fork (`groupStatusMessage`, `multiSelectMessage`, `nestedListMessage`, `requestPaymentMessage`, `productMessage`, `albumMessage`, `pollResultMessage`) → shorthand interaktif standar (`buttons`/`sections`/`cards`) → media dasar (`image`/`video`/`audio`/`sticker`/`document`) → `text` sebagai fallback paling akhir.

---

## 🧾 Tipe Data (Types) Penting

Semua definisi TypeScript diekspor dari `lib/Types/`. Berikut ringkasan tipe-tipe yang paling sering dipakai sehari-hari (lihat file `.d.ts` masing-masing untuk detail penuh):

| Tipe | Lokasi | Ringkasan |
|---|---|---|
| `WASocket` | `lib/index.d.ts` | Tipe hasil `ReturnType<typeof makeWASocket>` — objek `sock` lengkap. |
| `WAMessage` | `Types/Message.d.ts` | Alias untuk `proto.IWebMessageInfo` — bentuk pesan lengkap dengan `key`, `message`, `messageTimestamp`, dst. |
| `WAMessageKey` | `Types/Message.d.ts` | `{ remoteJid, fromMe, id, participant? }` — identitas unik sebuah pesan. |
| `WAMessageContent` | `Types/Message.d.ts` | Alias `proto.IMessage` — isi pesan (`conversation`, `imageMessage`, dst). |
| `AnyMessageContent` | `Types/Message.d.ts` | Union type dari semua shorthand yang diterima `sendMessage()` (`text`, `image`, `poll`, `buttons`, dst). |
| `MiscMessageGenerationOptions` | `Types/Message.d.ts` | Opsi kedua `sendMessage()` — `quoted`, `mentions`, `ephemeralExpiration`, dst. |
| `AuthenticationCreds` | `Types/Auth.d.ts` | Struktur kredensial identitas akun (`noiseKey`, `signedIdentityKey`, `me`, `account`, dst). |
| `AuthenticationState` | `Types/Auth.d.ts` | `{ creds, keys }` — bentuk yang diterima config `auth`. |
| `SignalDataTypeMap` | `Types/Auth.d.ts` | Union tipe key Signal (`pre-key`, `session`, `sender-key`, `app-state-sync-key`, dst) yang harus didukung `keys.get`/`keys.set`. |
| `GroupMetadata` | `Types/GroupMetadata.d.ts` | Bentuk hasil `groupMetadata()` / `groupFetchAllParticipating()`. |
| `GroupParticipant` | `Types/GroupMetadata.d.ts` | `{ id, admin, jid?, phoneNumber? }` — satu baris anggota grup. |
| `Chat` | `Types/Chat.d.ts` | Representasi chat dalam sinkronisasi app-state. |
| `Contact` | `Types/Contact.d.ts` | `{ id, name?, notify?, verifiedName?, imgUrl?, status? }`. |
| `PresenceData` | `Types/Chat.d.ts` | `{ lastKnownPresence, lastSeen? }`. |
| `BaileysEventMap` | `Types/Events.d.ts` | Interface pemetaan nama event → tipe payloadnya (dipakai untuk type-safety `sock.ev.on(...)`). |
| `WAUSyncQuery` / `USyncUser` | `WAUSync/*.d.ts` | Query batch untuk cek status device banyak user sekaligus (dipakai internal saat kirim pesan). |
| `BusinessProfile` | `Types/Bussines.d.ts` | Struktur profil bisnis (`description`, `email`, `website`, `category`, dst). |
| `WAMessageStubType` | `Types/index.d.ts` | Enum tipe pesan "stub" (event sistem seperti ganti subjek grup, anggota keluar, dst — muncul sebagai pesan tanpa `message` asli). |
| `WAMessageAddressingMode` | `Types/index.d.ts` | `'pn'` atau `'lid'` — mode pengalamatan grup (memengaruhi bagaimana `participant` JID terbentuk). |
| `DisconnectReason` | `Types/index.d.ts` | Enum kode alasan disconnect (lihat tabel di bagian [Penanganan Error](#-penanganan-error)). |

### Type-Safety untuk Event Listener (TypeScript)

```ts
import type { BaileysEventMap } from '@vinzsocket/baileys'

sock.ev.on('messages.upsert', (data) => {
    // `data` otomatis ter-infer sebagai BaileysEventMap['messages.upsert']
    const { messages, type } = data
})
```

### Enum `DisconnectReason` Lengkap

```js
import { DisconnectReason } from '@vinzsocket/baileys'

console.log(DisconnectReason)
// {
//   connectionClosed: 428,
//   connectionLost: 408,
//   connectionReplaced: 440,
//   timedOut: 408,
//   loggedOut: 401,
//   badSession: 500,
//   restartRequired: 515,
//   multideviceMismatch: 411,
//   forbidden: 403,
//   unavailableService: 503
// }
```

> Catatan: `connectionLost` dan `timedOut` sengaja memakai kode HTTP status yang sama (`408`) — bedakan lewat pesan error (`lastDisconnect.error.message`) jika Anda perlu membedakan penyebabnya secara presisi.

---

## 🧬 WAProto

`WAProto/index.js` mengekspor `proto` — hasil kompilasi definisi [Protocol Buffers](https://protobuf.dev/) resmi WhatsApp (`WAProto.proto`) via `protobufjs`. Semua struktur pesan WhatsApp pada level paling mentah (`Message`, `WebMessageInfo`, `HistorySync`, `SyncdPatch`, dst) berasal dari sini.

```js
import { proto } from '@vinzsocket/baileys'

// Membuat instance pesan protobuf secara manual (jarang dibutuhkan langsung,
// biasanya sudah dibungkus oleh generateWAMessageContent dsb)
const reaction = proto.Message.ReactionMessage.create({
    key: msg.key,
    text: '🔥',
    senderTimestampMs: Date.now()
})

// Enum penting yang sering dipakai
console.log(proto.Message.ProtocolMessage.Type.REVOKE)
console.log(proto.Message.ListMessage.ListType.SINGLE_SELECT)
console.log(proto.HistorySync.HistorySyncType.FULL)
console.log(proto.MediaRetryNotification.ResultType.SUCCESS)
```

Regenerasi definisi protobuf (untuk maintainer, jika WhatsApp merilis skema baru):

```bash
npm run gen:protobuf   # menjalankan WAProto/GenerateStatics.sh
```

Anda **tidak perlu** melakukan ini sebagai konsumen library — cukup update ke versi terbaru `@vinzsocket/baileys` saat WhatsApp mengubah protokolnya.

---

## 🧩 Contoh Lengkap: Struktur Bot dengan Plugin

Pola umum yang dipakai di ekosistem Harps-MD — memisahkan koneksi socket dari logic per-perintah (plugin), sehingga mudah dikembangkan berkelanjutan.

```js
// index.js — entry point
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@vinzsocket/baileys'
import { Boom } from '@hapi/boom'
import { handleMessage } from './handler.js'

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('sesi_auth')

    const sock = makeWASocket({
        auth: state,
        syncFullHistory: false,
        markOnlineOnConnect: true,
        getMessage: async () => undefined
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) console.log('Scan QR ini:', qr)
        if (connection === 'close') {
            const code = (lastDisconnect?.error instanceof Boom) ? lastDisconnect.error.output?.statusCode : 0
            if (code !== DisconnectReason.loggedOut) {
                connectToWhatsApp()
            } else {
                console.log('Logged out. Hapus folder sesi_auth dan pairing ulang.')
            }
        }
    })

    sock.ev.on('messages.upsert', async (m) => handleMessage(sock, m))

    return sock
}

connectToWhatsApp()
```

```js
// handler.js — router perintah sederhana
const commands = new Map()

commands.set('ping', async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { text: 'pong 🏓' }, { quoted: msg })
})

commands.set('menu', async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
        text: 'Pilih menu:',
        footer: 'Harps-MD',
        buttons: [
            { id: 'ping', text: '🏓 Ping' },
            { id: 'info', text: 'ℹ️ Info' }
        ]
    }, { quoted: msg })
})

export async function handleMessage(sock, { messages, type }) {
    if (type !== 'notify') return
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.buttonsResponseMessage?.selectedButtonId ||
        msg.message.templateButtonReplyMessage?.selectedId ||
        msg.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
        ''

    const prefix = '.'
    if (!text.startsWith(prefix)) return

    const [cmd] = text.slice(prefix.length).trim().split(/\s+/)
    const handler = commands.get(cmd.toLowerCase())
    if (handler) {
        try {
            await handler(sock, msg)
        } catch (err) {
            console.error(`Error di command "${cmd}":`, err)
            await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Terjadi kesalahan saat memproses perintah.' })
        }
    }
}
```

**Catatan penting soal deteksi balasan tombol:** karena Harps-Baileys hanya menghasilkan Native Flow modern, balasan tombol/list akan masuk lewat salah satu dari:

- `msg.message.interactiveResponseMessage?.nativeFlowResponseMessage` — untuk balasan `quick_reply`, `single_select`, dst dari `interactiveMessage`. Payload aslinya berupa string JSON di field `.paramsJson` yang perlu di-`JSON.parse()`.
- `msg.message.buttonsResponseMessage?.selectedButtonId` — untuk balasan yang dibuat dari shorthand `buttons` klasik (jika masih terdeteksi sebagai legacy oleh WhatsApp Anda sendiri — jarang terjadi di client terbaru).
- `msg.message.listResponseMessage?.singleSelectReply?.selectedRowId` — untuk balasan `nestedListMessage` / list legacy.

Contoh parsing `nativeFlowResponseMessage`:

```js
const nfResponse = msg.message?.interactiveResponseMessage?.nativeFlowResponseMessage
if (nfResponse) {
    const params = JSON.parse(nfResponse.paramsJson)
    console.log('User memilih:', params.id || params.selectedRowId || params)
}
```

---

## 🔄 Migrasi dari Baileys Upstream / Fork Lain

Harps-Baileys mempertahankan kompatibilitas API sebisa mungkin, tapi ada beberapa poin yang perlu diperhatikan saat migrasi:

### 1. Ganti Import

```diff
- import makeWASocket from '@whiskeysockets/baileys'
+ import makeWASocket from '@vinzsocket/baileys'
```

Semua named export (`useMultiFileAuthState`, `DisconnectReason`, `Browsers`, `downloadMediaMessage`, `proto`, dst) tetap memakai nama yang sama, jadi umumnya cukup mengganti path import.

### 2. `package.json` Harus Konsisten

Jika bot Anda sebelumnya bercampur antara beberapa fork Baileys (mis. bekas migrasi dari `@kevin-b2t/baileys`, `@whiskeysockets/baileys`, dsb), pastikan **hanya satu** entri Baileys yang terpasang di `package.json` dan tidak ada duplikat di `node_modules` (bisa dicek dengan `npm ls baileys` atau memeriksa symlink di `node_modules/.bin`). Package name yang salah (mis. import dari fork A tapi `package.json` menunjuk fork B) adalah penyebab umum kegagalan silent — modul termuat tanpa error, tapi API yang dipakai tidak ada/berbeda perilaku.

### 3. Legacy Buttons Otomatis Dikonversi

Kode lama yang memakai `buttonsMessage` atau `templateButtons` langsung (bukan lewat shorthand `sendMessage`) tetap bisa jalan, tapi disarankan pindah ke shorthand `buttons` / `nfButtonXxx` karena WhatsApp sudah men-deprecate rendering `buttonsMessage` mentah di banyak versi client.

### 4. Native Flow Button Payload Tetap Sama

Jika fork lama Anda sudah memakai `interactiveMessage.nativeFlowMessage.buttons`, format `{ name, buttonParamsJson }` tetap identik — kode Anda kemungkinan besar langsung kompatibel tanpa perubahan.

### 5. `additionalNodes` Sudah Otomatis

Jika sebelumnya Anda menambahkan `additionalNodes` secara manual di setiap `relayMessage()` untuk pesan interaktif (pola umum di banyak fork/bot komunitas), Anda **bisa menghapusnya** dan biarkan `sendMessage()` menanganinya — atau biarkan saja jika Anda memakai `relayMessage()` langsung (`buildInteractiveAdditionalNodes` tetap diekspor untuk kasus itu).

### 6. Update Script `menu.js`/Handler Anda

Jika handler lama Anda memiliki logic khusus untuk mem-parsing `buttonsResponseMessage` atau `templateButtonReplyMessage`, tambahkan juga penanganan `interactiveResponseMessage.nativeFlowResponseMessage` (lihat contoh parsing di bagian sebelumnya) karena itulah bentuk balasan yang dominan di client WhatsApp modern.

---

## ❓ Troubleshooting / FAQ

### Q: Bot terkoneksi tapi tombol/list yang saya kirim tidak muncul di HP penerima?

**A:** Ini hampir selalu soal `additionalNodes` binary hint yang hilang. Jika Anda memakai `sock.sendMessage()` biasa, ini seharusnya sudah otomatis. Jika Anda memakai `relayMessage()` secara manual, pastikan menyertakan `buildInteractiveAdditionalNodes(jid, message)` — lihat bagian [`buildInteractiveAdditionalNodes`](#buildinteractiveadditionalnodes--kenapa-wajib-ada). Pastikan juga Anda sedang menjalankan versi ≥ 3.2.14 untuk `groupStatusMessage`, karena bug ini pernah terjadi khusus untuk Group Status V2 sebelum versi tersebut.

### Q: Error `ERR_REQUIRE_ESM` saat `require('@vinzsocket/baileys')`?

**A:** Package ini murni ESM. Solusinya:
1. Upgrade Node.js ke ≥ 20.19.0 (atau ≥ 22.12.0 / ≥ 23.x) agar `require(esm)` bawaan Node bisa dipakai, **atau**
2. Ganti `require()` menjadi `import()` dinamis:
   ```js
   const { default: makeWASocket } = await import('@vinzsocket/baileys')
   ```
3. Ubah `package.json` proyek Anda menjadi `"type": "module"` dan pakai `import` secara native.

### Q: Instalasi gagal / keluar pesan "This package requires Node.js 20+"?

**A:** `engine-requirements.js` (dijalankan lewat hook `preinstall`) sengaja menghentikan instalasi jika Node.js Anda di bawah versi 20, karena Harps-Baileys memakai fitur bahasa & API Node modern yang tidak tersedia di versi lebih lama. Upgrade Node.js Anda (disarankan memakai [nvm](https://github.com/nvm-sh/nvm) untuk memudahkan pergantian versi).

### Q: `renderStoryCard()` melempar error soal "jimp"?

**A:** Install peer dependency opsionalnya:
```bash
npm install jimp
```
Modul ini sengaja **lazy-imported** (tidak jadi hard dependency) supaya konsumen yang tidak memakai fitur story card tidak perlu menanggung ukuran bundle `jimp`.

### Q: Bagaimana cara menampilkan nomor telepon anggota grup, tapi kadang yang muncul cuma angka aneh/panjang?

**A:** Itu tandanya JID tersebut berformat `@lid` (Linked Identity — sistem privasi baru WhatsApp), bukan nomor telepon asli. WhatsApp memang **sengaja tidak selalu mengungkapkan** nomor telepon asli anggota grup ke anggota lain. Jangan menampilkan digit LID mentah sebagai nomor telepon — pakai `isLidUser(jid)` untuk mendeteksinya, dan gunakan `buildTagAllText()` (lihat [Mention Utilities](#-mention-utilities-mentionjs)) yang sudah menangani fallback nama/label secara aman.

### Q: Apakah Harps-Baileys mendukung WhatsApp Flow (form registrasi multi-field native)?

**A:** Dukungan native multi-field Flow form (`flow_json` dengan banyak field terstruktur, validasi server-side, dsb — fitur "WhatsApp Flows" penuh) **belum diverifikasi tersedia** secara native di fork ini pada versi 3.2.14. Alternatif yang bisa dipakai sekarang adalah **form terpandu bertahap** (guided step-by-step): kirim serangkaian pertanyaan satu per satu memakai `interactiveMessage` biasa (teks/tombol/list) dan simpan progres jawaban di state percakapan bot Anda sendiri, alih-alih mengandalkan satu payload Flow form native. Jika kebutuhan Anda spesifik untuk Flow form penuh, pantau `CHANGELOG.md` untuk update fitur ini di rilis mendatang.

### Q: Pesan text saya yang mengandung URL tidak menampilkan link preview?

**A:** Pastikan package opsional `link-preview-js` terpasang. Jika sudah terpasang tapi tetap tidak muncul, kemungkinan:
- URL-nya tidak cocok dengan `URL_REGEX` bawaan (harus diawali `https://`).
- Situs tujuan memblokir scraping metadata Open Graph.
- Anda menyetel `linkPreview: null` secara eksplisit di payload.

### Q: Bagaimana cara mengetahui apakah sebuah pesan berasal dari grup atau chat pribadi?

**A:**
```js
import { isJidGroup } from '@vinzsocket/baileys'

const isGroupMsg = isJidGroup(msg.key.remoteJid)
```

### Q: Sesi tiba-tiba logout sendiri tanpa saya scan ulang atau logout manual?

**A:** Penyebab umum:
- Anda login WhatsApp Web/Desktop resmi dengan akun yang sama dan memutus semua linked device.
- Folder auth state (`sesi_auth`) rusak/terhapus sebagian — cek apakah semua file `session-*.json`, `creds.json` masih lengkap.
- Terlalu banyak percobaan koneksi gagal beruntun terdeteksi sebagai aktivitas mencurigakan oleh WhatsApp.

Solusi paling aman: hapus folder auth state, lalu pairing ulang dari nol.

### Q: `groupMetadata()` lambat dipanggil berulang kali untuk grup yang sama?

**A:** Manfaatkan opsi `cachedGroupMetadata` di config, dan invalidasi cache-nya saat event `groups.update` / `group-participants.update` terjadi — lihat contoh di bagian [Konfigurasi Koneksi](#-konfigurasi-koneksi).

### Q: Apakah aman menjalankan banyak instance bot dengan folder auth state yang sama?

**A:** **Tidak.** Setiap instance socket harus punya auth state (dan karenanya, satu "linked device slot") sendiri. Menjalankan dua proses dengan folder auth yang sama secara bersamaan akan menyebabkan konflik sesi Signal Protocol dan kemungkinan besar salah satu (atau keduanya) logout/rusak.

### Q: Bagaimana menangani rate limit saat mengirim pesan massal (broadcast)?

**A:** Beri jeda antar pengiriman (mis. 1–3 detik) dan hindari mengirim ke ratusan/ribuan nomor dalam waktu sangat singkat — WhatsApp mendeteksi pola ini sebagai spam dan bisa memblokir/membanned akun. Pertimbangkan memakai antrian (queue) dengan concurrency terbatas, misalnya dengan `p-queue` (sudah menjadi dependency internal library ini, aman untuk dipakai juga di kode bot Anda).

```js
import PQueue from 'p-queue'
const queue = new PQueue({ concurrency: 1, interval: 2000, intervalCap: 1 })

for (const jid of daftarPenerima) {
    queue.add(() => sock.sendMessage(jid, { text: 'Pengumuman broadcast' }))
}
```

### Q: Apa bedanya `groupStatusMessage` dengan mengirim status pribadi biasa?

**A:** Status pribadi biasa dikirim ke `status@broadcast` dan tampil di tab Status semua kontak Anda. `groupStatusMessage` (Group Status V2) mengirim story **khusus untuk sebuah grup tertentu** — hanya anggota grup tersebut yang melihatnya sebagai ring status, terpisah dari status pribadi Anda.

### Q: Bisakah satu bot menangani banyak akun WhatsApp sekaligus?

**A:** Bisa, dengan menjalankan satu instance `makeWASocket()` **terpisah per akun**, masing-masing dengan folder auth state sendiri-sendiri:

```js
const akunList = ['akun1', 'akun2', 'akun3']
const sockets = {}

for (const nama of akunList) {
    const { state, saveCreds } = await useMultiFileAuthState(`./sesi_${nama}`)
    const sock = makeWASocket({ auth: state })
    sock.ev.on('creds.update', saveCreds)
    sockets[nama] = sock
}
```

Perhatikan penggunaan memori & CPU akan meningkat linear dengan jumlah akun yang dijalankan — pertimbangkan pemisahan proses (mis. lewat PM2 cluster atau container terpisah) untuk skala yang lebih besar.

### Q: Kenapa `groupMetadata()` kadang mengembalikan data anggota yang sudah tidak akurat (mis. admin yang sebenarnya sudah di-demote)?

**A:** Jika Anda memakai `cachedGroupMetadata`, pastikan cache tersebut **diinvalidasi** setiap kali event `group-participants.update` atau `groups.update` terjadi untuk grup terkait — lihat contoh invalidasi cache di bagian [Konfigurasi Koneksi](#-konfigurasi-koneksi). Tanpa invalidasi, data yang tersimpan di cache Anda akan menjadi basi (stale) seiring waktu.

---

## 🔢 Versi & Kompatibilitas WhatsApp

WhatsApp Web Multi-Device tidak memiliki dokumentasi resmi publik — protokolnya dipelajari lewat reverse-engineering berkelanjutan oleh komunitas. Konsekuensinya:

- Field `version` di konfigurasi (`[2, 3000, 1035194821]` per default saat ini) perlu sesekali diperbarui mengikuti rilis WhatsApp Web terbaru. Versi yang terlalu usang berisiko ditolak server (`connection.update` gagal terus-menerus) atau berperilaku tidak konsisten.
- Selalu update ke rilis Harps-Baileys terbaru secara berkala, terutama jika Anda mengalami error koneksi yang sebelumnya tidak terjadi — kemungkinan besar WhatsApp baru saja mengubah sesuatu di level protokol dan rilis terbaru sudah menyesuaikan.
- Jika sebuah fitur tiba-tiba berhenti berfungsi tanpa perubahan kode di sisi Anda, cek dulu [`CHANGELOG.md`](./CHANGELOG.md) dan issue tracker GitHub sebelum mengasumsikan itu bug baru — kemungkinan sudah ada laporan/fix serupa dari pengguna lain.

---



## 📋 Referensi Cepat: Semua Method `sock`

Tabel referensi cepat seluruh method yang tersedia di objek `sock`, dikelompokkan per kategori, untuk dicari dengan cepat tanpa harus membaca ulang seluruh dokumentasi di atas.

### Koneksi & Sesi

| Method | Deskripsi |
|---|---|
| `sock.end(error?)` | Menutup koneksi socket secara manual. |
| `sock.logout(msg?)` | Logout dari WhatsApp (menghapus linked device dari HP). |
| `sock.requestPairingCode(nomor)` | Meminta kode pairing untuk login tanpa scan QR. |
| `sock.waitForConnectionUpdate(cb)` | Menunggu sampai kondisi tertentu terpenuhi pada `connection.update`. |
| `sock.waitForSocketOpen()` | Menunggu socket WebSocket benar-benar terbuka. |

### Pesan

| Method | Deskripsi |
|---|---|
| `sock.sendMessage(jid, content, options?)` | Pintu utama mengirim segala jenis pesan. |
| `sock.relayMessage(jid, message, options)` | Kirim payload protobuf mentah langsung (level rendah). |
| `sock.readMessages(keys)` | Tandai daftar pesan sebagai sudah dibaca (kirim read receipt). |
| `sock.sendReceipt(jid, participant, ids, type)` | Kirim receipt manual (delivered/read/played). |
| `sock.sendReceipts(keys, type)` | Versi batch dari `sendReceipt`. |
| `sock.updateMediaMessage(msg)` | Minta re-upload/refresh media yang kadaluarsa. |
| `sock.refreshMediaConn(forceGet?)` | Refresh koneksi host upload media. |
| `sock.generateWAMessage(jid, content, options)` | Hasilkan objek `WAMessage` lengkap tanpa mengirimnya. |
| `sock.generateWAMessageContent(content, options)` | Hasilkan hanya isi (`message`) tanpa key/metadata. |
| `sock.generateWAMessageFromContent(jid, content, options)` | Bungkus konten mentah jadi `WAMessage` siap kirim. |
| `sock.prepareWAMessageMedia(content, options)` | Unggah & siapkan media (dipakai internal oleh generator pesan). |

### Grup

| Method | Deskripsi |
|---|---|
| `sock.groupMetadata(jid)` | Ambil metadata sebuah grup. |
| `sock.groupCreate(subject, participants)` | Buat grup baru. |
| `sock.groupLeave(jid)` | Keluar dari grup. |
| `sock.groupUpdateSubject(jid, subject)` | Ganti nama grup. |
| `sock.groupUpdateDescription(jid, desc)` | Ganti deskripsi grup. |
| `sock.groupParticipantsUpdate(jid, participants, action)` | Tambah/keluarkan/promosikan/turunkan anggota. |
| `sock.groupRequestParticipantsList(jid)` | Lihat daftar permintaan join pending. |
| `sock.groupRequestParticipantsUpdate(jid, participants, action)` | Setujui/tolak permintaan join. |
| `sock.groupInviteCode(jid)` | Ambil kode undangan aktif. |
| `sock.groupRevokeInvite(jid)` | Cabut & buat ulang kode undangan. |
| `sock.groupAcceptInvite(code)` | Terima undangan via kode. |
| `sock.groupRevokeInviteV4(groupJid, invitedJid)` | Kirim undangan langsung ke JID tertentu. |
| `sock.groupGetInviteInfo(code)` | Lihat info grup dari kode tanpa join. |
| `sock.groupToggleEphemeral(jid, exp)` | Aktif/nonaktifkan pesan sekali lihat di grup. |
| `sock.groupSettingUpdate(jid, setting)` | Ubah siapa yang boleh kirim pesan/edit info. |
| `sock.groupMemberAddMode(jid, mode)` | Ubah siapa yang boleh menambah anggota. |
| `sock.groupJoinApprovalMode(jid, mode)` | Aktif/nonaktifkan mode approval join. |
| `sock.groupFetchAllParticipating()` | Ambil semua grup yang diikuti akun ini. |

### Komunitas

| Method | Deskripsi |
|---|---|
| `sock.communityMetadata(jid)` | Ambil metadata komunitas. |
| `sock.communityCreate(subject, body)` | Buat komunitas baru. |
| `sock.communityCreateGroup(subject, participants, parentJid)` | Buat grup baru di dalam komunitas. |
| `sock.communityLeave(jid)` | Keluar dari komunitas. |
| `sock.communityUpdateSubject(jid, subject)` | Ganti nama komunitas. |
| `sock.communityLinkGroup(groupJid, parentJid)` | Hubungkan grup existing ke komunitas. |
| `sock.communityUnlinkGroup(groupJid, parentJid)` | Lepaskan grup dari komunitas. |
| `sock.communityFetchLinkedGroups(jid)` | Lihat semua grup yang terhubung. |
| `sock.communityRequestParticipantsList(jid)` / `...Update(...)` | Kelola permintaan join komunitas. |
| `sock.communityParticipantsUpdate(jid, participants, action)` | Kelola anggota komunitas. |
| `sock.communityInviteCode(jid)` / `communityRevokeInvite(jid)` / `communityAcceptInvite(code)` | Kelola undangan komunitas. |
| `sock.communityToggleEphemeral(jid, exp)` | Pesan sekali lihat tingkat komunitas. |
| `sock.communitySettingUpdate` / `communityMemberAddMode` / `communityJoinApprovalMode` | Pengaturan komunitas. |
| `sock.communityFetchAllParticipating()` | Ambil semua komunitas yang diikuti. |

### Business

| Method | Deskripsi |
|---|---|
| `sock.getOrderDetails(orderId, token)` | Ambil detail order dari sebuah payload order. |
| `sock.getCatalog(opts)` | Ambil katalog produk. |
| `sock.getCollections(jid, limit)` | Ambil koleksi produk. |
| `sock.productCreate(product)` | Tambah produk baru. |
| `sock.productUpdate(id, update)` | Update produk. |
| `sock.productDelete(ids)` | Hapus produk. |
| `sock.updateBussinesProfile(profile)` | Update profil bisnis. |
| `sock.updateCoverPhoto(buffer)` / `removeCoverPhoto()` | Kelola foto sampul bisnis. |

### Newsletter / Channel

| Method | Deskripsi |
|---|---|
| `sock.newsletterCreate(name, desc)` | Buat channel baru. |
| `sock.newsletterMetadata(type, key)` | Ambil metadata channel. |
| `sock.newsletterUpdateName/Description/Picture(...)` | Update info channel. |
| `sock.newsletterRemovePicture(jid)` | Hapus foto channel. |
| `sock.newsletterSubscribers(jid)` | Lihat daftar subscriber. |
| `sock.newsletterReactMessage(jid, serverId, reaction)` | React ke post channel. |
| `sock.newsletterFetchMessages(jid, count, since, after)` | Ambil histori post channel. |
| `sock.subscribeNewsletterUpdates(jid)` | Berlangganan update real-time channel. |
| `sock.newsletterAdminCount(jid)` | Hitung jumlah admin channel. |
| `sock.newsletterChangeOwner(jid, newOwnerJid)` | Pindah kepemilikan channel. |
| `sock.newsletterDemote(jid, userJid)` | Copot admin channel. |
| `sock.newsletterDelete(jid)` | Hapus channel. |

### Chat, Profil & Privasi

| Method | Deskripsi |
|---|---|
| `sock.chatModify(mod, jid)` | Primitif dasar untuk semua modifikasi chat (arsip/pin/mute/dll). |
| `sock.star(keys, star)` | Bintangi/batalkan bintang pesan. |
| `sock.addLabel/addChatLabel/removeChatLabel/addMessageLabel/removeMessageLabel` | Kelola label (Business). |
| `sock.addOrEditQuickReply(qr)` / `removeQuickReply(ts)` | Kelola balasan cepat. |
| `sock.addOrEditContact(jid, contact)` / `removeContact(jid)` | Kelola kontak. |
| `sock.updateProfileName/Status/Picture` | Update profil akun sendiri. |
| `sock.removeProfilePicture(jid)` | Hapus foto profil. |
| `sock.profilePictureUrl(jid, type)` | Ambil URL foto profil siapa pun. |
| `sock.getBusinessProfile(jid)` | Ambil profil bisnis JID tertentu. |
| `sock.update*Privacy(...)` (last seen, online, dsb) | Semua pengaturan privasi. |
| `sock.fetchPrivacySettings()` / `fetchBlocklist()` / `fetchDisappearingDuration(jid)` | Ambil pengaturan privasi saat ini. |
| `sock.updateBlockStatus(jid, action)` | Blokir/buka blokir kontak. |
| `sock.sendPresenceUpdate(type, jid?)` | Kirim status online/typing/recording. |
| `sock.presenceSubscribe(jid)` | Berlangganan presence seseorang. |
| `sock.createCallLink(type)` | Buat link panggilan audio/video. |
| `sock.resyncAppState(collections, isInitial)` | Paksa resync app-state. |

---

## 🎮 Contoh Penerapan di Sistem RPG

Bagian ini mengumpulkan pola-pola pemakaian Harps-Baileys yang relevan untuk bot bergaya **RPG/game system** (nation-building, ekonomi, teknologi, dst) — menggabungkan beberapa fitur eksklusif fork ini sekaligus.

### Menu Konfigurasi Karakter dengan Multi-Select

```js
await sock.sendMessage(jid, {
    multiSelectMessage: {
        title: '⚙️ Setup Awal Karakter',
        footer: 'Pilih kelas & fraksi untuk memulai',
        selectors: [
            {
                displayText: '🧙 Pilih Kelas',
                sections: [
                    { title: 'Kelas Tempur', rows: [
                        { id: 'warrior', title: '⚔️ Warrior', description: 'HP tinggi, damage fisik' },
                        { id: 'mage', title: '🔮 Mage', description: 'Damage sihir, HP rendah' }
                    ]}
                ]
            },
            {
                displayText: '🏳️ Pilih Fraksi Negara',
                sections: [
                    { title: 'Fraksi', rows: [
                        { id: 'kerajaan_utara', title: '❄️ Kerajaan Utara' },
                        { id: 'republik_selatan', title: '☀️ Republik Selatan' }
                    ]}
                ]
            }
        ]
    }
}, { quoted: msg })
```

### Notifikasi Event Negara ke Grup via Story

Untuk sistem `rpg-negara.js` yang punya mekanik geopolitik (full-conquest, food crisis, ceasefire, dst), Group Status V2 + `renderStoryCard` cocok dipakai sebagai notifikasi visual otomatis:

```js
async function umumkanPerangNegara(sock, groupJid, negaraA, negaraB) {
    await sock.sendMessage(groupJid, {
        groupStatusMessage: {
            card: {
                title: '⚔️ PERANG PECAH!',
                body: `${negaraA} menyatakan perang terhadap ${negaraB}`,
                footer: 'Sistem Geopolitik Harps-MD',
                gradient: 'fire'
            },
            caption: 'Ketuk untuk lihat detail peperangan.'
        }
    })
}
```

### Katalog Perusahaan dengan Carousel

Untuk `rpg-perusahaan.js` yang menampilkan daftar aset/saham:

```js
await sock.sendMessage(jid, {
    text: 'Portofolio investasi Anda:',
    footer: 'Bursa Saham Harps-MD',
    cards: perusahaanList.map(p => ({
        image: { url: p.logoUrl },
        title: p.nama,
        body: `Harga saham: ${p.harga} | Pertumbuhan: ${p.pertumbuhan}%`,
        buttons: [
            { id: `beli_saham_${p.id}`, text: '📈 Beli' },
            { id: `jual_saham_${p.id}`, text: '📉 Jual' }
        ]
    }))
})
```

### List Bersarang untuk Katalog Teknologi/Chipset

Untuk `rpg-teknologi.js` dengan arsitektur chipset/GPU berjenjang (kategori → sub-kategori → item):

```js
await sock.sendMessage(jid, {
    nestedListMessage: {
        title: '🖥️ Katalog Chipset',
        buttonText: 'Lihat Chipset',
        footer: 'Sistem Teknologi Harps-MD',
        sections: [
            {
                title: '⚡ Chipset Tier 1',
                rows: [
                    { rowId: 'chip_a1', title: 'NeoCore X1', description: '3.2 GHz, 8 core' },
                    {
                        title: '🎮 GPU Sub-Kategori',
                        rows: [
                            { rowId: 'gpu_x1', title: 'VoltEdge RTX-Z', description: '16GB VRAM' }
                        ]
                    }
                ]
            }
        ]
    }
}, { quoted: msg })
```

### Tag Semua Investor Saat Ada Pergerakan Pasar Besar

Menggabungkan `buildTagAllText` dengan notifikasi pasar saham NPC whale:

```js
import { buildTagAllText } from '@vinzsocket/baileys/lib/Utils/mention.js'

async function notifikasiCrashPasar(sock, groupJid) {
    const metadata = await sock.groupMetadata(groupJid)
    const { text, mentions } = buildTagAllText(metadata.participants, {
        header: '🚨 PASAR SAHAM ANJLOK! NPC Whale baru saja melakukan aksi jual besar-besaran.',
        footer: 'Cek portofolio Anda sekarang sebelum kerugian bertambah.'
    })
    await sock.sendMessage(groupJid, { text, mentions })
}
```

---

## ⚡ Tips Performa

- **Matikan `syncFullHistory`** (`false`) jika bot Anda tidak butuh riwayat chat lengkap saat pairing pertama — mempercepat waktu koneksi awal secara signifikan pada akun dengan riwayat chat besar.
- **Selalu isi `cachedGroupMetadata`** dengan cache Anda sendiri (in-memory `NodeCache`, Redis, dsb) — tanpa ini, setiap pengiriman pesan ke grup memicu query `groupMetadata` baru ke server.
- **Selalu isi `getMessage`** dengan resolver dari store pesan Anda — dibutuhkan untuk retry pengiriman gagal, decrypt ulang, dan proses edit/pin pesan lama. Tanpa ini, operasi tersebut bisa gagal senyap.
- **Gunakan `enableRecentMessageCache: true`** (default) supaya lookup pesan terbaru tidak perlu selalu memanggil `getMessage` custom Anda.
- **Batasi `logger` ke level `warn`/`error`** di produksi (`pino({ level: 'warn' })`) — logging level `debug` sangat verbose dan bisa memperlambat proses I/O pada bot dengan traffic tinggi.
- **Gunakan `sock.ev.buffer()` / `sock.ev.flush()`** saat melakukan operasi massal (mis. restore ratusan kontak) agar handler event Anda tidak terpanggil berkali-kali secara terpisah.
- **Hindari memanggil `groupMetadata()` di dalam loop** untuk banyak grup sekaligus — gunakan `groupFetchAllParticipating()` sekali saja lalu simpan hasilnya ke cache.
- **Batasi concurrency saat broadcast** (lihat contoh `p-queue` di bagian FAQ) untuk menghindari flag spam dari WhatsApp sekaligus menjaga stabilitas koneksi socket.
- **Gunakan `viewOnce: true` secukupnya** — media view-once tetap perlu diunggah penuh ke server WA seperti media biasa, tidak ada penghematan bandwidth dari sisi pengiriman.

---

## 🔒 Keamanan & Best Practices

- **Jangan pernah commit folder auth state** (`sesi_auth/`, `creds.json`, dsb) ke git — file-file ini setara dengan kredensial login penuh ke akun WhatsApp terkait. Tambahkan ke `.gitignore`.
- **Jangan bagikan `creds.json`** ke pihak lain atau upload ke layanan publik (paste bin, forum, dsb) — siapa pun yang memilikinya bisa menyamar sebagai linked device Anda.
- **Validasi input dari pengguna** sebelum diteruskan ke `sendMessage` (mis. `jid` tujuan) untuk mencegah bot disalahgunakan mengirim pesan ke JID yang tidak dimaksud.
- **Batasi command sensitif** (broadcast massal, kick anggota, hapus data) hanya untuk JID admin yang sudah diverifikasi — jangan hanya mengandalkan prefix command tanpa pengecekan pengirim.
- **Gunakan `shouldIgnoreJid`** di config untuk secara eksplisit mengabaikan JID tertentu (mis. broadcast list, JID yang diketahui sebagai sumber spam) sebelum diproses lebih jauh oleh event handler Anda.
- **Selalu bungkus handler pesan dengan `try/catch`** — satu error tak tertangani di handler tidak boleh sampai membuat seluruh proses bot crash.
- **Perhatikan rate limit WhatsApp** — pengiriman pesan dalam volume sangat tinggi dalam waktu singkat berisiko membuat akun terkena flag spam atau bahkan banned permanen. Ini bukan batasan dari Harps-Baileys, melainkan kebijakan WhatsApp di level protokol/server.
- **Update library secara berkala** — WhatsApp cukup sering mengubah detail protokol level rendah; versi Harps-Baileys yang usang berisiko berhenti berfungsi tanpa peringatan (mis. `version` di config perlu disesuaikan dengan rilis WA Web terbaru).

---

## 🆚 Perbandingan dengan Baileys Upstream

Tabel ini merangkum perbedaan utama antara Harps-Baileys dan Baileys upstream (`@whiskeysockets/baileys`), khusus untuk fitur-fitur yang relevan bagi pengembang bot.

| Fitur | Baileys Upstream | Harps-Baileys |
|---|---|---|
| Kirim teks, media dasar, kontak, lokasi, reaksi, poll | ✅ | ✅ |
| Native Flow buttons (`quick_reply`, `cta_url`, dll) | ✅ (manual, perlu tahu shape proto) | ✅ + shorthand `buttons`/`templateButtons` yang lebih ringkas |
| List message | ✅ | ✅ + `nestedListMessage` dengan auto-flatten section bersarang |
| Carousel (`cards`) | Tergantung versi, sering perlu payload manual | ✅ shorthand `cards` siap pakai |
| Multi-dropdown dalam satu pesan | ❌ tidak ada bawaan | ✅ `multiSelectMessage` |
| Story/status ke grup tertentu | ❌ tidak ada bawaan | ✅ `groupStatusMessage` (Group Status V2), semua tipe media |
| Generator gambar story otomatis | ❌ | ✅ `renderStoryCard()` berbasis Jimp |
| `additionalNodes` otomatis untuk semua pesan interaktif | Tergantung versi & implementasi pengguna | ✅ otomatis via `buildInteractiveAdditionalNodes` di semua jalur pengiriman relevan |
| Payment request message | Tergantung versi | ✅ `requestPaymentMessage` shorthand |
| Product message tunggal | Tergantung versi | ✅ `productMessage` shorthand |
| Album (grup foto/video) | Tergantung versi | ✅ `albumMessage` shorthand |
| Poll result snapshot | ❌ | ✅ `pollResultMessage` |
| Dokumen dengan thumbnail preview | Tergantung versi | ✅ dipatch agar konsisten menampilkan `jpegThumbnail` |

> Tabel ini merefleksikan fitur pada level API permukaan yang relevan untuk pengembangan bot sehari-hari, bukan perbandingan menyeluruh setiap detail implementasi protokol level rendah kedua library.

---

## 📖 Glosarium Istilah

| Istilah | Penjelasan |
|---|---|
| **JID** | *Jabber ID* — pengenal unik entitas WhatsApp (user, grup, channel), format `user@server`. |
| **LID** | *Linked Identity* — JID tersamar (`@lid`) yang menggantikan nomor telepon asli demi privasi, terutama di grup besar. |
| **PN** | *Phone Number* — JID berbasis nomor telepon asli (`@s.whatsapp.net`), lawan dari LID. |
| **Native Flow** | Sistem tombol/interaktif modern WhatsApp (`interactiveMessage.nativeFlowMessage`), pengganti `buttonsMessage`/`templateMessage` legacy. |
| **NF V7** | Istilah internal fork ini untuk generasi ke-7 builder Native Flow yang mencakup 13 jenis tombol (URL, call, copy, reminder, dst). |
| **Additional Nodes** | Node XML biner tambahan yang dikirim bersamaan dengan payload pesan lewat `relayMessage()`, memberi hint ke client cara merender pesan tersebut. |
| **Relay Message** | Proses inti mengenkripsi & mengirim sebuah pesan ke satu/banyak device tujuan lewat protokol Signal. |
| **App-State** | Data tersinkronisasi lintas device (kontak, chat, label, pengaturan) yang disimpan sebagai *patch* terenkripsi di server WhatsApp. |
| **Pre-Key** | Kunci kriptografi sekali pakai (Signal Protocol) yang perlu selalu tersedia agar device lain bisa memulai sesi terenkripsi baru dengan Anda. |
| **Sender Key** | Kunci untuk enkripsi pesan grup (agar tidak perlu enkripsi 1-1 ke tiap anggota). |
| **Stub Message** | Pesan sistem tanpa konten asli (`message: null`), merepresentasikan event seperti "X mengubah nama grup" — dibaca dari `messageStubType`. |
| **Ephemeral** | Pesan sekali lihat (*disappearing message*) — otomatis terhapus setelah durasi tertentu. |
| **PTT** | *Push To Talk* — voice note (pesan suara), lawan dari audio musik biasa. |
| **PTV** | *Push To Video* — video pesan bulat gaya voice note. |
| **Boom** | Kelas error dari `@hapi/boom`, membawa `output.statusCode` mirip kode status HTTP. |
| **Noise Protocol** | Protokol handshake kriptografi yang dipakai WhatsApp Web untuk membangun koneksi WebSocket aman sebelum otentikasi Signal berlangsung. |
| **USync** | Protokol WhatsApp untuk query status banyak user/device sekaligus (dipakai untuk cek siapa yang online di WhatsApp sebelum mengirim pesan). |
| **WAM** | *WhatsApp Analytics/Metrics* — encoder biner untuk data telemetri internal client (bukan untuk data pengguna). |

---

## ⚙️ Opsi Lengkap `sendMessage(jid, content, options)`

Parameter ketiga (`options`) bersifat opsional dan memengaruhi bagaimana pesan dibangun & dikirim:

| Opsi | Tipe | Keterangan |
|---|---|---|
| `quoted` | `WAMessage` | Pesan yang ingin di-reply/kutip. |
| `messageId` | `string` | Override ID pesan (default: digenerate otomatis, format `3EB0` + random hex). |
| `timestamp` | `Date` | Override waktu pesan (default: `new Date()` saat ini). |
| `ephemeralExpiration` | `number` | Durasi pesan sekali lihat dalam detik (default: `WA_DEFAULT_EPHEMERAL` jika chat sedang ephemeral). |
| `mediaCache` | objek cache | Cache upload media agar file yang sama tidak diunggah ulang (mengurangi request upload berulang). |
| `mediaUploadTimeoutMs` | `number` | Timeout khusus untuk proses upload media. |
| `backgroundColor` | `string`/`number` | Warna latar untuk teks bergaya atau audio dengan visual (lihat bagian [Teks & Link Preview](#teks--link-preview)). |
| `font` | `number` | Indeks font (0-5) untuk teks bergaya. |
| `getUrlInfo` | `function` | Override resolver link preview kustom (default memakai `link-preview-js`). |
| `getProfilePicUrl` | `function` | Dipakai saat mengirim `groupInvite` agar bisa menampilkan foto profil grup di pesan undangan. |
| `getCallLink` | `function` | Resolver untuk membuat link panggilan otomatis pada `event.call`. |
| `useCachedGroupMetadata` | `boolean` | Paksa pakai/lewati cache `cachedGroupMetadata` khusus untuk pengiriman ini. |
| `statusJidList` | `string[]` | Daftar JID penerima khusus untuk pesan status (`status@broadcast`) — hanya JID ini yang akan melihat status Anda. |
| `broadcast` | `boolean` | Tandai pesan sebagai broadcast list. |
| `additionalNodes` | `BinaryNode[]` | Node binari tambahan manual (lihat [`buildInteractiveAdditionalNodes`](#buildinteractiveadditionalnodes--kenapa-wajib-ada)) — jarang perlu diisi manual karena sudah otomatis. |
| `forceForward` | `boolean` | Paksa tandai pesan sebagai "diteruskan" walau baru pertama kali diteruskan. |
| `logger` | pino logger | Override logger khusus untuk pengiriman pesan ini saja. |

### Contoh Menggabungkan Beberapa Opsi Sekaligus

```js
await sock.sendMessage(jid, {
    text: 'Pesan penting yang akan hilang dalam 1 jam'
}, {
    quoted: msg,
    ephemeralExpiration: 3600,
    messageId: `CUSTOM-${Date.now()}`,
    logger: sock.logger.child({ feature: 'reminder' })
})
```

---

## 🚢 Deployment

Beberapa pola umum menjalankan bot Harps-MD berbasis Harps-Baileys di server produksi.

### PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start index.js --name harps-md --time
pm2 save
pm2 startup   # ikuti instruksi agar bot auto-start saat server reboot
```

Contoh `ecosystem.config.cjs` untuk konfigurasi lebih rapi:

```js
module.exports = {
    apps: [{
        name: 'harps-md',
        script: './index.js',
        watch: false,
        autorestart: true,
        max_restarts: 20,
        restart_delay: 3000,
        env: {
            NODE_ENV: 'production'
        }
    }]
}
```

```bash
pm2 start ecosystem.config.cjs
```

### Docker

```dockerfile
FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

CMD ["node", "index.js"]
```

```bash
docker build -t harps-md .
docker run -d --name harps-md -v $(pwd)/sesi_auth:/app/sesi_auth harps-md
```

> Penting: mount folder auth state (`sesi_auth`) sebagai **volume**, bukan menyimpannya di dalam layer image — jika tidak, sesi login akan hilang setiap kali container dibuat ulang.

### Auto-Restart Sederhana Tanpa PM2/Docker

```bash
while true; do
    node index.js
    echo "Bot berhenti, restart dalam 5 detik..."
    sleep 5
done
```

---

## 📝 Changelog Ringkas

Riwayat perubahan lengkap ada di [`CHANGELOG.md`](./CHANGELOG.md). Ringkasan rilis terbaru:

### v3.2.14 (2026-07-06) — Bug Fix Kritis Group Status

**Masalah:** status/story grup (`groupStatusMessage`) tidak pernah muncul sebagai ring status untuk anggota lain, walaupun `relayMessage()` berhasil tanpa error sama sekali.

**Akar masalah:**
1. `ExtendedMessageBuilder` (`dugong.js`) tidak menerima fungsi `buildInteractiveAdditionalNodes` lewat `this.utils` — fungsi tersebut tidak ikut di-passing dari `messages-send.js` saat instansiasi builder.
2. `handleGroupStory()` memanggil `relayMessage()` di ketiga mode-nya (`raw`, `message`, dan generate dari media/teks) **tanpa** `additionalNodes` sama sekali — berbeda dengan case `PRODUCT` / `INTERACTIVE` / `NESTED_LIST` / `MULTI_SELECT` yang sudah benar menyertakannya sejak awal.

**Dampak:** pesan status grup terkirim & ter-enkripsi normal (server menerima tanpa exception), tapi client penerima tidak memiliki sinyal `<meta is_vsn2="1">` yang memberitahu bahwa payload tersebut harus dirender sebagai story/status grup — sehingga hanya sesi pengirim sendiri yang bisa "melihatnya" (tampil sebagai kartu pesan biasa/forward, bukan story sungguhan).

**Perbaikan:**
- `Socket/messages-send.js`: menambahkan `buildInteractiveAdditionalNodes` ke object `utils` yang di-passing ke `new ExtendedMessageBuilder(...)`.
- `Socket/dugong.js` (`handleGroupStory`): menghitung `additionalNodes` via `this.utils.buildInteractiveAdditionalNodes(jid, wrapped)` dan menyertakannya di **setiap** pemanggilan `relayMessage()` — mode `raw`, mode `message` (WAMessage inner siap pakai), dan mode generate dari media/teks (image/video/audio/sticker/document/card/text).

Tidak ada breaking change pada bentuk input `content.groupStatusMessage` — semua mode (`text`, `image`, `video`, `audio`, `sticker`, `document`, `card`, `message`, `raw`) tetap identik seperti sebelumnya.

> Catatan dari maintainer: `is_vsn2` adalah hint yang sudah diketahui diperlukan, tapi belum divalidasi lewat capture trafik client WA resmi apakah ada atribut/node tambahan lain yang dibutuhkan untuk seluruh kombinasi media. Jika setelah update masih ada kasus story tidak muncul untuk kombinasi tertentu, dibutuhkan capture trafik pembanding lebih lanjut.

### v3.2.9 (2026-06-30) — Group Status V2, Carousel, Multi-Select, Nested List

**Fitur baru:**
- `cards` shorthand → `interactiveMessage.carouselMessage` (carousel horizontal-scroll).
- `Utils/story-card.js` (baru) — `renderStoryCard()`, generator visual story/status berbasis Jimp.
- `handleGroupStory` mode baru `card` — kirim story langsung dari `renderStoryCard()` tanpa buffer manual.
- `handleGroupStory`: dukungan semua tipe media dengan caption (`text`, `image`, `video`, `audio`, `sticker`, `document`, `message`, `raw`).
- `multiSelectMessage` — satu pesan dengan beberapa `single_select` buttons terpisah.
- `nestedListMessage` — `listMessage` dengan auto-flatten nested rows.
- Ekspor semua NF V7 builders: `nfButtonUrl`, `nfButtonCall`, `nfButtonCopy`, `nfButtonReminder`, `nfButtonCancelReminder`, `nfButtonAddress`, `nfButtonLocation`, `nfButtonQuickReply`, `nfButtonSingleSelect`, `nfButtonMultiSelect`, `nfButtonReviewPay`, `nfButtonReviewOrder`, `nfButtonMPM`.
- Ekspor `buildNestedListMessage()` sebagai helper standalone.
- `messages-send.js`: wiring case `NESTED_LIST` dan `MULTI_SELECT`.
- `buildInteractiveAdditionalNodes` menambah dukungan `groupStatusMessageV2` → inject `<meta is_vsn2="1">` di dalam grup.

Lihat file [`CHANGELOG.md`](./CHANGELOG.md) untuk detail teknis penuh dari setiap rilis, termasuk rilis-rilis sebelum v3.2.9.

---

## 🤝 Kontribusi

Repositori ini dirawat sebagai bagian dari ekosistem **Harps-MD**. Kontribusi, laporan bug, dan saran fitur dipersilakan lewat GitHub:

**https://github.com/VinzSocket/Baileys**

### Alur Kontribusi yang Disarankan

1. Fork repositori ini.
2. Buat branch baru dari `main` dengan nama deskriptif, mis. `fix/group-status-additional-nodes`.
3. Jalankan lint & test sebelum membuat PR:
   ```bash
   npm run lint
   npm test
   ```
4. Tulis pesan commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`, dst) — ini dipakai otomatis oleh `conventional-changelog` untuk menghasilkan `CHANGELOG.md`.
5. Jelaskan **akar masalah** dan **dampaknya** di deskripsi PR, bukan cuma "fix bug X" — pola ini memudahkan audit perubahan di masa depan (lihat gaya penulisan `CHANGELOG.md` yang sudah ada sebagai referensi).

### Melaporkan Bug

Sertakan informasi berikut agar mudah direproduksi:
- Versi `@vinzsocket/baileys` yang dipakai (`npm ls @vinzsocket/baileys`).
- Versi Node.js (`node -v`).
- Cuplikan kode minimal yang memicu masalah.
- Perilaku yang diharapkan vs. yang benar-benar terjadi.
- Log error lengkap (`logger` level `debug` jika memungkinkan, dengan data sensitif disensor).

### Menjalankan Build Lokal

```bash
git clone https://github.com/VinzSocket/Baileys.git
cd Baileys
npm install
npm run build        # kompilasi TypeScript ke lib/
npm run build:docs   # generate dokumentasi API (typedoc)
npm test             # unit test
```

---

## 🙏 Ucapan Terima Kasih

Harps-Baileys tidak akan ada tanpa fondasi yang dibangun komunitas open-source WhatsApp Web protocol reverse-engineering selama bertahun-tahun:

- **[WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)** — proyek induk yang menjadi basis seluruh fork ini, termasuk implementasi Signal Protocol, WABinary, dan arsitektur socket berlapis.
- **Adiwajshing** (pencipta awal Baileys) dan seluruh kontributor upstream yang telah melakukan reverse-engineering protokol WhatsApp Web Multi-Device dari nol.
- Komunitas fork Baileys lain (mis. Lily-Baileys, Whiskey, dan berbagai fork komunitas Indonesia lainnya) yang ide dan implementasinya turut menginspirasi beberapa fitur di Harps-Baileys, khususnya area mention utilities dan pola Native Flow button.
- Seluruh pengguna & tester **Harps-MD** yang laporan bug dan masukannya secara langsung membentuk arah pengembangan fitur-fitur eksklusif di fork ini (Group Status V2, Multi-Select, Nested List, Story Card Generator, dan seterusnya).

## 📚 Sumber Daya Tambahan

- Repositori GitHub: **https://github.com/VinzSocket/Baileys**
- Baileys upstream (referensi protokol dasar): **https://github.com/WhiskeySockets/Baileys**
- Dokumentasi Protocol Buffers (untuk memahami `WAProto`): **https://protobuf.dev**
- `@hapi/boom` (struktur error yang dipakai di seluruh library): **https://hapi.dev/module/boom**
- Jimp (dependency opsional untuk `renderStoryCard`): **https://github.com/jimp-dev/jimp**

Untuk pertanyaan seputar pengembangan plugin Harps-MD secara spesifik (di luar cakupan library Harps-Baileys ini), rujuk dokumentasi/README repositori Harps-MD terpisah.

---

## 📄 Lisensi

Didistribusikan di bawah **Lisensi MIT**.

```
MIT License

Copyright (c) Alvin-B2T / VinzSocket

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Dibuat & dirawat oleh Alvin (VinzSocket) untuk ekosistem Harps-MD**

Jika library ini membantu proyek Anda, pertimbangkan memberi ⭐ di [GitHub](https://github.com/VinzSocket/Baileys).

</div>
