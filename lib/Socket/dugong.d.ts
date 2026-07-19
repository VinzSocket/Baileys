import type { proto } from '../../WAProto/index.js';

/** Bentuk umum satu tombol Native Flow (NF V7) — dipakai di semua nfButton* builder. */
export interface NativeFlowButton {
    name: string;
    buttonParamsJson: string;
    id?: string;
}

export interface NfButtonRow {
    id?: string;
    rowId?: string;
    title?: string;
    description?: string;
    /** Kalau diisi, row ini otomatis di-flatten jadi section anak sendiri (nested). */
    rows?: NfButtonRow[];
}

export interface NfButtonSection {
    title?: string;
    highlight_label?: string;
    rows?: NfButtonRow[];
}

export declare function nfButtonUrl(opts: { id?: string; displayText: string; url: string; merchantUrl?: string }): NativeFlowButton;
export declare function nfButtonCall(opts: { id?: string; displayText: string; phoneNumber: string }): NativeFlowButton;
export declare function nfButtonCopy(opts: { id?: string; displayText: string; copyCode: string }): NativeFlowButton;
export declare function nfButtonReminder(opts: { id?: string; displayText: string; title: string; notes?: string; startTime: number; endTime: number; timezone?: string }): NativeFlowButton;
export declare function nfButtonCancelReminder(opts: { id?: string; displayText: string; reminderKey: string }): NativeFlowButton;
export declare function nfButtonAddress(opts: { id?: string; displayText: string; label?: string }): NativeFlowButton;
export declare function nfButtonLocation(opts: { id?: string; displayText: string }): NativeFlowButton;
export declare function nfButtonQuickReply(opts: { id?: string; displayText: string; payload?: string }): NativeFlowButton;
export declare function nfButtonSingleSelect(opts: { id?: string; displayText: string; sections?: NfButtonSection[] }): NativeFlowButton;
/** Beberapa single_select sekaligus dalam 1 pesan — return array of buttons, bukan satu. */
export declare function nfButtonMultiSelect(selectors: Array<{ id?: string; displayText: string; sections?: NfButtonSection[] }>): NativeFlowButton[];
export declare function nfButtonReviewPay(opts: { id?: string; currency?: string; totalAmount1000: number; subtotal?: any; tax?: any; items?: any[]; merchant?: any }): NativeFlowButton;
export declare function nfButtonReviewOrder(opts: { id?: string; referenceId: string; type?: string; orderId: string }): NativeFlowButton;
export declare function nfButtonMPM(opts: { id?: string; sections?: Array<{ title?: string; productItems?: Array<{ productId?: string; product_id?: string }> }> }): NativeFlowButton;

/** Legacy listMessage builder — row dengan `rows` sendiri otomatis di-flatten jadi section baru. */
export declare function buildNestedListMessage(opts: {
    title: string;
    buttonText: string;
    footer?: string;
    sections?: NfButtonSection[];
}): { listMessage: any };

export type WAMediaUploadFunction = (stream: Buffer | NodeJS.ReadableStream, options?: {
    fileEncSha256?: Buffer;
    mediaType?: string;
    newsletter?: boolean;
}) => Promise<{
    url: string;
    directPath: string;
}>;

export interface WAMessageContentGenerationOptions {
    upload?: WAMediaUploadFunction;
    mediaCache?: any;
    options?: any;
    logger?: any;
}

export interface ExtendedMessageUtils {
    prepareWAMessageMedia: (media: any, options: WAMessageContentGenerationOptions) => Promise<any>;
    generateWAMessageContent: (content: any, options: WAMessageContentGenerationOptions) => Promise<any>;
    generateWAMessageFromContent: (jid: string, content: any, options?: any) => any;
    generateWAMessage: (jid: string, content: any, options?: any) => Promise<any>;
    generateMessageID: () => string;
    /** Optional — kalau ada, dipakai buat kasih hint <biz>/<meta is_vsn2="1"/> node ke relayMessage(). */
    buildInteractiveAdditionalNodes?: (jid: string, m: any) => any[];
    /** Optional — canvas-rendered story card generator, lihat Utils/story-card.js. */
    renderStoryCard?: (options: StoryCardOptions) => Promise<Buffer>;
    /** Diperlukan oleh sendStatusWhatsApp(): auth state (buat ambil JID sendiri). */
    authState?: any;
    /** Diperlukan oleh sendStatusWhatsApp(): resolve member grup buat statusJidList. */
    groupMetadata?: (jid: string) => Promise<any>;
    logger?: any;
    linkPreviewImageThumbnailWidth?: number;
    generateHighQualityLinkPreview?: boolean;
    httpRequestOptions?: any;
    mediaCache?: any;
    getUrlInfo?: (text: string, opts?: any) => Promise<any>;
}

export interface StickerMessage {
    url: string;
    fileSha256: Buffer | string;
    fileEncSha256: Buffer | string;
    mediaKey: Buffer | string;
    mimetype: string;
    directPath: string;
    fileLength: number | string;
    mediaKeyTimestamp: number | string;
    isAnimated?: boolean;
    stickerSentTs?: number | string;
    isAvatar?: boolean;
    isAiSticker?: boolean;
    isLottie?: boolean;
}

export interface PaymentMessage {
    amount: number;
    currency?: string;
    from?: string;
    expiry?: number;
    sticker?: { stickerMessage: StickerMessage };
    note?: string;
    background?: {
        id?: string;
        fileLength?: string;
        width?: number;
        height?: number;
        mimetype?: string;
        placeholderArgb?: number;
        textArgb?: number;
        subtextArgb?: number;
    };
}

export interface ProductMessage {
    title: string;
    description: string;
    thumbnail: Buffer | { url: string };
    productId: string;
    retailerId: string;
    url: string;
    body?: string;
    footer?: string;
    buttons?: proto.Message.InteractiveMessage.INativeFlowButton[];
    priceAmount1000?: number | null;
    currencyCode?: string;
}

export interface ExternalAdReply {
    title?: string;
    body?: string;
    mediaType?: number;
    thumbnailUrl?: string;
    mediaUrl?: string;
    sourceUrl?: string;
    showAdAttribution?: boolean;
    renderLargerThumbnail?: boolean;
    [key: string]: any;
}

export interface InteractiveMessage {
    header?: string;
    title: string;
    footer?: string;
    thumbnail?: string | Buffer | { url: string };
    image?: string | Buffer | { url: string };
    video?: string | Buffer | { url: string };
    document?: string | Buffer | { url: string };
    mimetype?: string;
    fileName?: string;
    jpegThumbnail?: string | Buffer | { url: string };
    contextInfo?: {
        mentionedJid?: string[];
        forwardingScore?: number;
        isForwarded?: boolean;
        externalAdReply?: ExternalAdReply;
        [key: string]: any;
    };
    externalAdReply?: ExternalAdReply;
    buttons?: proto.Message.InteractiveMessage.INativeFlowButton[];
    nativeFlowMessage?: {
        messageParamsJson?: string;
        buttons?: proto.Message.InteractiveMessage.INativeFlowButton[];
        [key: string]: any;
    };
}

export interface AlbumItem {
    image?: string | Buffer | { url: string; caption?: string };
    video?: string | Buffer | { url: string; caption?: string };
}

export interface EventMessageLocation {
    degreesLatitude: number;
    degreesLongitude: number;
    name: string;
}

export interface EventMessage {
    isCanceled?: boolean;
    name: string;
    description: string;
    location?: EventMessageLocation;
    joinLink?: string;
    startTime?: string | number;
    endTime?: string | number;
    extraGuestsAllowed?: boolean;
}

export interface PollVote {
    optionName: string;
    optionVoteCount: string | number;
}

export interface PollResultMessage {
    name: string;
    pollVotes: PollVote[];
}

export interface StoryCardOptions {
    title?: string;
    body?: string;
    footer?: string;
    gradient?: 'sunset' | 'purple' | 'ocean' | 'forest' | 'midnight' | 'fire';
    colors?: [string, string];
    direction?: 'vertical' | 'diagonal';
    width?: number;
    height?: number;
}

export interface GroupStatusMessage {
    /** Mode 3 (advanced): pre-built inner WAMessage — di-wrap langsung dengan messageSecret. */
    message?: any;
    /** Mode 1: raw relay / forward story langsung, bypass semua processing lain. */
    raw?: any;

    /** Teks story. Kalau kosong dan gak ada media lain, fallback text-mode dengan string kosong. */
    text?: string;
    /** Dipakai sebagai caption untuk media, atau fallback text kalau `text` kosong. */
    caption?: string;

    image?: string | Buffer | { url: string };
    video?: string | Buffer | { url: string };
    /** Shorthand: dikirim sebagai video looping (`gifPlayback: true` otomatis di-set). */
    gif?: string | Buffer | { url: string };
    audio?: string | Buffer | { url: string };
    sticker?: string | Buffer | { url: string };
    document?: string | Buffer | { url: string };
    /** Canvas-rendered story card (gradient + title/body/footer), lihat Utils/story-card.js. */
    card?: StoryCardOptions;

    /** Teks & audio (ptt) saja — ARGB hex (mis. 0xFF128C7E). */
    backgroundColor?: number;
    /** Teks saja. */
    textArgb?: number;
    /** Teks saja, 0-5. */
    font?: number;

    /** Video & gif. */
    gifPlayback?: boolean;
    /** Video/audio — durasi dalam detik. */
    seconds?: number;

    /** Audio: voice note (true, default) atau musik biasa (false). */
    ptt?: boolean;
    /** Audio/document. */
    mimetype?: string;
    /** Document. */
    fileName?: string;

    /** Didukung di semua mode (text/image/card/gif/video/audio/sticker/document). */
    mentions?: string[];

    [key: string]: any;
}

export interface ExtendedMessageContent {
    requestPaymentMessage?: PaymentMessage;
    productMessage?: ProductMessage;
    interactiveMessage?: InteractiveMessage;
    albumMessage?: AlbumItem[];
    eventMessage?: EventMessage;
    pollResultMessage?: PollResultMessage;
    groupStatusMessage?: GroupStatusMessage;
    sender?: string;
}

export type ExtendedMessageType = 'PAYMENT' | 'PRODUCT' | 'INTERACTIVE' | 'ALBUM' | 'EVENT' | 'POLL_RESULT' | 'GROUP_STORY';

export declare class ExtendedMessageBuilder {
    utils: ExtendedMessageUtils;
    relayMessage: (jid: string, content: any, options?: any) => Promise<any>;
    waUploadToServer: WAMediaUploadFunction;
    bail: {
        generateWAMessageContent: ExtendedMessageUtils['generateWAMessageContent'];
        generateMessageID: () => string;
        getContentType: (msg: any) => string;
    };

    constructor(utils: ExtendedMessageUtils, waUploadToServer: WAMediaUploadFunction, relayMessageFn: (jid: string, content: any, options?: any) => Promise<any>);

    detectType(content: ExtendedMessageContent): ExtendedMessageType | null;

    handlePayment(content: { requestPaymentMessage: PaymentMessage }, quoted?: proto.IWebMessageInfo | null): Promise<{
        requestPaymentMessage: proto.Message.RequestPaymentMessage;
    }>;

    handleProduct(content: { productMessage: ProductMessage }, jid: string, quoted?: proto.IWebMessageInfo | null): Promise<{
        viewOnceMessage: { message: { interactiveMessage: any } };
    }>;

    handleInteractive(content: { interactiveMessage: InteractiveMessage }, jid: string, quoted?: proto.IWebMessageInfo | null, options?: { mentions?: string[] }): Promise<{
        interactiveMessage: any;
    }>;

    handleAlbum(content: { albumMessage: AlbumItem[] }, jid: string, quoted?: proto.IWebMessageInfo | null): Promise<any>;

    handleEvent(content: { eventMessage: EventMessage }, jid: string, quoted?: proto.IWebMessageInfo | null): Promise<any>;

    handlePollResult(content: { pollResultMessage: PollResultMessage }, jid: string, quoted?: proto.IWebMessageInfo | null): Promise<any>;

    handleGroupStory(content: { groupStatusMessage: GroupStatusMessage }, jid: string): Promise<any>;

    /**
     * Kirim WhatsApp Status (story) sungguhan ke `status@broadcast`, mendukung
     * semua tipe media (text/image/video/gif/audio) sekaligus statusJidList
     * dan status-mention follow-up ke tiap jids.
     */
    sendStatusWhatsApp(content: GroupStatusMessage, jids?: string[]): Promise<any>;
}

export default ExtendedMessageBuilder;
