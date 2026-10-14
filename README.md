<div align="center">

<img src="https://raw.githubusercontent.com/VinzSocket/data/refs/heads/main/1791986191951.jpg" alt="VinzSocket Baileys Banner" width="100%" />

# @vinzsocket/baileys

**Modded Baileys v7** — Library WhatsApp Multi-Device berbasis WebSocket dengan dukungan VoIP, Interactive Message, Album, dan Newsletter.

![version](https://img.shields.io/badge/version-3.3.13-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![type](https://img.shields.io/badge/module-ESM-yellow)

</div>

---

## 📖 Tentang

`@vinzsocket/baileys` adalah fork modifikasi dari Baileys v7 (library WhatsApp Web Multi-Device API). Tidak pakai Selenium atau browser otomatis — koneksi ke WhatsApp dilakukan langsung lewat protokol **WebSocket**, sehingga ringan dan cepat untuk dijalankan di server maupun panel hosting.

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🔌 **Koneksi WebSocket Multi-Device** | Konek langsung ke WhatsApp Web lewat `ws`, real-time, tanpa browser |
| 📞 **VoIP / Panggilan Suara** | Modul VoIP native (`wasm-engine`, `relay-transport`, `signaling`, `audio-feeder`) untuk inisiasi & terima voice call |
| 💬 **Interactive Message Builder** | Tombol, carousel, native flow, card/list dengan fluent chaining (modul Modded) |
| 🖼️ **Album** | Kirim banyak foto/video sekaligus dalam satu bubble pesan |
| 📰 **Newsletter / Channel** | Create, follow/unfollow, update, hapus channel, react ke post channel |
| 👥 **Communities** | Buat & kelola komunitas, link/unlink grup ke komunitas |
| 🛍️ **Business & Produk** | Pesan katalog, produk, dan pembayaran (payment message) |
| 🏷️ **Sticker Pack Custom** | Generate sticker pack dari buffer/URL dengan publisher & cover custom |
| 🔐 **Signal Protocol (E2E Encryption)** | Enkripsi end-to-end bawaan via `libsignal` |
| 🔄 **Multi-File Auth State** | Penyimpanan sesi otomatis per file, tinggal pakai ulang |
| 🔗 **Link Preview** | Auto-generate preview link di pesan teks |
| 👤 **USync (WAUSync)** | Query status/kontak user secara efisien lewat protokol sync WhatsApp |

## 📦 Instalasi

```bash
npm install @vinzsocket/baileys
```

### Dependency opsional (peer dependency)

Beberapa fitur butuh modul tambahan, install sesuai kebutuhan:

```bash
npm install sharp            # resize & proses gambar
npm install jimp             # alternatif proses gambar
npm install audio-decode     # decode audio untuk VoIP
npm install @roamhq/wrtc     # WebRTC untuk fitur VoIP
npm install link-preview-js  # link preview otomatis
```

## 🚀 Mulai Cepat

```js
import makeWASocket, { useMultiFileAuthState } from '@vinzsocket/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')

const sock = makeWASocket({
  auth: state,
  printQRInTerminal: true,
})

sock.ev.on('creds.update', saveCreds)

sock.ev.on('connection.update', (update) => {
  console.log(update)
})

sock.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0]
  if (!msg.message) return
  console.log('Pesan masuk:', msg)
})
```

## 🗂️ Struktur Modul

```
lib/
├── Socket/      → inti koneksi, groups, business, newsletter, communities
├── VoIP/        → engine panggilan suara (wasm, relay, signaling)
├── Modded/      → interactive message builder (tombol, carousel, album, dll)
├── Signal/      → enkripsi end-to-end (libsignal)
├── WAUSync/     → protokol sinkronisasi user
├── WABinary/    → encode/decode binary node WhatsApp
├── WAM/         → WhatsApp Analytics Messaging
├── Utils/       → auth state, sticker pack, link preview, dll
└── Types/       → TypeScript type definitions
```

## ✅ Requirement

- Node.js `>= 20.0.0`

## 🙏 Kredit

Library ini merupakan modifikasi dari Baileys. Modul Interactive Message Builder (`lib/Modded`) memuat watermark lisensi dari pembuat aslinya dan tidak boleh dihapus sesuai ketentuan yang tertulis di dalam kode — boleh dipakai/dimodifikasi untuk proyek pribadi maupun komersial, tapi tidak boleh dijual ulang, dilisensikan ulang, atau didistribusikan sebagai produk berdiri sendiri.

## 📄 Lisensi

MIT — lihat ketentuan tambahan pada bagian Kredit di atas untuk modul Interactive Message Builder.
