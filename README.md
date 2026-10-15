<div align="center">

<img src="https://raw.githubusercontent.com/VinzSocket/data/refs/heads/main/1791986191951.jpg" alt="VinzSocket Baileys Banner" width="100%" />

# @vinzsocket/baileys

### Modded Baileys v7 — WebSocket Multi-Device WhatsApp API dengan Interactive Message, AI Rich Response, VoIP, Album & Newsletter

[![npm version](https://img.shields.io/npm/v/@vinzsocket/baileys?color=CB3837&logo=npm&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/@vinzsocket/baileys)
[![npm downloads](https://img.shields.io/npm/dm/@vinzsocket/baileys?color=CB3837&logo=npm&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/@vinzsocket/baileys)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org)
[![ESM](https://img.shields.io/badge/ESM-only-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)](#)

</div>

---

## 📑 Daftar Isi

1. [Tentang Proyek](#-tentang-proyek)
2. [Fitur Utama](#-fitur-utama)
3. [Perbandingan dengan Baileys Standar](#-perbandingan-dengan-baileys-standar)
4. [Instalasi](#-instalasi)
5. [Mulai Cepat](#-mulai-cepat)
6. [Autentikasi & Koneksi](#-autentikasi--koneksi)
7. [Reconnect & DisconnectReason](#-reconnect--disconnectreason)
8. [Konfigurasi `makeWASocket` Lengkap](#-konfigurasi-makewasocket-lengkap)
9. [Sistem Event](#-sistem-event)
10. [Mengirim Pesan Dasar](#-mengirim-pesan-dasar)
11. [Menerima & Memproses Pesan](#-menerima--memproses-pesan)
12. [Interactive Message Engine (Dugong)](#-interactive-message-engine-dugong)
13. [AI Rich Response Engine](#-ai-rich-response-engine)
14. [VoIP / Panggilan Suara](#-voip--panggilan-suara)
15. [Manajemen Grup](#-manajemen-grup)
16. [Manajemen Komunitas](#-manajemen-komunitas)
17. [Newsletter / Channel WhatsApp](#-newsletter--channel-whatsapp)
18. [Business & Katalog Produk](#-business--katalog-produk)
19. [Profil & Privasi](#-profil--privasi)
20. [Kontak, Label & Modifikasi Chat](#-kontak-label--modifikasi-chat)
21. [Sticker Pack Custom](#-sticker-pack-custom)
22. [USync, Status & Utilitas Lain](#-usync-status--utilitas-lain)
23. [Utilitas JID](#-utilitas-jid)
24. [Referensi API Tingkat Lanjut (Low-Level)](#-referensi-api-tingkat-lanjut-low-level)
25. [Struktur Proyek Bot yang Disarankan](#-struktur-proyek-bot-yang-disarankan)
26. [Deployment ke Produksi](#-deployment-ke-produksi)
27. [Best Practices & Tips Performa](#-best-practices--tips-performa)
28. [Struktur Folder & Modul](#-struktur-folder--modul)
29. [Contoh Lengkap: Bot Serba Guna](#-contoh-lengkap-bot-serba-guna)
30. [Troubleshooting](#-troubleshooting)
31. [FAQ](#-faq)
32. [Changelog](#-changelog)
33. [Kontribusi](#-kontribusi)
34. [Kredit](#-kredit)
35. [Lisensi & Disclaimer](#-lisensi--disclaimer)

---

## 📖 Tentang Proyek

`@vinzsocket/baileys` adalah **modded build dari Baileys v7**, library WhatsApp Web Multi-Device API yang paling banyak dipakai untuk bikin bot WhatsApp berbasis Node.js. Library ini tidak memerlukan Selenium, Puppeteer, atau browser otomatis apa pun — koneksi ke server WhatsApp dilakukan murni lewat protokol **WebSocket** (`ws`), persis seperti WhatsApp Web asli, sehingga jauh lebih ringan, cepat, dan hemat resource untuk dijalankan di VPS, panel hosting, maupun perangkat kecil sekalipun.

Dibandingkan Baileys versi stok (upstream), `@vinzsocket/baileys` menambahkan banyak modul tambahan secara native, antara lain:

- **Interactive Message Engine** — mesin internal bernama `Dugong` (dipanggil lewat `sock.ourin`) yang menangani pesan interaktif tingkat lanjut: tombol native, carousel, product, payment, album, event, poll result, hingga story grup (group status).
- **AI Rich Response Engine** — kumpulan helper untuk membuat balasan "ala AI assistant": tabel, list, code block dengan syntax highlighting, rumus LaTeX, dan link dengan citation/proof — cocok dipakai bot AI chat yang butuh format jawaban kaya.
- **VoIP Engine native** — SDK panggilan suara WhatsApp (`VoipClient`) yang berjalan di atas WASM engine, tanpa perlu membuka WhatsApp di HP.
- **Newsletter & Communities** — dukungan penuh untuk fitur Channel dan Komunitas WhatsApp.
- **Sticker Pack custom**, **status mention**, **tabel/list/code block instan**, dan berbagai utilitas pelengkap lain.

Paket ini didistribusikan sebagai **runtime terkompilasi** (folder `lib/`) beserta artefak protobuf (`WAProto/`), dan dirancang untuk dipakai langsung lewat npm maupun sebagai dependency yang di-vendor di dalam ekosistem bot seperti **Harps-MD**.

> ⚠️ **Catatan jujur soal asal-usul kode**: proyek ini adalah hasil modifikasi/rebranding dari basis kode yang sebelumnya beredar dengan nama `ourin-baileys`, yang sendiri merupakan modded build dari [`WhiskeySockets/Baileys`](https://github.com/WhiskeySockets/Baileys). Sebagian modul internal (misalnya nama class `Dugong` dan properti `sock.ourin`) masih memakai penamaan dari basis kode lama tersebut secara internal — ini **aman dan tidak memengaruhi fungsi**, tapi perlu diketahui kalau kamu menelusuri source code lebih dalam.

## ✨ Fitur Utama

| Kategori | Fitur |
|---|---|
| 🔌 **Koneksi** | WebSocket multi-device, QR code & pairing code, auto reconnect, multi-file auth state |
| 💬 **Pesan Dasar** | Teks, gambar, video, audio/voice note, dokumen, stiker, lokasi, kontak, poll, event, view-once, edit & hapus pesan |
| 🧩 **Interactive Message** | Native flow buttons, carousel card, product message, payment request, album multi-media |
| 🤖 **AI Rich Response** | Tabel, list, code block (syntax highlight), LaTeX, link dengan citation/proof, unified response |
| 📞 **VoIP** | Panggilan suara native WhatsApp lewat WASM engine, mute, auto-hangup, event ringing/connected/ended |
| 📰 **Newsletter** | Create, follow/unfollow, mute, update profil, react ke post, fetch pesan channel |
| 👥 **Communities** | Create, link/unlink grup, kelola partisipan, undangan, pengaturan komunitas |
| 👨‍👩‍👧‍👦 **Grup** | Create, update subjek/deskripsi, kelola partisipan, invite code, ephemeral, approval mode |
| 🛍️ **Business** | Katalog produk, order detail, update profil bisnis, cover photo |
| 🔐 **Privasi & Profil** | Semua pengaturan privasi WhatsApp (last seen, online, read receipt, dsb), update nama/foto profil |
| 🏷️ **Label & Chat** | Label chat/pesan, quick reply, star pesan, modifikasi chat (archive/pin/mute) |
| 🏷️ **Sticker Pack** | Generate sticker pack custom dari buffer/URL dengan publisher & cover custom |
| 🔎 **USync** | Cek status terdaftar WhatsApp (`onWhatsApp`), fetch status, fetch durasi disappearing message |
| 🔐 **Keamanan** | Signal Protocol end-to-end encryption bawaan (`libsignal`) |

## 📊 Perbandingan dengan Baileys Standar

Buat kamu yang sebelumnya pakai Baileys versi upstream (`baileys` / `@whiskeysockets/baileys`) dan mempertimbangkan pindah, berikut perbandingan singkatnya:

| Fitur | Baileys Standar | `@vinzsocket/baileys` |
|---|---|---|
| Koneksi WebSocket multi-device | ✅ | ✅ |
| Kirim pesan teks/media dasar | ✅ | ✅ |
| Native flow buttons sederhana | ✅ (manual, perlu rakit payload sendiri) | ✅ (otomatis via `interactiveButtons`) |
| Carousel card | ⚠️ Perlu rakit payload protobuf manual | ✅ Tinggal pakai `interactiveMessage.carouselMessage` |
| Album (multi-media satu bubble) | ⚠️ Manual, perlu urus `messageAssociation` sendiri | ✅ Tinggal kirim array ke `album` |
| Payment & Product message | ⚠️ Manual | ✅ Native via `requestPaymentMessage` / `productMessage` |
| Tabel, list, code block, LaTeX instan | ❌ Tidak ada | ✅ `sendTable`, `sendList`, `sendCodeBlock`, `sendLatex`, dsb. |
| VoIP / panggilan suara native | ❌ Tidak ada | ✅ `VoipClient` berbasis WASM engine |
| Group Story / status grup | ❌ Tidak ada | ✅ `groupStatusMessage` |
| Sticker pack custom helper | ❌ Tidak ada | ✅ `makeStickerPack()` |
| Newsletter/Channel API | ✅ (sejak versi lebih baru) | ✅ + helper tambahan (`cekIDSaluran`) |
| Communities API | ✅ | ✅ |
| TypeScript support | ✅ | ✅ |

> Singkatnya: kalau kamu cuma butuh fitur dasar kirim-terima pesan, Baileys standar sudah cukup. Tapi kalau butuh pesan interaktif tingkat lanjut, balasan kaya format ala AI, atau fitur panggilan suara tanpa library tambahan, `@vinzsocket/baileys` langsung menyediakannya tanpa perlu racik protobuf manual.

## 📦 Instalasi

```bash
npm install @vinzsocket/baileys
```

Atau dengan Yarn / pnpm:

```bash
yarn add @vinzsocket/baileys
# atau
pnpm add @vinzsocket/baileys
```

### Dependency wajib (sudah otomatis ter-install)

| Package | Fungsi |
|---|---|
| `ws` | Koneksi WebSocket ke server WhatsApp |
| `libsignal` | Enkripsi end-to-end (Signal Protocol) |
| `protobufjs` | Encode/decode payload protobuf WhatsApp |
| `pino` | Logger internal |
| `@hapi/boom` | Error handling bergaya HTTP status |
| `async-mutex` | Mutex untuk mencegah race condition antar event |
| `p-queue` | Antrian proses async |
| `lru-cache` / `@cacheable/node-cache` | Caching metadata grup, device, dsb |
| `music-metadata` | Baca metadata file audio (durasi voice note, dsb) |
| `fflate` | Kompresi/dekompresi data history sync |
| `whatsapp-rust-bridge` | Jembatan native untuk sebagian operasi kriptografi/WASM |

### Dependency opsional (peer dependency)

Sebagian fitur butuh modul tambahan. Install sesuai fitur yang kamu pakai — semuanya `optional`, jadi bot tetap bisa jalan tanpanya (hanya fitur terkait yang nonaktif):

```bash
npm install sharp              # resize & proses gambar (thumbnail, sticker, dsb)
npm install jimp               # alternatif sharp untuk proses gambar (pure JS, tanpa native binding)
npm install audio-decode       # decode PCM audio untuk kebutuhan VoIP
npm install @roamhq/wrtc       # WebRTC native — dibutuhkan untuk fitur VoIP
npm install link-preview-js    # auto-generate link preview di pesan teks
```

> 💡 Kalau `sharp` atau `fluent-ffmpeg` tidak terinstall, library akan mencetak warning `[vinzsocket] WARNING: Module "..." is not installed` saat start — ini **bukan error fatal**, bot tetap jalan, cuma fitur resize gambar/preview video tidak aktif.

### Requirement sistem

- **Node.js** `>= 20.0.0`
- Paket ini **ESM only** (`"type": "module"` di `package.json`) — gunakan `import`, bukan `require()`

## 🚀 Mulai Cepat

Contoh bot minimal yang konek, login via QR, dan membalas pesan masuk:

```js
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@vinzsocket/baileys'
import { Boom } from '@hapi/boom'

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
      const shouldReconnect =
        new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('Koneksi terputus, reconnect:', shouldReconnect)
      if (shouldReconnect) startBot()
    } else if (connection === 'open') {
      console.log('✅ Bot berhasil terkoneksi!')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const jid = msg.key.remoteJid
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ''

    if (text === '!ping') {
      await sock.sendMessage(jid, { text: 'Pong! 🏓' }, { quoted: msg })
    }
  })

  return sock
}

startBot()
```

## 🔐 Autentikasi & Koneksi

### Login via QR Code

Set `printQRInTerminal: true` pada config `makeWASocket`, lalu scan QR yang tampil di terminal lewat aplikasi WhatsApp di HP (Linked Devices → Link a Device).

### Login via Pairing Code

Alternatif tanpa scan QR — cocok untuk server headless:

```js
const sock = makeWASocket({ auth: state })

if (!sock.authState.creds.registered) {
  const phoneNumber = '628123456789' // nomor WhatsApp, tanpa tanda "+"
  const code = await sock.requestPairingCode(phoneNumber)
  console.log('Kode pairing:', code)
  // masukkan kode ini di HP: Linked Devices → Link with phone number
}
```

`requestPairingCode(phoneNumber, customPairingCode?)` juga menerima parameter kedua opsional kalau kamu ingin set kode custom 8 karakter sendiri.

### Menyimpan Sesi Login

```js
import { useMultiFileAuthState } from '@vinzsocket/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')
// state  -> dipakai di config makeWASocket({ auth: state })
// saveCreds -> dipanggil tiap kali event 'creds.update' terjadi
```

`useMultiFileAuthState(folder)` menyimpan seluruh kredensial & signal key store dalam banyak file kecil di dalam folder yang kamu tentukan — jauh lebih efisien dibanding single-file auth state untuk sesi yang sering update. Untuk skala produksi (multi-instance, banyak bot sekaligus), tim dev disarankan menulis auth state custom yang nyimpan ke database SQL/NoSQL.

### Siklus hidup koneksi

| Method | Keterangan |
|---|---|
| `sock.logout(msg?)` | Logout resmi dari WhatsApp (sesi dihapus dari server) |
| `sock.end(error?)` | Menutup koneksi WebSocket tanpa logout (bisa reconnect pakai sesi yang sama) |
| `sock.waitForSocketOpen()` | Menunggu sampai koneksi WebSocket benar-benar terbuka |
| `sock.waitForConnectionUpdate(check, timeoutMs?)` | Menunggu kondisi tertentu pada `connection.update` |
| `sock.onUnexpectedError(err, msg)` | Hook untuk menangani error tak terduga secara custom |

## 🔄 Reconnect & DisconnectReason

Saat koneksi WebSocket terputus, event `connection.update` membawa `lastDisconnect.error` yang bisa kamu cocokkan dengan status code di `DisconnectReason` untuk memutuskan apakah bot perlu reconnect otomatis atau berhenti total:

| `DisconnectReason` | Status Code | Penyebab umum | Tindakan yang disarankan |
|---|---|---|---|
| `connectionClosed` | 428 | Koneksi ditutup server tanpa alasan spesifik | Reconnect |
| `connectionLost` | 408 | Koneksi jaringan putus (timeout) | Reconnect |
| `connectionReplaced` | 440 | Sesi diambil alih koneksi lain dengan auth sama | Jangan reconnect — kemungkinan ada instance bot ganda berjalan |
| `timedOut` | 408 | Server tidak merespons dalam batas waktu | Reconnect |
| `loggedOut` | 401 | Device di-unlink dari HP / sesi dihapus manual | **Jangan** reconnect — hapus folder auth state & login ulang |
| `badSession` | 500 | File sesi korup/tidak valid | Hapus folder auth state & login ulang |
| `restartRequired` | 515 | WhatsApp minta restart koneksi (normal setelah pairing) | Reconnect langsung |
| `multideviceMismatch` | 411 | Versi protokol multi-device tidak cocok | Update library ke versi terbaru |
| `forbidden` | 403 | Akun/nomor diblokir atau dibatasi WhatsApp | Jangan reconnect otomatis — investigasi akun |
| `unavailableService` | 503 | Layanan WhatsApp sedang gangguan di sisi server | Reconnect dengan delay/backoff |

Contoh penanganan reconnect yang lebih lengkap (dengan exponential backoff):

```js
import { DisconnectReason } from '@vinzsocket/baileys'
import { Boom } from '@hapi/boom'

let retryCount = 0

sock.ev.on('connection.update', async (update) => {
  const { connection, lastDisconnect } = update

  if (connection === 'close') {
    const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode

    if (statusCode === DisconnectReason.loggedOut) {
      console.log('Sesi logout — hapus auth_info dan login ulang.')
      return
    }

    retryCount++
    const delay = Math.min(retryCount * 2000, 30000) // backoff maks. 30 detik
    console.log(`Reconnect dalam ${delay}ms (percobaan ke-${retryCount})`)
    setTimeout(() => startBot(), delay)
  } else if (connection === 'open') {
    retryCount = 0
  }
})
```

## ⚙️ Konfigurasi `makeWASocket` Lengkap

`makeWASocket(config)` menerima banyak opsi untuk mengatur perilaku koneksi. Berikut daftar lengkap opsi yang tersedia beserta kegunaannya:

| Opsi | Tipe | Keterangan |
|---|---|---|
| `auth` | `AuthenticationState` | **Wajib.** State autentikasi, biasanya dari `useMultiFileAuthState()` |
| `logger` | `ILogger` | Logger kustom (default: `pino`). Set level `'silent'` untuk mematikan log |
| `version` | `[number, number, number]` | Override versi WhatsApp Web yang dipakai saat handshake |
| `browser` | `[string, string, string]` | Override signature browser yang dikirim ke server, mis. `['Ubuntu', 'Chrome', '22.04.4']` |
| `connectTimeoutMs` | `number` | Batas waktu sebelum koneksi dianggap gagal |
| `defaultQueryTimeoutMs` | `number \| undefined` | Timeout default untuk semua query ke server |
| `keepAliveIntervalMs` | `number` | Interval ping-pong untuk menjaga koneksi WebSocket tetap hidup |
| `qrTimeout` | `number` | Waktu tunggu sebelum QR code baru di-generate ulang |
| `emitOwnEvents` | `boolean` | Apakah event ikut terpicu untuk aksi yang dilakukan socket ini sendiri |
| `markOnlineOnConnect` | `boolean` | Set status "online" otomatis begitu socket konek |
| `syncFullHistory` | `boolean` | Minta sinkronisasi riwayat chat penuh dari HP (async) |
| `fireInitQueries` | `boolean` | Jalankan query inisialisasi otomatis saat connect (default `true`) |
| `generateHighQualityLinkPreview` | `boolean` | Upload thumbnail kualitas tinggi untuk link preview |
| `countryCode` | `string` | Kode negara alfanumerik (mis. `'ID'`) untuk nomor yang dipakai |
| `autoFollowNewsletterOnConnect` | `boolean` | Otomatis follow channel tertentu begitu konek |
| `autoFollowNewsletterJid` / `autoFollowNewsletterDelayMs` | `string` / `number` | JID channel & delay untuk auto-follow di atas |
| `linkPreviewImageThumbnailWidth` | `number` | Lebar thumbnail untuk link preview |
| `retryRequestDelayMs` / `maxMsgRetryCount` | `number` | Jeda & batas maksimal percobaan ulang pengiriman pesan gagal |
| `enableAutoSessionRecreation` | `boolean` | Otomatis bikin ulang sesi Signal kalau pengiriman pesan gagal |
| `enableRecentMessageCache` | `boolean` | Aktifkan cache pesan terbaru untuk mempercepat proses retry |
| `shouldSyncHistoryMessage(msg)` | `function` | Kontrol pesan history mana saja yang diproses (default: semua) |
| `shouldIgnoreJid(jid)` | `function` | Abaikan event & dekripsi pesan dari JID tertentu — berguna untuk blokir spam/broadcast |
| `patchMessageBeforeSending(msg, jids?)` | `function` | Modifikasi payload pesan sebelum benar-benar dikirim ke server |
| `getMessage(key)` | `function` | Implementasikan ini untuk mengambil pesan dari store kamu sendiri (penting untuk retry) |
| `cachedGroupMetadata(jid)` | `function` | Sumber cache metadata grup kustom, mempercepat pengiriman pesan ke grup |
| `mediaCache` / `msgRetryCounterCache` / `userDevicesCache` / `callOfferCache` / `placeholderResendCache` | `CacheStore` | Cache kustom (default pakai in-memory LRU) untuk berbagai keperluan internal |
| `makeSignalRepository(...)` | `function` | Override implementasi Signal repository kustom |
| `appStateMacVerification` | `{ patch, snapshot }` | Aktif/nonaktifkan verifikasi MAC saat sinkronisasi app state |
| `customUploadHosts` | array | Daftar host upload media kustom |
| `agent` / `fetchAgent` | `Agent` | Proxy agent untuk koneksi WebSocket / HTTP fetch (upload-download media) |
| `options` | `RequestInit` | Opsi tambahan untuk fetch request |

Contoh konfigurasi yang lebih lengkap:

```js
import pino from 'pino'
import makeWASocket, { useMultiFileAuthState } from '@vinzsocket/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')

const sock = makeWASocket({
  auth: state,
  logger: pino({ level: 'silent' }),
  browser: ['VinzSocket Bot', 'Chrome', '120.0.0'],
  markOnlineOnConnect: true,
  syncFullHistory: false,
  generateHighQualityLinkPreview: true,
  shouldIgnoreJid: (jid) => jid.endsWith('@newsletter'), // abaikan event dari channel
  getMessage: async (key) => {
    // ambil dari database/store kamu sendiri untuk mendukung retry pengiriman
    return myMessageStore.get(key.id)
  },
})
```

## ⚡ Sistem Event

`sock.ev` adalah event emitter (`BaileysEventEmitter`) dengan tambahan method untuk mengatur buffering:

```js
sock.ev.on('messages.upsert', (data) => { /* pesan baru masuk */ })
sock.ev.on('messages.update', (data) => { /* pesan diedit/dihapus/reaction */ })
sock.ev.on('presence.update', (data) => { /* status online/typing berubah */ })
sock.ev.on('groups.update', (data) => { /* info grup berubah */ })
sock.ev.on('group-participants.update', (data) => { /* member masuk/keluar/promote */ })
sock.ev.on('chats.upsert', (data) => { /* chat baru */ })
sock.ev.on('contacts.update', (data) => { /* kontak berubah */ })
sock.ev.on('call', (data) => { /* ada panggilan masuk/keluar */ })
```

Method tambahan pada `sock.ev`:

| Method | Keterangan |
|---|---|
| `ev.process(handler)` | Daftarkan satu handler untuk semua event sekaligus (menerima object `events`), return fungsi unsubscribe |
| `ev.buffer()` | Mulai buffering event (berguna saat sedang sync history besar) |
| `ev.flush()` | Keluarkan semua event yang sedang di-buffer |
| `ev.isBuffering()` | Cek apakah sedang dalam mode buffer |
| `ev.createBufferedFunction(work)` | Bungkus fungsi async supaya event-nya otomatis di-buffer selama fungsi berjalan |

## 💬 Mengirim Pesan Dasar

Semua pengiriman pesan dasar lewat satu pintu: `sock.sendMessage(jid, content, options?)`.

### Teks

```js
await sock.sendMessage(jid, { text: 'Halo dari VinzSocket!' })

// dengan mention
await sock.sendMessage(jid, {
  text: 'Halo @628123456789',
  mentions: ['628123456789@s.whatsapp.net'],
})

// reply ke pesan tertentu
await sock.sendMessage(jid, { text: 'Ini balasan' }, { quoted: msg })
```

### Media (gambar, video, audio, dokumen, stiker)

```js
await sock.sendMessage(jid, { image: { url: './foto.jpg' }, caption: 'Keterangan foto' })

await sock.sendMessage(jid, { video: { url: './video.mp4' }, caption: 'Video keren', gifPlayback: false })

await sock.sendMessage(jid, { audio: { url: './suara.mp3' }, ptt: true }) // ptt: true -> voice note

await sock.sendMessage(jid, {
  document: { url: './laporan.pdf' },
  mimetype: 'application/pdf',
  fileName: 'Laporan Bulanan.pdf',
})

await sock.sendMessage(jid, { sticker: { url: './stiker.webp' } })
```

### Lokasi & Kontak

```js
await sock.sendMessage(jid, {
  location: { degreesLatitude: -6.2, degreesLongitude: 106.8 },
})

await sock.sendMessage(jid, {
  contacts: {
    displayName: 'Admin Harps',
    contacts: [{ vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Admin Harps\nTEL;type=CELL:+628123456789\nEND:VCARD' }],
  },
})
```

### Poll & Event

```js
await sock.sendMessage(jid, {
  poll: {
    name: 'Mau nongkrong kapan?',
    values: ['Sabtu', 'Minggu', 'Gak bisa dua-duanya'],
    selectableCount: 1,
  },
})

await sock.sendMessage(jid, {
  event: {
    name: 'Meetup Komunitas',
    description: 'Ketemuan bulanan member',
    startDate: new Date('2026-11-01T19:00:00+07:00'),
    location: { degreesLatitude: -6.2, degreesLongitude: 106.8, name: 'Cafe XYZ' },
  },
})
```

### View-once, Edit & Hapus Pesan

```js
// kirim sebagai view-once
await sock.sendMessage(jid, { image: { url: './rahasia.jpg' }, viewOnce: true })

// edit pesan yang sudah terkirim
await sock.sendMessage(jid, { text: 'Teks sudah diedit', edit: msg.key })

// hapus pesan (untuk semua orang)
await sock.sendMessage(jid, { delete: msg.key })
```

## 📥 Menerima & Memproses Pesan

### Struktur event `messages.upsert`

```js
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  // type: 'notify' (pesan baru real-time) | 'append' (hasil sinkronisasi history)
  for (const msg of messages) {
    if (!msg.message) continue // pesan kosong (mis. notifikasi protokol)
    console.log(JSON.stringify(msg, undefined, 2))
  }
})
```

### Mendeteksi tipe & isi pesan

```js
import { getContentType, extractMessageContent } from '@vinzsocket/baileys'

sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0]
  if (!msg.message) return

  // buka bungkus ephemeral/viewOnce/edit wrapper agar dapat konten aslinya
  const content = extractMessageContent(msg.message)
  const type = getContentType(content) // mis. 'conversation', 'imageMessage', 'buttonsResponseMessage', dst.

  switch (type) {
    case 'conversation':
    case 'extendedTextMessage': {
      const text = content.conversation || content.extendedTextMessage?.text
      console.log('Teks masuk:', text)
      break
    }
    case 'imageMessage':
      console.log('Gambar masuk, caption:', content.imageMessage.caption)
      break
    case 'buttonsResponseMessage':
      console.log('Klik tombol:', content.buttonsResponseMessage.selectedButtonId)
      break
    case 'listResponseMessage':
      console.log('Pilih list:', content.listResponseMessage.singleSelectReply?.selectedRowId)
      break
    case 'interactiveResponseMessage': {
      const params = JSON.parse(content.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)
      console.log('Native flow response:', params)
      break
    }
  }
})
```

### Download media (gambar, video, audio, dokumen, stiker)

```js
import { downloadMediaMessage } from '@vinzsocket/baileys'

sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0]
  const type = getContentType(msg.message)
  if (!['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(type)) return

  const buffer = await downloadMediaMessage(
    msg,
    'buffer', // atau 'stream'
    {},
    { logger: sock.logger, reuploadRequest: sock.updateMediaMessage },
  )

  // simpan ke file, misalnya
  // fs.writeFileSync(`./downloads/${msg.key.id}.jpg`, buffer)
})
```

### Reaction, Poll Vote & Event Response

```js
import { getAggregateVotesInPollMessage, getAggregateResponsesInEventMessage } from '@vinzsocket/baileys'

sock.ev.on('messages.update', (updates) => {
  for (const { key, update } of updates) {
    if (update.reactions) {
      console.log('Ada reaction baru di pesan', key.id, update.reactions)
    }
    if (update.pollUpdates) {
      // hitung ulang hasil polling berdasarkan seluruh vote yang masuk
      const votes = getAggregateVotesInPollMessage({ message: originalPollMsg.message, pollUpdates: update.pollUpdates })
      console.log('Hasil polling terkini:', votes)
    }
  }
})
```

### Pesan quoted / reply & forward

```js
const quotedContent = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
const quotedSender = msg.message?.extendedTextMessage?.contextInfo?.participant

import { generateForwardMessageContent } from '@vinzsocket/baileys'

const forwarded = generateForwardMessageContent(msg, false)
await sock.relayMessage(targetJid, forwarded, { messageId: sock.generateMessageTag() })
```

## 🧩 Interactive Message Engine (Dugong)

Ini adalah salah satu fitur andalan `@vinzsocket/baileys`: mesin internal bernama **`Dugong`**, diakses lewat properti `sock.ourin`, yang menangani konten pesan tingkat lanjut. Kamu **tidak perlu memanggil `sock.ourin` secara manual** — cukup kirim `content` dengan properti kunci tertentu ke `sock.sendMessage()`, dan library akan otomatis mendeteksi tipe pesannya lewat `ourin.detectType(content)`:

| Properti kunci di `content` | Tipe terdeteksi | Handler internal |
|---|---|---|
| `requestPaymentMessage` | `PAYMENT` | `handlePayment` |
| `productMessage` | `PRODUCT` | `handleProduct` |
| `interactiveButtons` | `INTERACTIVE_BUTTONS` | `handleInteractiveButtons` |
| `interactiveMessage.carouselMessage` | `CAROUSEL` | `handleCarousel` |
| `interactiveMessage` | `INTERACTIVE` | `handleInteractive` |
| `albumMessage` / `album` | `ALBUM` | `handleAlbum` |
| `eventMessage` | `EVENT` | `handleEvent` |
| `pollResultMessage` | `POLL_RESULT` | `handlePollResult` |
| `groupStatusMessage` | `GROUP_STORY` | `handleGroupStory` |

### Tombol Interaktif (Native Flow Buttons)

```js
await sock.sendMessage(jid, {
  text: 'Pilih salah satu opsi di bawah ini:',
  footer: 'VinzSocket Bot',
  interactiveButtons: [
    {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({ display_text: 'Tombol 1', id: 'btn1' }),
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({ display_text: 'Kunjungi Website', url: 'https://vinzhosting.my.id' }),
    },
  ],
})
```

### Carousel (Kartu Geser)

```js
await sock.sendMessage(jid, {
  interactiveMessage: {
    body: { text: 'Katalog produk kami:' },
    footer: { text: 'Geser untuk lihat lebih banyak' },
    carouselMessage: {
      cards: [
        {
          header: { title: 'Produk A', imageMessage: { url: './produk-a.jpg' } },
          body: { text: 'Deskripsi produk A' },
          nativeFlowMessage: {
            buttons: [{ name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Beli', url: 'https://...' }) }],
          },
        },
        {
          header: { title: 'Produk B', imageMessage: { url: './produk-b.jpg' } },
          body: { text: 'Deskripsi produk B' },
        },
      ],
    },
  },
})
```

### Album (Kirim Banyak Media Sekaligus)

```js
await sock.sendMessage(jid, {
  album: [
    { image: { url: './foto1.jpg' } },
    { image: { url: './foto2.jpg' } },
    { video: { url: './video1.mp4' } },
  ],
})
```

Album dikirim sebagai satu "parent message" (`albumMessage`), lalu setiap item media dikirim menyusul dan otomatis ditautkan ke parent-nya — di HP penerima akan tampil sebagai satu bubble galeri.

### Payment Request

```js
await sock.sendMessage(jid, {
  requestPaymentMessage: {
    currency: 'IDR',
    amount: 50000,
    note: 'Pembayaran invoice #123',
    expiry: 0,
  },
})
```

### Product Message

```js
await sock.sendMessage(jid, {
  productMessage: {
    product: {
      productId: 'SKU-001',
      title: 'Paket Hosting Pro',
      description: 'Hosting 1 tahun + domain gratis',
      currencyCode: 'IDR',
      priceAmount1000: 150000000, // dalam satuan 1/1000
      productImage: { url: './produk.jpg' },
    },
    businessOwnerJid: jid,
  },
})
```

### Poll Result (Snapshot Hasil Polling)

```js
await sock.sendMessage(jid, {
  pollResultMessage: {
    name: 'Hasil polling: Mau nongkrong kapan?',
    pollVotes: [
      { optionName: 'Sabtu', optionVoteCount: 12 },
      { optionName: 'Minggu', optionVoteCount: 7 },
    ],
  },
})
```

### Group Story (Status Grup — fitur `swgc`)

```js
await sock.sendMessage(jid, {
  groupStatusMessage: {
    text: 'Pengumuman penting buat semua member!',
  },
})
```

### Status / Story dengan Mention

```js
await sock.ourin.sendStatusWhatsApp(
  { image: { url: './story.jpg' }, text: 'Cerita hari ini' },
  ['628123456789@s.whatsapp.net', '120363000000000000@g.us'], // jids yang akan di-"mention" di story
)
```

`sendStatusWhatsApp` otomatis mengumpulkan semua anggota grup yang kamu daftarkan di `jids` (termasuk grup itu sendiri) supaya story-nya muncul di daftar "updates" mereka.

## 🤖 AI Rich Response Engine

Modul ini dipakai untuk membangun balasan kaya format ala asisten AI — tabel, list, code block dengan syntax highlighting, rumus matematika (LaTeX), sampai link dengan kutipan sumber. Cocok dipakai untuk bot AI chat, bot dokumentasi, atau bot edukasi.

### Tabel

```js
await sock.sendTable(
  jid,
  'Perbandingan Paket Hosting',
  ['Paket', 'Harga', 'Storage'],
  [
    ['Basic', 'Rp 20.000', '1 GB'],
    ['Pro', 'Rp 50.000', '5 GB'],
    ['Business', 'Rp 120.000', '20 GB'],
  ],
)
```

### List

```js
await sock.sendList(jid, 'Langkah Instalasi', [
  'Clone repository',
  'Jalankan npm install',
  ['Konfigurasi file .env', 'Isi API key dan token bot'],
  'Jalankan npm start',
])
```

### Code Block (dengan Syntax Highlighting)

```js
await sock.sendCodeBlock(jid, `function sapa(nama) {\n  return \`Halo, \${nama}!\`\n}`, null, {
  language: 'javascript',
  title: 'contoh.js',
})
```

Bahasa yang didukung untuk highlighting: JavaScript, Python, Go, Lua, dan Bash (lewat kamus kata kunci bawaan `LANGUAGE_KEYWORDS`).

### LaTeX (Rumus Matematika)

```js
await sock.sendLatex(jid, null, {
  text: 'Rumus luas lingkaran:',
  expressions: [
    { latexExpression: 'A = \\pi r^2', url: 'https://.../rendered.png', width: 200, height: 60 },
  ],
})
```

Atau biarkan library yang me-render otomatis jadi gambar PNG lewat `sendLatexImage` / `sendLatexInlineImage` (butuh fungsi `renderLatexToPng` dan `uploadFn` custom sebagai parameter, karena rendering LaTeX→PNG tidak dibundel langsung di library ini).

### Unified Response (Gabungan Teks + Tabel + Gambar dalam Satu Balasan)

```js
const submessages = [
  { type: 'TEXT', text: 'Berikut hasil analisis:' },
  { type: 'TABLE', ...tableContent },
]

const sent = await sock.sendRichMessage(jid, submessages, msg)

// tangkap ulang unified response dari pesan yang sudah ada (misal untuk forward)
const captured = sock.captureUnifiedResponse(sent.message)
if (captured) {
  await sock.sendUnifiedResponse(targetJid, null, captured)
}
```

## 📞 VoIP / Panggilan Suara

`@vinzsocket/baileys` menyertakan SDK panggilan suara native (`VoipClient`) yang berjalan di atas WASM engine WhatsApp — tanpa perlu WhatsApp terbuka di HP penerima untuk **melakukan** panggilan (penerima tetap akan menerima notifikasi panggilan masuk seperti biasa).

```js
import makeWASocket, { useMultiFileAuthState, VoipClient } from '@vinzsocket/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

const voip = new VoipClient({ resourcesPath: './voip-resources' })
await voip.connectWithSocket(sock)

const call = await voip.call('628123456789', {
  audioSource: './pesan-suara.mp3', // atau 'silence' untuk uplink kosong
  durationMs: 60000, // auto-hangup setelah 60 detik
})

call.on('ringing', () => console.log('📞 Sedang menghubungi...'))
call.on('connected', () => console.log('✅ Panggilan tersambung!'))
call.on('audio', (pcm) => {
  // pcm: Float32Array 16kHz mono dari lawan bicara
})
call.on('ended', (reason) => console.log('Panggilan berakhir:', reason))
call.on('error', (err) => console.error('Error panggilan:', err))

// kontrol panggilan
call.mute(true)   // mute mic
call.end()        // tutup paksa
await call.waitForEnd() // tunggu sampai panggilan selesai
```

### Status panggilan (`CallState`)

| State | Keterangan |
|---|---|
| `Idle` | Belum ada panggilan aktif |
| `Calling` | Sedang menghubungi |
| `PreacceptReceived` | Nada dering diterima lawan bicara |
| `ReceivedCall` | Ada panggilan masuk |
| `AcceptSent` / `AcceptReceived` | Proses terima panggilan |
| `Active` | Panggilan tersambung penuh |
| `ActiveElsewhere` | Panggilan aktif di device lain |
| `Ending` | Panggilan sedang ditutup |

### Call link (tanpa engine VoIP penuh)

Kalau cuma butuh bikin link undangan panggilan (bukan melakukan panggilan langsung):

```js
const link = await sock.createCallLink('audio') // atau 'video'
console.log('Link undangan panggilan:', link)

// tolak panggilan masuk
sock.ev.on('call', async ([callEvent]) => {
  if (callEvent.status === 'offer') {
    await sock.rejectCall(callEvent.id, callEvent.from)
  }
})
```

> ⚠️ Fitur VoIP butuh dependency opsional `@roamhq/wrtc` dan `audio-decode` ter-install. Lihat bagian [Instalasi](#-instalasi).

## 👨‍👩‍👧‍👦 Manajemen Grup

| Method | Parameter | Keterangan |
|---|---|---|
| `groupCreate(subject, participants)` | nama grup, array JID | Buat grup baru |
| `groupMetadata(jid)` | JID grup | Ambil metadata lengkap grup |
| `groupLeave(id)` | JID grup | Keluar dari grup |
| `groupUpdateSubject(jid, subject)` | JID, nama baru | Ganti nama grup |
| `groupUpdateDescription(jid, description?)` | JID, deskripsi | Ganti deskripsi grup |
| `groupParticipantsUpdate(jid, participants, action)` | JID, array JID, `'add'│'remove'│'promote'│'demote'│'modify'` | Kelola member grup |
| `groupInviteCode(jid)` | JID grup | Ambil kode invite aktif |
| `groupRevokeInvite(jid)` | JID grup | Reset/cabut kode invite |
| `groupAcceptInvite(code)` | kode invite | Gabung grup lewat kode |
| `groupRevokeInviteV4(groupJid, invitedJid)` | JID grup, JID yang diundang | Cabut undangan personal (v4 invite) |
| `groupAcceptInviteV4(key, inviteMessage)` | key pesan, pesan undangan | Terima undangan personal dari pesan |
| `groupGetInviteInfo(code)` | kode invite | Lihat info grup dari kode invite tanpa gabung |
| `groupToggleEphemeral(jid, expiration)` | JID, detik (0 = mati) | Aktifkan/matikan pesan sementara |
| `groupSettingUpdate(jid, setting)` | JID, `'announcement'│'not_announcement'│'locked'│'unlocked'` | Atur siapa yang bisa chat/edit info grup |
| `groupMemberAddMode(jid, mode)` | JID, `'admin_add'│'all_member_add'` | Atur siapa yang bisa menambah member |
| `groupJoinApprovalMode(jid, mode)` | JID, `'on'│'off'` | Aktifkan approval sebelum member bergabung |
| `groupRequestParticipantsList(jid)` | JID grup | Lihat daftar request join yang pending |
| `groupRequestParticipantsUpdate(jid, participants, action)` | JID, array JID, `'approve'│'reject'` | Setujui/tolak request join |
| `groupFetchAllParticipating()` | – | Ambil semua grup yang diikuti akun ini |

Contoh:

```js
const group = await sock.groupCreate('Grup Komunitas VinzSocket', [
  '628123456789@s.whatsapp.net',
  '628987654321@s.whatsapp.net',
])

await sock.groupParticipantsUpdate(group.id, ['628111111111@s.whatsapp.net'], 'promote')
await sock.groupSettingUpdate(group.id, 'announcement') // hanya admin yang bisa chat
```

## 👥 Manajemen Komunitas

API komunitas strukturnya identik dengan grup, cukup prefix `community` menggantikan `group`:

| Method | Keterangan |
|---|---|
| `communityCreate(subject, body)` | Buat komunitas baru |
| `communityCreateGroup(subject, participants, parentCommunityJid)` | Buat grup baru langsung di dalam komunitas |
| `communityMetadata(jid)` | Ambil metadata komunitas |
| `communityLeave(id)` | Keluar dari komunitas |
| `communityUpdateSubject(jid, subject)` | Ganti nama komunitas |
| `communityUpdateDescription(jid, description?)` | Ganti deskripsi komunitas |
| `communityLinkGroup(groupJid, parentCommunityJid)` | Tautkan grup ke komunitas |
| `communityUnlinkGroup(groupJid, parentCommunityJid)` | Lepas tautan grup dari komunitas |
| `communityFetchLinkedGroups(jid)` | Daftar grup yang tertaut ke komunitas |
| `communityParticipantsUpdate(jid, participants, action)` | Kelola member komunitas |
| `communityRequestParticipantsList(jid)` / `communityRequestParticipantsUpdate(...)` | Kelola request join komunitas |
| `communityInviteCode(jid)` / `communityRevokeInvite(jid)` / `communityAcceptInvite(code)` | Kelola kode invite komunitas |
| `communityRevokeInviteV4(...)` / `communityAcceptInviteV4(...)` | Undangan personal komunitas |
| `communityGetInviteInfo(code)` | Info komunitas dari kode invite |
| `communityToggleEphemeral(jid, expiration)` | Pesan sementara di komunitas |
| `communitySettingUpdate(jid, setting)` / `communityMemberAddMode(jid, mode)` / `communityJoinApprovalMode(jid, mode)` | Pengaturan komunitas |
| `communityFetchAllParticipating()` | Semua komunitas yang diikuti |

## 📰 Newsletter / Channel WhatsApp

| Method | Keterangan |
|---|---|
| `newsletterCreate(name, description?)` | Buat channel baru |
| `newsletterMetadata(type, key)` | Ambil metadata channel — `type`: `'invite'` atau `'jid'` |
| `newsletterUpdate(jid, updates)` | Update data channel |
| `newsletterUpdateName(jid, name)` / `newsletterUpdateDescription(jid, description)` | Ganti nama/deskripsi channel |
| `newsletterUpdatePicture(jid, content)` / `newsletterRemovePicture(jid)` | Ganti/hapus foto profil channel |
| `newsletterFollow(jid)` / `newsletterUnfollow(jid)` | Follow/unfollow channel |
| `newsletterMultipleFollow(jids)` | Follow banyak channel sekaligus |
| `newsletterMute(jid)` / `newsletterUnmute(jid)` | Mute/unmute notifikasi channel |
| `newsletterSubscribers(jid)` | Jumlah subscriber channel |
| `newsletterReactMessage(jid, serverId, reaction?)` | React ke post channel |
| `newsletterFetchMessages(jid, count, since, after)` | Ambil riwayat post channel |
| `newsletterFetchAllSubscribe()` | Daftar semua channel yang diikuti |
| `subscribeNewsletterUpdates(jid)` | Subscribe update real-time dari channel tertentu |
| `newsletterAdminCount(jid)` | Jumlah admin channel |
| `newsletterChangeOwner(jid, newOwnerJid)` | Pindahkan kepemilikan channel |
| `newsletterDemote(jid, userJid)` | Turunkan admin channel |
| `newsletterDelete(jid)` | Hapus channel |
| `newsletterAction(jid, type)` | Aksi generik channel |
| `cekIDSaluran(url)` | Ambil detail channel langsung dari link invite-nya (tanpa perlu follow dulu) |

Contoh:

```js
const channel = await sock.newsletterCreate('Update VinzSocket', 'Channel resmi info rilis & changelog')
console.log('Channel dibuat:', channel.id)

await sock.newsletterUpdatePicture(channel.id, { url: './logo-channel.jpg' })

// cek info channel dari link undangan
const info = await sock.cekIDSaluran('https://whatsapp.com/channel/xxxxxxxxxxxxx')
console.log(info.name, info.subscribers)
```

## 🛍️ Business & Katalog Produk

| Method | Keterangan |
|---|---|
| `getCatalog({ jid, limit, cursor })` | Ambil katalog produk suatu akun bisnis |
| `getCollections(jid?, limit?)` | Ambil koleksi produk |
| `productCreate(create)` | Tambah produk baru ke katalog |
| `productUpdate(productId, update)` | Edit produk |
| `productDelete(productIds)` | Hapus produk (bisa banyak sekaligus) |
| `getOrderDetails(orderId, tokenBase64)` | Detail pesanan dari pesan order |
| `getBusinessProfile(jid)` | Profil bisnis suatu akun |
| `updateBusinessProfile(args)` / `updateBussinesProfile(args)` | Update profil bisnis milik sendiri |
| `updateCoverPhoto(photo)` / `removeCoverPhoto(id)` | Kelola foto sampul katalog |

```js
const { products } = await sock.getCatalog({ jid: businessJid, limit: 20 })

const newProduct = await sock.productCreate({
  name: 'Paket VPS 2GB',
  price: 7500000, // dalam satuan 1/1000 mata uang
  currency: 'IDR',
  isHidden: false,
})
```

## 👤 Profil & Privasi

```js
await sock.updateProfileName('VinzSocket Bot')
await sock.updateProfileStatus('Online 24 jam 🚀')
await sock.updateProfilePicture(sock.user.id, { url: './avatar.jpg' })
await sock.removeProfilePicture(sock.user.id)

await sock.updateLastSeenPrivacy('contacts')       // 'all' | 'contacts' | 'contact_blacklist' | 'none'
await sock.updateOnlinePrivacy('match_last_seen')  // 'all' | 'match_last_seen'
await sock.updateProfilePicturePrivacy('all')
await sock.updateStatusPrivacy('contacts')
await sock.updateReadReceiptsPrivacy('none')       // 'all' | 'none'
await sock.updateGroupsAddPrivacy('contacts')      // 'all' | 'contacts' | 'contact_blacklist'
await sock.updateCallPrivacy('known')              // 'all' | 'known'
await sock.updateMessagesPrivacy('contacts')       // 'all' | 'contacts'
await sock.updateDisableLinkPreviewsPrivacy(false)
await sock.updateDefaultDisappearingMode(604800)   // 7 hari dalam detik

const settings = await sock.fetchPrivacySettings()
const blocked = await sock.fetchBlocklist()
await sock.updateBlockStatus(jid, 'block') // atau 'unblock'
```

## 🏷️ Kontak, Label & Modifikasi Chat

```js
// kontak
await sock.addOrEditContact(jid, { firstName: 'Budi', fullName: 'Budi Santoso' })
await sock.removeContact(jid)

// label (butuh akun WhatsApp Business)
await sock.addLabel(jid, { labelId: '1', type: 'add' })
await sock.addChatLabel(jid, '1')
await sock.removeChatLabel(jid, '1')
await sock.addMessageLabel(jid, msg.key.id, '1')
await sock.removeMessageLabel(jid, msg.key.id, '1')

// star pesan
await sock.star(jid, [{ id: msg.key.id, fromMe: true }], true)

// modifikasi chat: archive / pin / mute, dsb — lewat objek ChatModification
await sock.chatModify({ archive: true, lastMessages: [msg] }, jid)
await sock.chatModify({ pin: true }, jid)
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid) // mute 8 jam

// quick reply (Business)
await sock.addOrEditQuickReply({ shortcut: '/halo', message: 'Halo, ada yang bisa dibantu?' })
await sock.removeQuickReply(timestamp)
```

## 🏷️ Sticker Pack Custom

```js
import { makeStickerPack } from '@vinzsocket/baileys'

const pack = makeStickerPack({
  name: 'Paket Stiker VinzSocket',
  publisher: 'VinzSocket',
  stickers: [
    { sticker: { url: './stiker1.webp' }, emojis: ['😄'] },
    { sticker: { url: './stiker2.webp' }, emojis: ['🔥'] },
  ],
  cover: { url: './cover.jpg' },
})

await sock.sendMessage(jid, pack)
```

## 🔎 USync, Status & Utilitas Lain

```js
// cek apakah nomor terdaftar di WhatsApp
const result = await sock.onWhatsApp('628123456789')
console.log(result) // [{ jid: '...', exists: true }]

// cek status (bio) banyak kontak sekaligus
const statuses = await sock.fetchStatus('628123456789', '628987654321')

// cek durasi disappearing message aktif di chat tertentu
const durations = await sock.fetchDisappearingDuration('628123456789')

// ambil URL foto profil
const avatarUrl = await sock.profilePictureUrl(jid, 'image')

// kirim status presence (online/typing/recording)
await sock.sendPresenceUpdate('composing', jid)
await sock.presenceSubscribe(jid) // subscribe status online kontak tertentu

// custom USync query tingkat rendah (jarang dibutuhkan langsung)
const usyncResult = await sock.executeUSyncQuery(customQuery)
```

## 🔗 Utilitas JID

JID (*Jabber ID*) adalah format pengenal unik di WhatsApp untuk user, grup, channel, maupun bot — mirip alamat email (`628123456789@s.whatsapp.net`). Library ini menyediakan banyak helper untuk kerja dengan JID tanpa perlu regex manual:

| Fungsi | Keterangan |
|---|---|
| `jidNormalizedUser(jid)` | Normalisasi JID (hapus device id, dsb) jadi bentuk standar |
| `jidDecode(jid)` | Pecah JID jadi `{ user, server, device, agent }` |
| `jidEncode(user, server, device?, agent?)` | Kebalikan dari `jidDecode` — rakit JID dari komponennya |
| `areJidsSameUser(jid1, jid2)` | Cek apakah dua JID merujuk user yang sama (beda device dianggap sama) |
| `isJidGroup(jid)` | Cek apakah JID adalah grup (`@g.us`) |
| `isJidBroadcast(jid)` | Cek apakah JID adalah broadcast list |
| `isJidStatusBroadcast(jid)` | Cek apakah JID adalah `status@broadcast` (story/status) |
| `isJidNewsletter(jid)` | Cek apakah JID adalah channel/newsletter |
| `isJidBot(jid)` | Cek apakah JID adalah AI bot resmi WhatsApp (mis. Meta AI) |
| `isJidMetaAI(jid)` | Cek apakah JID adalah Meta AI secara spesifik |
| `isPnUser(jid)` | Cek apakah JID berformat nomor telepon biasa (`@s.whatsapp.net`) |
| `isLidUser(jid)` | Cek apakah JID berformat LID (*Linked ID*, identitas privasi baru WhatsApp) |

Konstanta JID siap pakai: `S_WHATSAPP_NET` (`@s.whatsapp.net`), `STORIES_JID` (`status@broadcast`), `SERVER_JID`, `PSA_WID`, `OFFICIAL_BIZ_JID`, `META_AI_JID`.

```js
import { isJidGroup, jidNormalizedUser, S_WHATSAPP_NET } from '@vinzsocket/baileys'

const jid = isJidGroup(remoteJid) ? remoteJid : jidNormalizedUser(remoteJid)
const myJid = `${phoneNumber}${S_WHATSAPP_NET}`
```

## 🧰 Referensi API Tingkat Lanjut (Low-Level)

Selain method-method yang sudah dibahas di atas, `sock` juga mengekspos banyak method & properti tingkat rendah yang biasanya dipakai internal oleh library sendiri — tapi tetap bisa kamu pakai langsung untuk kebutuhan khusus (membangun fitur custom, debugging, atau tooling).

### Koneksi & Query Mentah

| Method | Keterangan |
|---|---|
| `query(node, timeoutMs?)` | Kirim satu binary node mentah ke server dan tunggu balasannya |
| `sendNode(frame)` | Kirim binary node tanpa menunggu balasan |
| `sendRawMessage(data)` | Kirim data mentah (`Uint8Array`/`Buffer`) langsung ke WebSocket |
| `generateMessageTag()` | Hasilkan tag unik untuk melacak query/pesan |
| `waitForMessage(msgId, timeoutMs?)` | Tunggu balasan pesan dengan ID tertentu |
| `ws` | Instance `WebSocketClient` mentah — akses langsung ke level socket |
| `logger` | Instance logger (`pino`) yang dipakai socket secara internal |
| `user` | Info akun yang sedang login (`{ id, name, ... }`) |
| `type` | Selalu bernilai `'md'` (menandakan mode multi-device) |

### Enkripsi & Signal Protocol

| Method | Keterangan |
|---|---|
| `uploadPreKeys(count?, retryCount?)` | Upload pre-key baru ke server untuk sesi enkripsi |
| `uploadPreKeysToServerIfRequired()` | Upload pre-key otomatis kalau stoknya menipis |
| `digestKeyBundle()` | Verifikasi & proses key bundle |
| `rotateSignedPreKey()` | Rotasi signed pre-key secara manual |
| `assertSessions(jids, force?)` | Pastikan sesi Signal sudah terbentuk untuk daftar JID tertentu |
| `signalRepository` | Akses langsung ke Signal repository (key store) |
| `authState` | Akses langsung ke `{ creds, keys }` — state autentikasi mentah |

### Pesan Tingkat Rendah

| Method | Keterangan |
|---|---|
| `relayMessage(jid, message, options)` | Kirim pesan mentah ke server — fondasi dari `sendMessage()` |
| `createParticipantNodes(jids, message, extraAttrs?, dsmMessage?)` | Bangun node terenkripsi per-participant (dipakai saat kirim ke grup) |
| `upsertMessage(msg, type)` | Masukkan pesan ke pipeline event secara manual |
| `sendMessageAck(node, errorCode?)` | Kirim acknowledgement atas sebuah pesan masuk |
| `sendRetryRequest(node, forceIncludeKeys?)` | Minta pesan dikirim ulang (biasanya saat dekripsi gagal) |
| `requestPlaceholderResend(messageKey, msgData?)` | Minta resend pesan placeholder dari history sync |
| `fetchMessageHistory(count, oldestMsgKey, oldestMsgTimestamp)` | Minta tambahan sinkronisasi riwayat chat ke HP |
| `readMessages(keys)` | Tandai sejumlah pesan sebagai sudah dibaca |
| `sendReceipt(jid, participant, messageIds, type)` / `sendReceipts(keys, type)` | Kirim receipt (read/played/dst.) secara manual |
| `updateMediaMessage(message)` | Upload ulang media yang URL-nya sudah kedaluwarsa |
| `refreshMediaConn(forceGet?)` | Refresh info koneksi server upload/download media |
| `waUploadToServer` | Fungsi upload media mentah ke server WhatsApp |
| `getPrivacyTokens(jids)` | Ambil privacy token untuk daftar JID tertentu |
| `getUSyncDevices(jids, useCache, ignoreZeroDevices)` | Ambil daftar device dari sekumpulan JID |
| `updateMemberLabel(jid, memberLabel)` | Update label member tertentu (Business) |
| `sendPeerDataOperationMessage(pdoMessage)` | Kirim operasi data antar-device milik sendiri |
| `sendStatusMention(content, jids?)` | Varian pengiriman status dengan mention (mirip `ourin.sendStatusWhatsApp`) |
| `executeUSyncQuery(query)` | Jalankan query USync kustom tingkat rendah |
| `getBotListV2()` | Ambil daftar AI bot resmi yang tersedia di WhatsApp |

### App State Sync & Mutex Internal

| Method / Properti | Keterangan |
|---|---|
| `appPatch(patchCreate)` | Kirim patch app state manual (dipakai internal oleh banyak fungsi privasi/kontak di atas) |
| `resyncAppState(collections, isInitialSync)` | Paksa sinkronisasi ulang app state dari server |
| `cleanDirtyBits(type, fromTimestamp?)` | Bersihkan dirty bits sinkronisasi (`'account_sync'` atau `'groups'`) |
| `messageMutex` / `receiptMutex` / `appStatePatchMutex` / `notificationMutex` | Mutex internal pencegah race condition — bisa dipakai untuk antre proses custom lewat `.mutex(fn)` |
| `messageRetryManager` | Instance pengelola retry pesan otomatis (bisa `null`) |
| `wamBuffer` / `sendWAMBuffer(buffer)` | Buffer & pengiriman data telemetry WhatsApp Analytics Messaging |
| `sendUnifiedSession()` | Sinkronisasi sesi unified (dipakai internal saat login) |
| `updateServerTimeOffset({ attrs })` | Update offset waktu server (dipakai internal) |

> 💡 Sebagian besar method di atas **tidak perlu dipanggil manual** dalam penggunaan sehari-hari — method tingkat tinggi seperti `sendMessage()`, `groupParticipantsUpdate()`, dsb. sudah memanggilnya di belakang layar. Referensi ini ditujukan untuk kasus lanjutan: membangun fitur custom, debugging protokol, atau berkontribusi ke pengembangan library ini sendiri.

## 📁 Struktur Proyek Bot yang Disarankan

Untuk bot skala menengah ke atas (banyak command/plugin), struktur folder berikut memudahkan perawatan jangka panjang:

```
my-whatsapp-bot/
├── auth_info/              → folder sesi (useMultiFileAuthState) — JANGAN di-commit ke git
├── plugins/                 → satu file per command/fitur
│   ├── ping.js
│   ├── sticker.js
│   └── admin/
│       ├── kick.js
│       └── promote.js
├── lib/
│   ├── loadPlugins.js        → loader otomatis baca folder plugins/
│   └── database.js           → koneksi database (sesi, user, dsb)
├── config.js                 → konfigurasi bot (prefix command, owner number, dsb)
├── index.js                  → entry point (makeWASocket + event handler utama)
├── package.json
└── .gitignore                → wajib masukkan auth_info/
```

Contoh sederhana `loadPlugins.js` untuk sistem plugin dinamis:

```js
import { readdirSync } from 'fs'
import { join } from 'path'

export async function loadPlugins(sock) {
  const commands = new Map()
  const files = readdirSync('./plugins').filter((f) => f.endsWith('.js'))

  for (const file of files) {
    const { default: plugin } = await import(`../plugins/${file}`)
    commands.set(plugin.command, plugin)
  }

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
    const [cmd, ...args] = text.trim().split(/\s+/)
    const plugin = commands.get(cmd.toLowerCase())

    if (plugin) await plugin.execute(sock, msg, args)
  })

  return commands
}
```

Contoh satu file plugin (`plugins/ping.js`):

```js
export default {
  command: '!ping',
  description: 'Cek apakah bot masih hidup',
  execute: async (sock, msg) => {
    const start = Date.now()
    await sock.sendMessage(msg.key.remoteJid, { text: `Pong! ${Date.now() - start}ms` }, { quoted: msg })
  },
}
```

## 🚀 Deployment ke Produksi

### Menggunakan PM2 (disarankan untuk VPS)

```bash
npm install -g pm2

pm2 start index.js --name whatsapp-bot
pm2 save
pm2 startup   # agar bot auto-start saat server reboot
pm2 logs whatsapp-bot
```

### Menggunakan Docker

```dockerfile
FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

VOLUME ["/app/auth_info"]
CMD ["node", "index.js"]
```

```bash
docker build -t whatsapp-bot .
docker run -d --name whatsapp-bot -v $(pwd)/auth_info:/app/auth_info whatsapp-bot
```

> 💡 Selalu mount folder `auth_info/` sebagai volume persisten — kalau tidak, bot akan minta scan QR / pairing ulang setiap kali container restart.

## ✅ Best Practices & Tips Performa

- **Simpan `getMessage` dan `cachedGroupMetadata` dengan benar.** Dua config ini sangat memengaruhi kecepatan & keandalan pengiriman pesan ke grup besar — tanpanya, library harus fetch ulang metadata tiap kali kirim pesan.
- **Jangan buffering event tanpa batas.** Kalau pakai `ev.buffer()` manual, pastikan selalu dipasangkan dengan `ev.flush()`, atau pakai `ev.createBufferedFunction()` supaya otomatis.
- **Hindari spam pengiriman pesan.** Beri jeda (`await new Promise(r => setTimeout(r, 1000))`) antar pesan saat broadcast ke banyak nomor, untuk mengurangi risiko nomor dibatasi WhatsApp.
- **Gunakan `shouldIgnoreJid` untuk broadcast list/channel** yang tidak perlu diproses bot, supaya CPU tidak terbuang untuk dekripsi pesan yang tidak relevan.
- **Pisahkan sesi per nomor** dengan folder `useMultiFileAuthState` yang berbeda — jangan pernah share satu folder sesi untuk dua proses `makeWASocket` berjalan bersamaan (akan memicu `connectionReplaced`).
- **Backup folder `auth_info/` secara berkala** kalau bot menjalankan banyak fitur penting — sesi yang hilang berarti harus login ulang dari nol.
- **Matikan `printQRInTerminal` di produksi** dan render QR lewat cara lain (gambar, endpoint web) kalau servermu tidak punya akses terminal interaktif (mis. di dalam Docker/panel hosting).

## 🗂️ Struktur Folder & Modul

```
@vinzsocket/baileys/
├── WAProto/              → skema protobuf resmi WhatsApp (.proto) + hasil generate-nya
├── lib/
│   ├── Socket/           → inti koneksi WebSocket, serta semua modul fitur:
│   │                        chats, groups, communities, newsletter, business,
│   │                        messages-send, messages-recv, dugong.js (Interactive Message Engine)
│   ├── VoIP/             → engine panggilan suara native (wasm-engine, relay-transport,
│   │                        signaling, audio-feeder, worker-bootstrap)
│   ├── Modded/            → message_builder.js — builder internal untuk pesan modifikasi
│   ├── Signal/            → implementasi Signal Protocol (enkripsi end-to-end)
│   ├── WAUSync/           → protokol USync (query status/device/kontak WhatsApp)
│   ├── WABinary/          → encode/decode binary node (format wire WhatsApp)
│   ├── WAM/                → WhatsApp Analytics Messaging (telemetry internal WA)
│   ├── Utils/              → auth state, sticker pack, rich-messages (AI Rich Response),
│   │                          link preview, generic-utils, history, dan lainnya
│   ├── Types/              → seluruh TypeScript type & interface publik
│   └── Defaults/           → konfigurasi default socket, browser signature, dsb
└── package.json
```

## 🧪 Contoh Lengkap: Bot Serba Guna

Contoh berikut menggabungkan beberapa fitur dari README ini jadi satu bot utuh — autentikasi, reconnect, balas teks, kirim tabel, kirim tombol interaktif, dan download media.

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  getContentType,
  downloadMediaMessage,
} from '@vinzsocket/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const logger = pino({ level: 'silent' })

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info')

  const sock = makeWASocket({
    auth: state,
    logger,
    browser: ['VinzSocket Bot', 'Chrome', '120.0.0'],
    printQRInTerminal: true,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async () => undefined,
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) console.log('Scan QR berikut untuk login:', qr)

    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode
      if (statusCode === DisconnectReason.loggedOut) {
        console.log('❌ Sesi logout. Hapus folder auth_info dan jalankan ulang untuk login baru.')
        return
      }
      console.log('🔄 Koneksi terputus, mencoba reconnect...')
      startBot()
    } else if (connection === 'open') {
      console.log('✅ Bot VinzSocket siap digunakan!')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const jid = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid
    const content = msg.message
    const msgType = getContentType(content)

    // balas tombol yang diklik
    if (msgType === 'buttonsResponseMessage' || msgType === 'interactiveResponseMessage') {
      await sock.sendMessage(jid, { text: 'Terima kasih sudah memilih opsi tersebut!' }, { quoted: msg })
      return
    }

    const text =
      content.conversation ||
      content.extendedTextMessage?.text ||
      ''

    switch (text.trim().toLowerCase()) {
      case '!ping': {
        const start = Date.now()
        await sock.sendMessage(jid, { text: `Pong! 🏓 (${Date.now() - start}ms)` }, { quoted: msg })
        break
      }

      case '!menu': {
        await sock.sendMessage(
          jid,
          {
            text: 'Selamat datang di VinzSocket Bot 👋\nPilih menu di bawah:',
            footer: 'VinzSocket Bot',
            interactiveButtons: [
              { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📊 Lihat Harga', id: '!harga' }) },
              { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'ℹ️ Tentang Bot', id: '!about' }) },
            ],
          },
          { quoted: msg },
        )
        break
      }

      case '!harga': {
        await sock.sendTable(
          jid,
          'Daftar Harga Layanan',
          ['Paket', 'Harga'],
          [
            ['Basic', 'Rp 20.000'],
            ['Pro', 'Rp 50.000'],
            ['Business', 'Rp 120.000'],
          ],
          msg,
        )
        break
      }

      case '!about': {
        await sock.sendMessage(jid, { text: 'Bot ini dibangun dengan @vinzsocket/baileys 🚀' }, { quoted: msg })
        break
      }

      case '!sticker': {
        if (msg.message.imageMessage) {
          const buffer = await downloadMediaMessage(msg, 'buffer', {})
          await sock.sendMessage(jid, { sticker: buffer }, { quoted: msg })
        } else {
          await sock.sendMessage(jid, { text: 'Kirim gambar dengan caption !sticker ya.' }, { quoted: msg })
        }
        break
      }
    }
  })

  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    if (action === 'add') {
      for (const participant of participants) {
        await sock.sendMessage(id, { text: `Selamat datang @${participant.split('@')[0]}! 🎉`, mentions: [participant] })
      }
    }
  })

  return sock
}

startBot()
```

## 🛠️ Troubleshooting

**Muncul warning `[vinzsocket] WARNING: Module "sharp" is not installed`**
→ Normal, bukan error fatal. Install `npm install sharp` kalau butuh resize/proses gambar otomatis.

**Muncul warning `[vinzsocket] WARNING: Module "fluent-ffmpeg" is not installed`**
→ Install `npm install fluent-ffmpeg` kalau butuh generate thumbnail/preview video.

**`requestPairingCode` gagal atau kode ditolak di HP**
→ Pastikan nomor HP diformat tanpa tanda `+`, spasi, atau strip (contoh: `628123456789`, bukan `+62 812-3456-789`).

**Fitur VoIP error `Not connected. Call connectWithSocket() first.`**
→ Panggil `await voip.connectWithSocket(sock)` dan pastikan `sock` sudah dalam state `connection: 'open'` sebelum memanggil `voip.call(...)`.

**Panggilan VoIP tidak bisa dimulai / silent error**
→ Pastikan `@roamhq/wrtc` dan `audio-decode` sudah ter-install (`npm install @roamhq/wrtc audio-decode`).

**Sesi logout sendiri / `DisconnectReason.loggedOut`**
→ Biasanya karena linked device di-unlink manual dari HP, multi-device limit (maks. 4 device tertaut) terlampaui, atau folder auth state korup. Hapus folder auth state dan login ulang.

**Pesan interactive/carousel tidak muncul di sebagian device**
→ Fitur native flow/carousel butuh WhatsApp client penerima versi cukup baru; device lama bisa menampilkan fallback teks biasa.

## ❓ FAQ

**Q: Apakah paket ini resmi dari WhatsApp/Meta?**
A: Tidak. Ini adalah library pihak ketiga (reverse-engineered) berbasis Baileys. Pemakaian untuk automasi masif/spam berisiko membuat nomor WhatsApp diblokir oleh Meta.

**Q: Bisa dipakai di banyak nomor sekaligus dalam satu server?**
A: Bisa — cukup buat instance `makeWASocket` terpisah dengan folder `useMultiFileAuthState` yang berbeda untuk tiap nomor.

**Q: Apakah mendukung TypeScript?**
A: Ya, seluruh definisi tipe tersedia (`lib/index.d.ts`) dan field `types` di `package.json` sudah mengarah ke sana.

**Q: Kenapa harus pakai ESM (`import`), tidak bisa `require()`?**
A: Karena `package.json` di-set `"type": "module"`. Kalau project kamu masih CommonJS, pakai dynamic `import()` atau migrasi project ke ESM.

**Q: Apakah fitur VoIP legal/aman dipakai?**
A: Secara teknis fitur ini memanfaatkan protokol panggilan WhatsApp apa adanya (bukan eksploit), tapi tetap tunduk pada Terms of Service WhatsApp/Meta — gunakan secara wajar, bukan untuk spam call.

## 📝 Changelog

### Unreleased — Rebranding internal

- Ganti tag warning internal `[ourin-baileys]` → `[vinzsocket]` pada `lib/Modded/message_builder.js` (muncul saat modul `sharp`/`fluent-ffmpeg` belum terinstall).
- Ganti keyword `package.json`: `"ourin-md"` → `"vinzsocket-md"`.
- Ganti default `publisher` pada `makeStickerPack()`: `"Ourin AI"` → `"VinzSocket"`.

> Catatan: properti internal `sock.ourin` (instance class `Dugong`) **tidak diganti nama** karena berpotensi memutus pemanggilan dari kode bot yang sudah ada (mis. plugin yang memanggil `sock.ourin.handleGroupStory(...)`). Ini murni nama variabel internal, tidak muncul di output/error yang terlihat pengguna.

### v3.3.13

- Rilis modded build terbaru berbasis Baileys v7.

## 🤝 Kontribusi

Pull request dan issue report sangat terbuka. Sebelum berkontribusi:

1. Fork repository ini.
2. Buat branch baru untuk fitur/fix: `git checkout -b fitur/nama-fitur`.
3. Pastikan `npm run build` berjalan tanpa error sebelum membuka PR.
4. Jelaskan perubahan secara ringkas & jelas di deskripsi PR.

## 🙏 Kredit

- Basis awal: [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) — implementasi WhatsApp Web Multi-Device API open-source.
- Modul **Interactive Message Builder** (`lib/Modded`) membawa watermark lisensi dari pembuat aslinya di dalam kode dan **tidak boleh dihapus** sesuai ketentuan tertulis di sana — boleh dipakai & dimodifikasi untuk proyek pribadi maupun komersial, tapi tidak boleh dijual ulang, dilisensikan ulang, atau didistribusikan sebagai produk berdiri sendiri.
- Modul **VoIP** (`baileys-caller`) — implementasi SDK panggilan suara native.
- Dikembangkan & di-maintain di bawah nama **VinzSocket**.

## 📄 Lisensi & Disclaimer

Dilisensikan di bawah **MIT License** — lihat ketentuan tambahan pada bagian [Kredit](#-kredit) untuk modul Interactive Message Builder yang membawa syarat pakai tambahan.

**Disclaimer:** Proyek ini tidak berafiliasi, didukung, atau disponsori oleh WhatsApp Inc. maupun Meta Platforms, Inc. "WhatsApp" adalah merek dagang milik Meta Platforms, Inc. Gunakan library ini dengan bijak dan bertanggung jawab — penyalahgunaan untuk spam, penipuan, atau pelanggaran Terms of Service WhatsApp sepenuhnya menjadi tanggung jawab pengguna, bukan pengembang library ini.

---

<div align="center">

Dibuat dengan ❤️ oleh komunitas **VinzSocket**

</div>
