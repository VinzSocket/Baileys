// mention.js
// Mention helper utilities, used by Socket/dugong.js extended message builders.
// Ported from baileys-lily, adapted to ESM for Harps-Baileys.

/**
 * Normalize mentions to proper JID format
 * @param {string|string[]|null|undefined} mentions
 * @returns {string[]}
 */
const mentionCache = new Map();

export function normalizeMentions(mentions) {
    const cacheKey = JSON.stringify(mentions);
    if (mentionCache.has(cacheKey)) {
        return mentionCache.get(cacheKey);
    }

    if (!mentions) return [];
    if (!Array.isArray(mentions)) mentions = [mentions];

    const result = mentions
        .map(jid => {
            if (typeof jid !== 'string') return null;
            jid = jid.trim();
            if (!jid) return null;

            // Already has @s.whatsapp.net or @lid
            if (jid.includes('@s.whatsapp.net') || jid.includes('@lid')) {
                return jid;
            }
            // Has @ but not complete
            if (jid.includes('@')) {
                return jid;
            }
            // Plain number
            return jid + '@s.whatsapp.net';
        })
        .filter(Boolean);

    mentionCache.set(cacheKey, result);
    // Simple cache size limit
    if (mentionCache.size > 1000) mentionCache.clear();
    return result;
}

/**
 * Apply mentions into a message object (used by Socket/dugong.js extended handlers)
 * @param {object} msg - The message content object
 * @param {string|string[]|null} mentions
 * @param {object} contextInfo - Optional contextInfo to also update
 * @returns {object} msg
 */
export function applyMentions(msg, mentions, contextInfo = {}) {
    const normalized = normalizeMentions(mentions);
    if (normalized.length === 0) return msg;

    // messageContextInfo
    if (!msg.messageContextInfo) msg.messageContextInfo = {};
    if (!msg.messageContextInfo.mentionedJid) msg.messageContextInfo.mentionedJid = [];

    const existing = new Set(msg.messageContextInfo.mentionedJid);
    for (const jid of normalized) {
        if (!existing.has(jid)) {
            msg.messageContextInfo.mentionedJid.push(jid);
            existing.add(jid);
        }
    }

    // contextInfo
    if (contextInfo && typeof contextInfo === 'object') {
        if (!contextInfo.mentionedJid) contextInfo.mentionedJid = [];
        for (const jid of normalized) {
            if (!contextInfo.mentionedJid.includes(jid)) {
                contextInfo.mentionedJid.push(jid);
            }
        }
    }

    // Extra for interactiveMessage
    if (msg.interactiveMessage?.contextInfo) {
        if (!msg.interactiveMessage.contextInfo.mentionedJid) {
            msg.interactiveMessage.contextInfo.mentionedJid = [];
        }
        for (const jid of normalized) {
            if (!msg.interactiveMessage.contextInfo.mentionedJid.includes(jid)) {
                msg.interactiveMessage.contextInfo.mentionedJid.push(jid);
            }
        }
    }

    return msg;
}

/**
 * Build a "tag all" text block + mentionedJid list from a group's participants,
 * the way you'd get from sock.groupMetadata(jid).participants
 *
 * Handles the WhatsApp "LID" privacy rollout correctly: when a participant's
 * phone number was NOT disclosed by WhatsApp (group addressingMode = 'lid' and
 * no phone_number attr came back), we do NOT print the raw LID digits as if
 * they were a phone number (e.g. "@206244447002720") since that's meaningless
 * to humans. Instead we fall back to the member's display name if you have one
 * (e.g. from your contact store / pushName cache), or a generic label.
 *
 * @param {Array<object>} participants - group.participants from groupMetadata()
 * @param {object} [options]
 * @param {(jid: string) => string|undefined} [options.getDisplayName] - optional lookup (e.g. store.contacts[jid]?.notify)
 * @param {string} [options.header] - text placed above the list
 * @param {string} [options.footer] - text placed below the list
 * @returns {{ text: string, mentions: string[] }}
 */
export function buildTagAllText(participants, options = {}) {
    const { getDisplayName, header = '', footer = '' } = options;
    const lines = [];
    const mentions = [];

    for (const p of participants || []) {
        // Prefer a real phone-number JID when WhatsApp actually disclosed one.
        const realJid = p.jid && p.jid.endsWith('@s.whatsapp.net')
            ? p.jid
            : (p.phoneNumber ? (p.phoneNumber.includes('@') ? p.phoneNumber : `${p.phoneNumber}@s.whatsapp.net`) : null);
        const mentionJid = realJid || p.id; // what we actually tag/ping (lid is fine for this)

        mentions.push(mentionJid);

        if (realJid) {
            // We know the real phone number — safe & useful to show it.
            lines.push(`@${realJid.split('@')[0]}`);
        } else {
            // LID-only participant: don't print fake-looking digits.
            const name = typeof getDisplayName === 'function' ? getDisplayName(p.id) : null;
            lines.push(name ? `@${name}` : '@Member');
        }
    }

    const body = [header, lines.join('\n'), footer].filter(Boolean).join('\n\n');
    return { text: body, mentions };
}
