// dugong.js — extended message builders
// Handles: Request Payment, Product, Interactive (buttons/native flow/external ad reply/
// document+thumbnail), Album, Event, Poll Result, Group Status V2 (group story).
// Ported from baileys-lily (Socket/dugong.js), adapted to ESM for Harps-Baileys.

import { randomBytes } from 'crypto';
import { proto } from '../../WAProto/index.js';
import { normalizeMentions } from '../Utils/mention.js';

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
        if (content.productMessage) return 'PRODUCT';
        if (content.interactiveMessage) return 'INTERACTIVE';
        if (content.albumMessage) return 'ALBUM';
        if (content.eventMessage) return 'EVENT';
        if (content.pollResultMessage) return 'POLL_RESULT';
        if (content.groupStatusMessage) return 'GROUP_STORY';
        return null;
    }

    /** Request Payment — tagihan pembayaran + sticker/note & background */
    async handlePayment(content, quoted) {
        const data = content.requestPaymentMessage;
        let notes = {};

        if (data.sticker?.stickerMessage) {
            notes = {
                stickerMessage: {
                    ...data.sticker.stickerMessage,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        } else if (data.note) {
            notes = {
                extendedTextMessage: {
                    text: data.note,
                    contextInfo: {
                        stanzaId: quoted?.key?.id,
                        participant: quoted?.key?.participant || content.sender,
                        quotedMessage: quoted?.message
                    }
                }
            };
        }

        return {
            requestPaymentMessage: proto.Message.RequestPaymentMessage.fromObject({
                expiryTimestamp: data.expiry || 0,
                amount1000: data.amount || 0,
                currencyCodeIso4217: data.currency || 'IDR',
                requestFrom: data.from || '0@s.whatsapp.net',
                noteMessage: notes,
                background: data.background ?? {
                    id: 'DEFAULT',
                    placeholderArgb: 0xFFF0F0F0
                }
            })
        };
    }

    /** Product Message — katalog produk */
    async handleProduct(content, jid, quoted) {
        const {
            title,
            description,
            thumbnail,
            productId,
            retailerId,
            url,
            body = '',
            footer = '',
            buttons = [],
            priceAmount1000 = null,
            currencyCode = 'IDR'
        } = content.productMessage;

        let productImage;

        if (Buffer.isBuffer(thumbnail)) {
            const { imageMessage } = await this.utils.generateWAMessageContent(
                { image: thumbnail },
                { upload: this.waUploadToServer }
            );
            productImage = imageMessage;
        } else if (typeof thumbnail === 'object' && thumbnail?.url) {
            const { imageMessage } = await this.utils.generateWAMessageContent(
                { image: { url: thumbnail.url } },
                { upload: this.waUploadToServer }
            );
            productImage = imageMessage;
        }

        return {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: body },
                        footer: { text: footer },
                        header: {
                            title,
                            hasMediaAttachment: true,
                            productMessage: {
                                product: {
                                    productImage,
                                    productId,
                                    title,
                                    description,
                                    currencyCode,
                                    priceAmount1000,
                                    retailerId,
                                    url,
                                    productImageCount: 1
                                },
                                businessOwnerJid: '0@s.whatsapp.net'
                            }
                        },
                        nativeFlowMessage: { buttons }
                    }
                }
            }
        };
    }

    /**
     * Interactive Message — button, copy code, native flow, bottom sheet,
     * limited time offer, document+thumbnail, external ad reply.
     */
    async handleInteractive(content, jid, quoted, options = {}) {
        const {
            title,
            footer,
            thumbnail,
            image,
            video,
            document,
            mimetype,
            fileName,
            jpegThumbnail,
            contextInfo = {},
            externalAdReply,
            buttons = [],
            nativeFlowMessage,
            header
        } = content.interactiveMessage;

        let media = null;

        // Media handling (image, video, document)
        if (thumbnail || image) {
            const imgSource = thumbnail || image;
            const imgObj = typeof imgSource === 'object' && imgSource.url ? { url: imgSource.url } : imgSource;
            media = await this.utils.prepareWAMessageMedia(
                { image: imgObj },
                { upload: this.waUploadToServer }
            );
        } else if (video) {
            const vidObj = typeof video === 'object' && video.url ? { url: video.url } : video;
            media = await this.utils.prepareWAMessageMedia(
                { video: vidObj },
                { upload: this.waUploadToServer }
            );
        } else if (document) {
            // Document + Thumbnail: kirim PDF/dokumen dengan preview
            let documentPayload = { document };
            if (jpegThumbnail) {
                documentPayload.jpegThumbnail = typeof jpegThumbnail === 'object' && jpegThumbnail.url
                    ? { url: jpegThumbnail.url }
                    : jpegThumbnail;
            }
            media = await this.utils.prepareWAMessageMedia(
                documentPayload,
                { upload: this.waUploadToServer }
            );
            if (fileName && media.documentMessage) media.documentMessage.fileName = fileName;
            if (mimetype && media.documentMessage) media.documentMessage.mimetype = mimetype;
        }

        // Build interactive message
        let interactiveMessage = {
            body: { text: title || '' },
            footer: { text: footer || '' }
        };

        // Buttons / nativeFlowMessage (button, copy code, native flow, bottom sheet, limited time offer)
        if (buttons && buttons.length > 0) {
            interactiveMessage.nativeFlowMessage = { buttons };
            if (nativeFlowMessage) {
                interactiveMessage.nativeFlowMessage = {
                    ...interactiveMessage.nativeFlowMessage,
                    ...nativeFlowMessage
                };
            }
        } else if (nativeFlowMessage) {
            interactiveMessage.nativeFlowMessage = nativeFlowMessage;
        }

        // Header with media
        if (media) {
            interactiveMessage.header = {
                title: header || '',
                hasMediaAttachment: true,
                ...media
            };
        } else {
            interactiveMessage.header = {
                title: header || '',
                hasMediaAttachment: false
            };
        }

        // contextInfo (mentions + external ad reply)
        let finalContextInfo = {
            forwardingScore: contextInfo.forwardingScore || 0,
            isForwarded: contextInfo.isForwarded || false,
            ...contextInfo,
            mentionedJid: normalizeMentions(contextInfo.mentionedJid || options.mentions || [])
        };

        if (externalAdReply) {
            // External Ad Reply — pesan dengan thumbnail eksternal
            finalContextInfo.externalAdReply = {
                title: externalAdReply.title || '',
                body: externalAdReply.body || '',
                mediaType: externalAdReply.mediaType || 1,
                thumbnailUrl: externalAdReply.thumbnailUrl || '',
                mediaUrl: externalAdReply.mediaUrl || '',
                sourceUrl: externalAdReply.sourceUrl || '',
                showAdAttribution: externalAdReply.showAdAttribution || false,
                renderLargerThumbnail: externalAdReply.renderLargerThumbnail || false,
                ...externalAdReply
            };
        }

        if (finalContextInfo.mentionedJid && !Array.isArray(finalContextInfo.mentionedJid)) {
            finalContextInfo.mentionedJid = [finalContextInfo.mentionedJid];
        }

        if (Object.keys(finalContextInfo).length > 0) {
            interactiveMessage.contextInfo = finalContextInfo;
        }

        return { interactiveMessage };
    }

    /** Album Message — kirim banyak foto/video sekaligus */
    async handleAlbum(content, jid, quoted) {
        const array = content.albumMessage;
        const album = await this.utils.generateWAMessageFromContent(jid, {
            messageContextInfo: {
                messageSecret: randomBytes(32)
            },
            albumMessage: {
                expectedImageCount: array.filter((a) => Object.prototype.hasOwnProperty.call(a, 'image')).length,
                expectedVideoCount: array.filter((a) => Object.prototype.hasOwnProperty.call(a, 'video')).length
            }
        }, {
            userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net',
            quoted,
            upload: this.waUploadToServer
        });

        await this.relayMessage(jid, album.message, {
            messageId: album.key.id
        });

        for (const item of array) {
            const img = await this.utils.generateWAMessage(jid, item, {
                upload: this.waUploadToServer
            });

            img.message.messageContextInfo = {
                messageSecret: randomBytes(32),
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key
                },
                participant: jid,
                forwardingScore: 0,
                isForwarded: false
            };

            await this.relayMessage(jid, img.message, {
                messageId: img.key.id,
                quoted: {
                    key: {
                        remoteJid: album.key.remoteJid,
                        id: album.key.id,
                        fromMe: true,
                        participant: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net'
                    },
                    message: album.message
                }
            });
        }
        return album;
    }

    /** Event Message — undangan acara dengan lokasi & waktu */
    async handleEvent(content, jid, quoted) {
        const eventData = content.eventMessage;

        const msg = await this.utils.generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                        messageSecret: randomBytes(32),
                        supportPayload: JSON.stringify({
                            version: 2,
                            is_ai_message: true,
                            should_show_system_message: true,
                            ticket_id: randomBytes(16).toString('hex')
                        })
                    },
                    eventMessage: {
                        contextInfo: {
                            mentionedJid: [jid],
                            participant: jid,
                            remoteJid: 'status@broadcast'
                        },
                        isCanceled: eventData.isCanceled || false,
                        name: eventData.name,
                        description: eventData.description,
                        location: eventData.location || {
                            degreesLatitude: 0,
                            degreesLongitude: 0,
                            name: 'Location'
                        },
                        joinLink: eventData.joinLink || '',
                        startTime: typeof eventData.startTime === 'string' ? parseInt(eventData.startTime, 10) : eventData.startTime || Date.now(),
                        endTime: typeof eventData.endTime === 'string' ? parseInt(eventData.endTime, 10) : eventData.endTime || Date.now() + 3600000,
                        extraGuestsAllowed: eventData.extraGuestsAllowed !== false
                    }
                }
            }
        }, { quoted });

        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });
        return msg;
    }

    /** Poll Result Message — tampilkan hasil polling */
    async handlePollResult(content, jid, quoted) {
        const pollData = content.pollResultMessage;

        const msg = await this.utils.generateWAMessageFromContent(jid, {
            pollResultSnapshotMessage: {
                name: pollData.name,
                pollVotes: pollData.pollVotes.map(vote => ({
                    optionName: vote.optionName,
                    optionVoteCount: typeof vote.optionVoteCount === 'number'
                        ? vote.optionVoteCount.toString()
                        : vote.optionVoteCount
                }))
            }
        }, {
            userJid: this.utils.generateMessageID().split('@')[0] + '@s.whatsapp.net',
            quoted
        });

        await this.relayMessage(jid, msg.message, {
            messageId: msg.key.id
        });

        return msg;
    }

    /** Group Status V2 — status di grup */
    async handleGroupStory(content, jid, quoted) {
        const storyData = content.groupStatusMessage;
        let waMsgContent;

        if (storyData.message) {
            waMsgContent = storyData;
        } else {
            waMsgContent = await this.bail.generateWAMessageContent(storyData, {
                upload: this.waUploadToServer
            });
        }

        const msg = {
            message: {
                groupStatusMessageV2: {
                    message: waMsgContent.message || waMsgContent
                }
            }
        };

        return await this.relayMessage(jid, msg.message, {
            messageId: this.bail.generateMessageID()
        });
    }
}

export default ExtendedMessageBuilder;
