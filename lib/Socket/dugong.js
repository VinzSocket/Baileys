// dugong.js — Harps-Baileys extended message builders v3.2.10
// Handles: Payment, Product, Interactive (NF V7 full), Album, Event,
// Poll Result, Group Status V2, Nested Legacy List, Multi-Select.

import { randomBytes } from 'crypto';
import { proto } from '../../WAProto/index.js';
import { normalizeMentions } from '../Utils/mention.js';

// ─── NF V7 Button Builders ────────────────────────────────────────────────────

export const nfButtonUrl = ({ id, displayText, url, merchantUrl }) => ({
    name: 'cta_url',
    buttonParamsJson: JSON.stringify({ display_text: displayText, url, merchant_url: merchantUrl || url }),
    ...(id ? { id } : {})
});
export const nfButtonCall = ({ id, displayText, phoneNumber }) => ({
    name: 'cta_call',
    buttonParamsJson: JSON.stringify({ display_text: displayText, phone_number: phoneNumber }),
    ...(id ? { id } : {})
});
export const nfButtonCopy = ({ id, displayText, copyCode }) => ({
    name: 'cta_copy',
    buttonParamsJson: JSON.stringify({ display_text: displayText, copy_code: copyCode }),
    ...(id ? { id } : {})
});
export const nfButtonReminder = ({ id, displayText, title, notes, startTime, endTime, timezone = 'Asia/Jakarta' }) => ({
    name: 'cta_reminder',
    buttonParamsJson: JSON.stringify({ display_text: displayText, title, notes, start_timestamp: startTime, end_timestamp: endTime, timezone }),
    ...(id ? { id } : {})
});
export const nfButtonCancelReminder = ({ id, displayText, reminderKey }) => ({
    name: 'cta_cancel_reminder',
    buttonParamsJson: JSON.stringify({ display_text: displayText, reminder_key: reminderKey }),
    ...(id ? { id } : {})
});
export const nfButtonAddress = ({ id, displayText, label = '' }) => ({
    name: 'address_message',
    buttonParamsJson: JSON.stringify({ display_text: displayText, label }),
    ...(id ? { id } : {})
});
export const nfButtonLocation = ({ id, displayText }) => ({
    name: 'send_location',
    buttonParamsJson: JSON.stringify({ display_text: displayText }),
    ...(id ? { id } : {})
});
export const nfButtonQuickReply = ({ id, displayText, payload }) => ({
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({ display_text: displayText, id: id || payload || displayText }),
    ...(id ? { id } : {})
});

/**
 * Single-select dropdown.
 * sections: [{ title, highlight_label?, rows: [{id, title, description?}] }]
 */
export const nfButtonSingleSelect = ({ id, displayText, sections = [] }) => ({
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
        title: displayText,
        sections: sections.map(sec => ({
            title: sec.title || '',
            highlight_label: sec.highlight_label || '',
            rows: (sec.rows || []).map(r => ({
                id: r.id || r.rowId || '',
                title: r.title || '',
                ...(r.description ? { description: r.description } : {})
            }))
        }))
    }),
    ...(id ? { id } : {})
});

/**
 * Multi-select: beberapa single_select buttons sekaligus dalam 1 pesan.
 * selectors: [{ id?, displayText, sections }]
 * Returns: array of buttons
 */
export const nfButtonMultiSelect = (selectors = []) =>
    selectors.map((sel, i) => nfButtonSingleSelect({
        id: sel.id || `select_${i}`,
        displayText: sel.displayText,
        sections: sel.sections
    }));

export const nfButtonReviewPay = ({ id, currency = 'IDR', totalAmount1000, subtotal, tax, items = [], merchant = {} }) => ({
    name: 'review_and_pay',
    buttonParamsJson: JSON.stringify({ currency, total_amount: { value: totalAmount1000, offset: 1000 }, subtotal, tax, items, order: { status: 'pending', items }, merchant }),
    ...(id ? { id } : {})
});
export const nfButtonReviewOrder = ({ id, referenceId, type = 'ORDER', orderId }) => ({
    name: 'review_order',
    buttonParamsJson: JSON.stringify({ reference_id: referenceId, type, order_id: orderId }),
    ...(id ? { id } : {})
});
export const nfButtonMPM = ({ id, sections = [] }) => ({
    name: 'mpm',
    buttonParamsJson: JSON.stringify({
        sections: sections.map(sec => ({
            title: sec.title || '',
            product_items: (sec.productItems || []).map(p => ({ product_id: p.productId || p.product_id }))
        }))
    }),
    ...(id ? { id } : {})
});

// ─── Nested Legacy List Helper ────────────────────────────────────────────────

/**
 * Build proto listMessage payload.
 * Row yang punya field `rows` sendiri otomatis di-flatten jadi section baru.
 */
export const buildNestedListMessage = ({ title, buttonText, footer = '', sections = [] }) => {
    const flat = [];
    for (const sec of sections) {
        const topRows = [], childSecs = [];
        for (const row of (sec.rows || [])) {
            if (Array.isArray(row.rows) && row.rows.length > 0) {
                childSecs.push({
                    title: row.title || '',
                    rows: row.rows.map(r => ({ rowId: r.rowId || r.id || '', title: r.title || '', description: r.description || '' }))
                });
            } else {
                topRows.push({ rowId: row.rowId || row.id || '', title: row.title || '', description: row.description || '' });
            }
        }
        if (topRows.length) flat.push({ title: sec.title || '', rows: topRows });
        for (const cs of childSecs) flat.push(cs);
    }
    return { listMessage: { title, description: footer, buttonText, listType: 1, sections: flat } };
};

// ─── ExtendedMessageBuilder ───────────────────────────────────────────────────

export class ExtendedMessageBuilder {
    constructor(utils, waUploadToServer, relayMessageFn) {
        this.utils = utils;
        this.relayMessage = relayMessageFn;
        this.waUploadToServer = waUploadToServer;
        this.bail = {
            generateWAMessageContent: this.utils.generateWAMessageContent,
            generateMessageID: this.utils.generateMessageID,
            getContentType: (msg) => Object.keys(msg.message || {})[0]
        };
    }

    detectType(content) {
        if (content.requestPaymentMessage) return 'PAYMENT';
        if (content.productMessage)        return 'PRODUCT';
        if (content.interactiveMessage)    return 'INTERACTIVE';
        if (content.albumMessage)          return 'ALBUM';
        if (content.eventMessage)          return 'EVENT';
        if (content.pollResultMessage)     return 'POLL_RESULT';
        if (content.groupStatusMessage)    return 'GROUP_STORY';
        if (content.nestedListMessage)     return 'NESTED_LIST';
        if (content.multiSelectMessage)    return 'MULTI_SELECT';
        return null;
    }

    async handlePayment(content, quoted) {
        const data = content.requestPaymentMessage;
        let notes = {};
        if (data.sticker?.stickerMessage) {
            notes = { stickerMessage: { ...data.sticker.stickerMessage, contextInfo: { stanzaId: quoted?.key?.id, participant: quoted?.key?.participant || content.sender, quotedMessage: quoted?.message } } };
        } else if (data.note) {
            notes = { extendedTextMessage: { text: data.note, contextInfo: { stanzaId: quoted?.key?.id, participant: quoted?.key?.participant || content.sender, quotedMessage: quoted?.message } } };
        }
        return {
            requestPaymentMessage: proto.Message.RequestPaymentMessage.fromObject({
                expiryTimestamp: data.expiry || 0, amount1000: data.amount || 0,
                currencyCodeIso4217: data.currency || 'IDR', requestFrom: data.from || '0@s.whatsapp.net',
                noteMessage: notes, background: data.background ?? { id: 'DEFAULT', placeholderArgb: 0xFFF0F0F0 }
            })
        };
    }

    async handleProduct(content, jid, quoted) {
        const { title, description, thumbnail, productId, retailerId, url, body = '', footer = '', buttons = [], priceAmount1000 = null, currencyCode = 'IDR' } = content.productMessage;
        let productImage;
        if (Buffer.isBuffer(thumbnail)) {
            const { imageMessage } = await this.utils.generateWAMessageContent({ image: thumbnail }, { upload: this.waUploadToServer });
            productImage = imageMessage;
        } else if (thumbnail?.url) {
            const { imageMessage } = await this.utils.generateWAMessageContent({ image: { url: thumbnail.url } }, { upload: this.waUploadToServer });
            productImage = imageMessage;
        }
        return { viewOnceMessage: { message: { interactiveMessage: { body: { text: body }, footer: { text: footer }, header: { title, hasMediaAttachment: true, productMessage: { product: { productImage, productId, title, description, currencyCode, priceAmount1000, retailerId, url, productImageCount: 1 }, businessOwnerJid: '0@s.whatsapp.net' } }, nativeFlowMessage: { buttons } } } } };
    }

    async handleInteractive(content, jid, quoted, options = {}) {
        const { title, footer, thumbnail, image, video, document, mimetype, fileName, jpegThumbnail, contextInfo = {}, externalAdReply, buttons = [], nativeFlowMessage, header } = content.interactiveMessage;
        let media = null;
        if (thumbnail || image) {
            const src = thumbnail || image;
            media = await this.utils.prepareWAMessageMedia({ image: src?.url ? { url: src.url } : src }, { upload: this.waUploadToServer });
        } else if (video) {
            media = await this.utils.prepareWAMessageMedia({ video: video?.url ? { url: video.url } : video }, { upload: this.waUploadToServer });
        } else if (document) {
            let dp = { document };
            if (jpegThumbnail) dp.jpegThumbnail = jpegThumbnail?.url ? { url: jpegThumbnail.url } : jpegThumbnail;
            media = await this.utils.prepareWAMessageMedia(dp, { upload: this.waUploadToServer });
            if (fileName && media.documentMessage) media.documentMessage.fileName = fileName;
            if (mimetype && media.documentMessage) media.documentMessage.mimetype = mimetype;
        }
        let im = { body: { text: title || '' }, footer: { text: footer || '' } };
        if (buttons?.length) { im.nativeFlowMessage = { buttons }; if (nativeFlowMessage) im.nativeFlowMessage = { ...im.nativeFlowMessage, ...nativeFlowMessage }; }
        else if (nativeFlowMessage) im.nativeFlowMessage = nativeFlowMessage;
        im.header = media ? { title: header || '', hasMediaAttachment: true, ...media } : { title: header || '', hasMediaAttachment: false };
        let ci = { forwardingScore: contextInfo.forwardingScore || 0, isForwarded: contextInfo.isForwarded || false, ...contextInfo, mentionedJid: normalizeMentions(contextInfo.mentionedJid || options.mentions || []) };
        if (externalAdReply) ci.externalAdReply = { title: '', body: '', mediaType: 1, thumbnailUrl: '', mediaUrl: '', sourceUrl: '', showAdAttribution: false, renderLargerThumbnail: false, ...externalAdReply };
        if (!Array.isArray(ci.mentionedJid)) ci.mentionedJid = [ci.mentionedJid].filter(Boolean);
        if (Object.keys(ci).length) im.contextInfo = ci;
        return { interactiveMessage: im };
    }

    /**
     * Multi-Select — 1 pesan dengan BEBERAPA tombol single_select.
     * Tiap selector = 1 tombol dropdown terpisah, buka bottom sheet sendiri.
     *
     * Gunakan dari plugin:
     *   conn.sendMessage(jid, {
     *     multiSelectMessage: {
     *       title: 'Judul',
     *       footer: 'Footer',
     *       selectors: [
     *         { displayText: '⚔️ Senjata', sections: [{ title: 'Melee', rows: [{ id:'sword', title:'Pedang' }] }] },
     *         { displayText: '🛡️ Armor',   sections: [{ title: 'Light', rows: [{ id:'cloth', title:'Cloth' }] }] },
     *       ]
     *     }
     *   })
     */
    async handleMultiSelect(content, jid, quoted, options = {}) {
        const { title, footer, image, video, thumbnail, selectors = [], extraButtons = [], contextInfo = {}, header } = content.multiSelectMessage;
        const buttons = [...nfButtonMultiSelect(selectors), ...extraButtons];
        return this.handleInteractive({ interactiveMessage: { title, footer, image, video, thumbnail, header, contextInfo, buttons } }, jid, quoted, options);
    }

    /**
     * Nested List — legacy listMessage.
     * Row yang punya `.rows` otomatis di-flatten jadi section baru.
     *
     * conn.sendMessage(jid, {
     *   nestedListMessage: {
     *     title: 'Menu',
     *     buttonText: 'Buka',
     *     footer: '...',
     *     sections: [
     *       { title: 'Kategori A', rows: [
     *           { rowId: 'a1', title: 'Item A1' },
     *           { title: 'Sub-Kategori', rows: [   ← ini jadi section baru
     *               { rowId: 'b1', title: 'Item B1' },
     *           ]}
     *       ]}
     *     ]
     *   }
     * })
     */
    async handleNestedList(content, jid, quoted) {
        const payload = buildNestedListMessage(content.nestedListMessage);
        return await this.utils.generateWAMessageFromContent(jid, {
            viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, ...payload } }
        }, { quoted });
    }

    async handleAlbum(content, jid, quoted) {
        const array = content.albumMessage;
        const album = await this.utils.generateWAMessageFromContent(jid, {
            messageContextInfo: { messageSecret: randomBytes(32) },
            albumMessage: {
                expectedImageCount: array.filter(a => Object.hasOwn(a, 'image')).length,
                expectedVideoCount: array.filter(a => Object.hasOwn(a, 'video')).length
            }
        }, { userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net', quoted, upload: this.waUploadToServer });
        await this.relayMessage(jid, album.message, { messageId: album.key.id });
        for (const item of array) {
            const img = await this.utils.generateWAMessage(jid, item, { upload: this.waUploadToServer });
            img.message.messageContextInfo = { messageSecret: randomBytes(32), messageAssociation: { associationType: 1, parentMessageKey: album.key }, participant: jid, forwardingScore: 0, isForwarded: false };
            await this.relayMessage(jid, img.message, { messageId: img.key.id, quoted: { key: { remoteJid: album.key.remoteJid, id: album.key.id, fromMe: true, participant: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net' }, message: album.message } });
        }
        return album;
    }

    async handleEvent(content, jid, quoted) {
        const e = content.eventMessage;
        const msg = await this.utils.generateWAMessageFromContent(jid, {
            viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2, messageSecret: randomBytes(32), supportPayload: JSON.stringify({ version: 2, is_ai_message: true, should_show_system_message: true, ticket_id: randomBytes(16).toString('hex') }) }, eventMessage: { contextInfo: { mentionedJid: [jid], participant: jid, remoteJid: 'status@broadcast' }, isCanceled: e.isCanceled || false, name: e.name, description: e.description, location: e.location || { degreesLatitude: 0, degreesLongitude: 0, name: 'Location' }, joinLink: e.joinLink || '', startTime: typeof e.startTime === 'string' ? parseInt(e.startTime, 10) : e.startTime || Date.now(), endTime: typeof e.endTime === 'string' ? parseInt(e.endTime, 10) : e.endTime || Date.now() + 3600000, extraGuestsAllowed: e.extraGuestsAllowed !== false } } }
        }, { quoted });
        await this.relayMessage(jid, msg.message, { messageId: msg.key.id });
        return msg;
    }

    async handlePollResult(content, jid, quoted) {
        const p = content.pollResultMessage;
        const msg = await this.utils.generateWAMessageFromContent(jid, {
            pollResultSnapshotMessage: { name: p.name, pollVotes: p.pollVotes.map(v => ({ optionName: v.optionName, optionVoteCount: typeof v.optionVoteCount === 'number' ? v.optionVoteCount.toString() : v.optionVoteCount })) }
        }, { userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net', quoted });
        await this.relayMessage(jid, msg.message, { messageId: msg.key.id });
        return msg;
    }

    /**
     * Group Status V2 — kirim story/status ke grup.
     *
     * Format groupStatusMessage:
     *
     * // Teks biasa
     * { text: 'Halo grup!' }
     *
     * // Foto dengan caption
     * { image: Buffer | { url: '...' }, caption: 'Caption foto' }
     *
     * // Video dengan caption
     * { video: Buffer | { url: '...' }, caption: 'Caption video', gifPlayback?: true }
     *
     * // Audio (voice note)
     * { audio: Buffer | { url: '...' }, ptt: true, seconds: 10 }
     *
     * // Audio biasa (musik)
     * { audio: Buffer | { url: '...' }, ptt: false, mimetype: 'audio/mp4' }
     *
     * // Sticker
     * { sticker: Buffer | { url: '...' } }
     *
     * // Dokumen
     * { document: Buffer | { url: '...' }, mimetype: 'application/pdf', fileName: 'file.pdf', caption: 'Caption' }
     *
     * // Pre-built WAMessage (advanced)
     * { message: { imageMessage: { ... } } }
     *
     * // Raw relay (forward story)
     * { raw: <msgPayload> }
     *
     * Semua mode support field tambahan:
     *   backgroundColor?: number  (ARGB hex, untuk teks/audio)
     *   textArgb?: number
     *   font?: number (0-5)
     */
    /**
     * Group Status V2 — kirim story/status ke grup.
     * messageSecret wajib ada supaya WA client bisa decrypt & tampilkan konten.
     *
     * PATCH (v3.2.10): sekarang menyertakan `additionalNodes` via
     * buildInteractiveAdditionalNodes() di SETIAP relayMessage() call. Tanpa ini,
     * node <meta is_vsn2="1"/> (yang sudah punya cabang logic-nya sendiri di
     * Utils/messages.js buildInteractiveAdditionalNodes) tidak pernah benar-benar
     * terkirim ke server, sehingga klien penerima tidak tahu payload ini harus
     * dirender sebagai story/status grup — pesan tetap terkirim & ter-enkripsi
     * normal, tapi tidak pernah muncul sebagai ring status untuk member lain.
     */
    async handleGroupStory(content, jid) {
        const s = content.groupStatusMessage;
        const secret = randomBytes(32);
        const buildNodes = this.utils.buildInteractiveAdditionalNodes;

        // Mode 1: raw relay langsung
        if (s.raw) {
            const additionalNodes = buildNodes ? buildNodes(jid, s.raw) : [];
            return await this.relayMessage(jid, s.raw, {
                messageId: this.bail.generateMessageID(),
                additionalNodes
            });
        }

        // Mode 2: inner WAMessage sudah disiapkan — wrap dengan secret
        if (s.message) {
            const wrapped = {
                groupStatusMessageV2: {
                    message: {
                        messageContextInfo: {
                            messageSecret: secret,
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        ...s.message
                    }
                }
            };
            const additionalNodes = buildNodes ? buildNodes(jid, wrapped) : [];
            return await this.relayMessage(jid, wrapped, {
                messageId: this.bail.generateMessageID(),
                additionalNodes
            });
        }

        // Mode 3: generate dari media/teks
        let innerMessage = {};
        const mentionCtx = (Array.isArray(s.mentions) && s.mentions.length)
            ? { contextInfo: { mentionedJid: s.mentions } }
            : {};

        if (s.text || (!s.image && !s.video && !s.gif && !s.audio && !s.sticker && !s.document)) {
            // Teks
            innerMessage = {
                extendedTextMessage: {
                    text: s.text || s.caption || '',
                    ...(typeof s.backgroundColor !== 'undefined' ? { backgroundArgb: s.backgroundColor } : {}),
                    ...(typeof s.textArgb !== 'undefined'        ? { textArgb: s.textArgb }               : {}),
                    ...(typeof s.font !== 'undefined'            ? { font: s.font }                       : {}),
                    ...mentionCtx
                }
            };
        } else if (s.image) {
            const media = await this.utils.prepareWAMessageMedia(
                { image: s.image },
                { upload: this.waUploadToServer }
            );
            if (s.caption) media.imageMessage.caption = s.caption;
            if (mentionCtx.contextInfo) media.imageMessage.contextInfo = { ...media.imageMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.card) {
            // Mode: canvas-rendered story card (gradient + title/body/footer text),
            // see lib/Utils/story-card.js. `s.card` accepts the same options as
            // renderStoryCard() — e.g. { title, body, footer, gradient, direction }.
            const cardBuffer = await this.utils.renderStoryCard(s.card);
            const media = await this.utils.prepareWAMessageMedia(
                { image: cardBuffer },
                { upload: this.waUploadToServer }
            );
            if (s.caption) media.imageMessage.caption = s.caption;
            if (mentionCtx.contextInfo) media.imageMessage.contextInfo = { ...media.imageMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.gif) {
            // Shorthand: { gif: Buffer | { url }, caption? } — dikirim sebagai video looping,
            // sama seperti representasi GIF asli WhatsApp.
            const media = await this.utils.prepareWAMessageMedia(
                { video: s.gif },
                { upload: this.waUploadToServer }
            );
            if (s.caption) media.videoMessage.caption = s.caption;
            media.videoMessage.gifPlayback = true;
            if (mentionCtx.contextInfo) media.videoMessage.contextInfo = { ...media.videoMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.video) {
            const media = await this.utils.prepareWAMessageMedia(
                { video: s.video },
                { upload: this.waUploadToServer }
            );
            if (s.caption)     media.videoMessage.caption     = s.caption;
            if (s.gifPlayback) media.videoMessage.gifPlayback = true;
            if (s.seconds)     media.videoMessage.seconds     = s.seconds;
            if (mentionCtx.contextInfo) media.videoMessage.contextInfo = { ...media.videoMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.audio) {
            const media = await this.utils.prepareWAMessageMedia(
                {
                    audio: s.audio,
                    ptt: s.ptt !== false,
                    ...(s.seconds  ? { seconds: s.seconds }  : {}),
                    ...(s.mimetype ? { mimetype: s.mimetype } : {})
                },
                {
                    upload: this.waUploadToServer,
                    // NOTE: backgroundColor harus lewat `options` (argumen ke-2), bukan payload
                    // media — prepareWAMessageMedia() cuma hitung backgroundArgb untuk ptt audio
                    // kalau options.backgroundColor keisi. Sebelumnya gak pernah diteruskan di sini,
                    // jadi backgroundColor pada audio story selalu diam-diam diabaikan.
                    ...(typeof s.backgroundColor !== 'undefined' ? { backgroundColor: s.backgroundColor } : {})
                }
            );
            if (mentionCtx.contextInfo) media.audioMessage.contextInfo = { ...media.audioMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.sticker) {
            const media = await this.utils.prepareWAMessageMedia(
                { sticker: s.sticker },
                { upload: this.waUploadToServer }
            );
            if (mentionCtx.contextInfo) media.stickerMessage.contextInfo = { ...media.stickerMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else if (s.document) {
            const media = await this.utils.prepareWAMessageMedia(
                {
                    document: s.document,
                    mimetype: s.mimetype || 'application/octet-stream',
                    fileName: s.fileName || 'file'
                },
                { upload: this.waUploadToServer }
            );
            if (s.caption  && media.documentMessage) media.documentMessage.caption  = s.caption;
            if (s.fileName && media.documentMessage) media.documentMessage.fileName = s.fileName;
            if (mentionCtx.contextInfo && media.documentMessage) media.documentMessage.contextInfo = { ...media.documentMessage.contextInfo, ...mentionCtx.contextInfo };
            innerMessage = media;
        } else {
            innerMessage = await this.bail.generateWAMessageContent(s, { upload: this.waUploadToServer });
        }

        // Wrap dengan messageContextInfo + messageSecret — WAJIB supaya konten bisa ditampilkan
        const wrapped = {
            groupStatusMessageV2: {
                message: {
                    messageContextInfo: {
                        messageSecret: secret,
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    ...innerMessage
                }
            }
        };

        // Ini bagian yang tadinya hilang: <meta is_vsn2="1"/> baru benar-benar
        // terpasang lewat additionalNodes di bawah ini.
        const additionalNodes = buildNodes ? buildNodes(jid, wrapped) : [];

        return await this.relayMessage(jid, wrapped, {
            messageId: this.bail.generateMessageID(),
            additionalNodes
        });
    }
}

export default ExtendedMessageBuilder;
