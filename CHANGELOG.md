# 3.2.10 (2026-07-06)

### Fixes

* **dugong/handleGroupStory:** `mentions` sekarang benar-benar didukung untuk SEMUA mode
  (`text`, `image`, `card`, `gif`, `video`, `audio`, `sticker`, `document`) — sebelumnya
  `s.mentions` gak pernah dibaca sama sekali di function ini, jadi plugin yang ngirim
  `{ image, caption, mentions }` lewat `groupStatusMessage` diam-diam kehilangan tag-nya.
* **dugong/handleGroupStory:** `backgroundColor` untuk mode `audio` sekarang benar-benar
  diteruskan lewat `options` (argumen ke-2 `prepareWAMessageMedia`), bukan cuma di payload
  media — sebelumnya `backgroundArgb` gak pernah kehitung buat audio status.

### Features

* **dugong/handleGroupStory:** shorthand `gif` — `{ gif: Buffer | { url }, caption? }`,
  dikirim sebagai video looping (`gifPlayback: true`). Lengkapi daftar media yang
  didukung: `text, image, video, gif, audio, sticker, document, card, message, raw`.

# 3.2.9 (2026-07-06)

### Fixes

* **dugong/handleGroupStory:** perbaiki bug **status grup tidak pernah muncul (ring/story tidak tampil) untuk member lain**, walaupun `relayMessage()` sukses tanpa error.
  - **Akar masalah:** `buildInteractiveAdditionalNodes()` di `Utils/messages.js` sudah punya cabang logic sejak 3.2.9 untuk inject node `<meta is_vsn2="1">` khusus payload `groupStatusMessageV2` di dalam grup — tapi node itu **tidak pernah benar-benar dipakai**, karena:
    1. `ExtendedMessageBuilder` (dugong.js) tidak menerima `buildInteractiveAdditionalNodes` lewat `this.utils` sama sekali (tidak di-passing dari `messages-send.js` saat instansiasi).
    2. `handleGroupStory()` memanggil `this.relayMessage(jid, wrapped, { messageId })` di ketiga mode-nya (`raw`, `message`, dan generate media/teks) **tanpa `additionalNodes`** — beda dengan case `PRODUCT` / `INTERACTIVE` / `NESTED_LIST` / `MULTI_SELECT` di `messages-send.js` yang semuanya sudah benar menyertakan `additionalNodes: buildInteractiveAdditionalNodes(...)`.
  - **Dampak sebelum fix:** pesan status grup terkirim & ter-enkripsi normal (server menerima, tidak ada exception), tapi klien penerima tidak punya sinyal bahwa payload tersebut harus dirender sebagai story/status grup — sehingga tidak pernah muncul sebagai ring status untuk member lain. Hanya sesi pengirim sendiri yang bisa "melihat" (muncul sebagai kartu pesan biasa/forward, bukan story).
  - **Perbaikan:**
    - `Socket/messages-send.js`: tambahkan `buildInteractiveAdditionalNodes` ke object `utils` yang di-passing ke `new ExtendedMessageBuilder(...)`.
    - `Socket/dugong.js` (`handleGroupStory`): hitung `additionalNodes = this.utils.buildInteractiveAdditionalNodes(jid, wrapped)` dan sertakan di **setiap** pemanggilan `relayMessage()` — mode `raw`, mode `message` (inner WAMessage siap pakai), dan mode generate dari media/teks (image/video/audio/sticker/document/card/text).
  - **Tidak ada breaking change** pada bentuk input `content.groupStatusMessage` — semua mode (`text`, `image`, `video`, `audio`, `sticker`, `document`, `card`, `message`, `raw`) tetap sama persis seperti sebelumnya.
  - Catatan: `is_vsn2` adalah hint yang sudah diketahui diperlukan; belum divalidasi lewat capture trafik WA client asli apakah ada attribute/node tambahan lain yang dibutuhkan untuk seluruh kombinasi media. Kalau setelah update masih ada kasus story tidak muncul untuk kombinasi tertentu, perlu capture trafik pembanding lebih lanjut.

---

# 3.2.8 (2026-06-30)

### Features

* **messages.js:** `cards` shorthand → `interactiveMessage.carouselMessage` (horizontal-scroll card carousel)
  - tiap card: `{ image | video, title?, body?/text?, footer?, buttons? }`
  - `buttons` per card pakai shape yang sama dengan top-level `buttons` shorthand (native flow)
  - default `carouselCardType: HSCROLL_CARDS`, `messageVersion: 1`
* **messages.js:** `buildInteractiveAdditionalNodes` kasih hint `native_flow name="carousel"` khusus saat payload berisi `carouselMessage`
* **Utils/story-card.js (baru):** `renderStoryCard()` — generator visual story/status berbasis Jimp (lazy-loaded, tanpa dependency native)
  - gradient preset: `sunset`, `purple`, `ocean`, `forest`, `midnight`, `fire` (atau custom `colors: [from, to]`)
  - arah gradient `vertical` / `diagonal`, ukuran default 1080x1920 (rasio status WA)
  - render `title` (besar), `body` (subtitle), `footer` (branding kecil di bawah)
  - return `Buffer` PNG siap dipakai sebagai `{ image: buffer }`
* **dugong/handleGroupStory:** mode baru `card` — kirim story langsung dari `renderStoryCard()` tanpa generate buffer manual: `{ card: { title, body, footer, gradient }, caption? }`



### Features

* **dugong/handleGroupStory:** support semua media type dengan caption
  - `text` + `backgroundColor` + `textArgb` + `font`
  - `image` + `caption`
  - `video` + `caption` + `gifPlayback` + `seconds`
  - `audio` (voice note `ptt:true` atau musik `ptt:false`) + `mimetype` + `seconds`
  - `sticker`
  - `document` + `caption` + `mimetype` + `fileName`
  - `message` (pre-built WAMessage inner)
  - `raw` (raw relay / forward story)
* **dugong:** `multiSelectMessage` — satu pesan dengan beberapa `single_select` buttons terpisah
* **dugong:** `nestedListMessage` — `listMessage` dengan auto-flatten nested rows
* **dugong:** export semua NF V7 builders: `nfButtonUrl`, `nfButtonCall`, `nfButtonCopy`, `nfButtonReminder`, `nfButtonCancelReminder`, `nfButtonAddress`, `nfButtonLocation`, `nfButtonQuickReply`, `nfButtonSingleSelect`, `nfButtonMultiSelect`, `nfButtonReviewPay`, `nfButtonReviewOrder`, `nfButtonMPM`
* **dugong:** export `buildNestedListMessage()` helper standalone
* **messages-send:** wire `NESTED_LIST` dan `MULTI_SELECT` case
* **messages.js:** `buildInteractiveAdditionalNodes` tambah `groupStatusMessageV2` → inject `<meta is_vsn2="1">` di grup

---
