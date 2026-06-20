import type { proto } from '../../WAProto/index.js';

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

export interface GroupStatusMessage {
    message?: any;
    image?: string | Buffer | { url: string };
    video?: string | Buffer | { url: string };
    text?: string;
    caption?: string;
    document?: string | Buffer | { url: string };
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

    handleGroupStory(content: { groupStatusMessage: GroupStatusMessage }, jid: string, quoted?: proto.IWebMessageInfo | null): Promise<any>;
}

export default ExtendedMessageBuilder;
