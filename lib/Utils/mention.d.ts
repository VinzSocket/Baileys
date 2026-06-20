export declare function normalizeMentions(mentions: string | string[] | null | undefined): string[];
export declare function applyMentions(msg: any, mentions: string | string[] | null | undefined, contextInfo?: any): any;
export declare function buildTagAllText(participants: Array<{
    jid?: string;
    id: string;
    phoneNumber?: string;
}>, options?: {
    getDisplayName?: (jid: string) => string | undefined;
    header?: string;
    footer?: string;
}): {
    text: string;
    mentions: string[];
};
