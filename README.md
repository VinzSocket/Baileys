# Harps-Baileys

`Harps-Baileys` adalah package JavaScript/TypeScript berbasis ESM untuk berinteraksi dengan WhatsApp Web melalui WebSocket.  
Dari isi zip ini, terlihat bahwa proyek ini adalah **hasil build/distribusi** dari library `@vinzsocket/baileys` versi `3.1.9`, bukan source mentahnya.

## Isi utama paket

Di dalam arsip ini ada beberapa bagian penting:

- `package.json` — metadata package, dependency, engine Node, dan script build.
- `engine-requirements.js` — pengecekan versi/runtime Node saat instalasi.
- `CHANGELOG.md` — riwayat perubahan versi.
- `WAProto/` — definisi protobuf WhatsApp dan file helper yang di-generate.
- `lib/` — inti library yang siap dipakai oleh aplikasi.

## Struktur folder

### `WAProto/`
Folder ini berisi komponen protobuf WhatsApp:

- `WAProto.proto` — definisi struktur data protobuf.
- `index.js` dan `index.d.ts` — entry point untuk ekspor protokol.
- `GenerateStatics.sh` — script untuk generate file statis protobuf.
- `fix-imports.js` — helper untuk merapikan import hasil generate.

### `lib/`
Ini adalah inti library yang sudah dikompilasi. Isinya didominasi file `.js`, `.d.ts`, dan `.map`.

#### `lib/Defaults/`
Berisi nilai default dan konfigurasi awal yang dipakai library.

#### `lib/Signal/`
Berisi implementasi mekanisme Signal / enkripsi, termasuk logika grup dan key management.

Subfolder penting di dalamnya:

- `Group/` — logic untuk pesan grup, sender key, dan distribusi key.
- file seperti `libsignal.d.ts` dan `lid-mapping.d.ts` — tipe dan helper terkait identitas/enkripsi.

#### `lib/Socket/`
Bagian socket adalah inti koneksi ke WhatsApp Web.

Isi yang terlihat mencakup:

- `Client/` — client layer dan tipe websocket.
- file bisnis dan socket utama untuk membangun koneksi, handle event, dan komunikasi real-time.

#### `lib/Types/`
Kumpulan type definitions untuk struktur data library, misalnya auth, chat, message, business, dan tipe internal lain.

#### `lib/Utils/`
Kumpulan helper/pemrosesan pendukung, misalnya:

- auth utils
- browser utils
- message utils
- file / media / link helper
- fungsi-fungsi kecil yang dipakai lintas modul

#### `lib/WABinary/`
Berisi encoder/decoder dan konstanta untuk format binary WhatsApp.

#### `lib/WAM/`
Berisi konstanta dan helper untuk model/protokol WhatsApp Message.

#### `lib/WAUSync/`
Berisi protokol sinkronisasi data WhatsApp, termasuk:

- contact sync
- device sync
- chat/message sync
- state synchronization

## Gambaran isi file di root package

File penting di root package:

- `lib/index.js` — entry point utama library.
- `lib/index.d.ts` — tipe TypeScript utama.
- `package.json` — informasi package dan entry point.
- `CHANGELOG.md` — catatan perubahan.
- `engine-requirements.js` — validasi lingkungan runtime.

## Cara memakai

Contoh dasar pemakaian:

```js
import makeWASocket from '@vinzsocket/baileys'

const conn = makeWASocket({
  // konfigurasi koneksi
})

console.log('Socket siap dipakai')
```

## Catatan teknis

- Package ini memakai `"type": "module"`, jadi format utamanya **ESM**.
- Entry point utama ada di `lib/index.js`.
- Target Node di `package.json` adalah `>=20.0.0`.
- Isi arsip ini lebih cocok disebut **build output** daripada source project lengkap.

## Ringkasan singkat

Kalau disederhanakan, isi zip ini adalah:

1. metadata package,
2. definisi protobuf WhatsApp,
3. modul socket utama,
4. modul enkripsi dan binary protocol,
5. tipe data dan utility pendukung,
6. hasil build siap pakai untuk library WhatsApp Web socket.

