import { Boom } from '@hapi/boom';
/**
 * Canvas-rendered "story card" — generates a styled status/story image (gradient
 * background, title, body text, optional footer/branding strip) entirely in JS
 * via Jimp (already an optional peer dependency of this library, no native
 * binary required). Useful for visually distinctive WhatsApp Status / group
 * story (`groupStatusMessageV2`) posts without needing a design tool upstream.
 *
 * Lazily imports `jimp` so this module has zero cost / zero hard dependency
 * for consumers who never call it.
 */
let _jimpLib;
const getJimp = async () => {
    if (_jimpLib) return _jimpLib;
    try {
        // @ts-ignore - optional peer dependency
        const [core, fonts] = await Promise.all([import('jimp'), import('jimp/fonts')]);
        _jimpLib = { ...core, fonts };
        return _jimpLib;
    }
    catch {
        throw new Boom('renderStoryCard() requires the optional "jimp" peer dependency. Install it with: npm i jimp', { statusCode: 500 });
    }
};
const DEFAULT_GRADIENTS = {
    sunset: [0xff7e5fff, 0xfeb47bff],
    purple: [0x8e2de2ff, 0x4a00e0ff],
    ocean: [0x2193b0ff, 0x6dd5edff],
    forest: [0x134e5eff, 0x71b280ff],
    midnight: [0x232526ff, 0x414345ff],
    fire: [0xf12711ff, 0xf5af19ff]
};
const lerpChannel = (a, b, t) => Math.round(a + (b - a) * t);
const lerpColor = (c1, c2, t, jimpLib) => {
    const { r: r1, g: g1, b: b1, a: a1 } = jimpLib.intToRGBA(c1);
    const { r: r2, g: g2, b: b2, a: a2 } = jimpLib.intToRGBA(c2);
    return jimpLib.rgbaToInt(lerpChannel(r1, r2, t), lerpChannel(g1, g2, t), lerpChannel(b1, b2, t), lerpChannel(a1, a2, t));
};
/**
 * Renders a styled story card and returns a PNG buffer.
 *
 * @param {object} opts
 * @param {string} [opts.title] - large headline text
 * @param {string} [opts.body] - smaller body/subtitle text below the title
 * @param {string} [opts.footer] - small branding/footer line pinned to the bottom
 * @param {'sunset'|'purple'|'ocean'|'forest'|'midnight'|'fire'} [opts.gradient='purple'] - preset background gradient
 * @param {[string|number, string|number]} [opts.colors] - explicit [from, to] ARGB hex colors, overrides `gradient`
 * @param {'vertical'|'diagonal'} [opts.direction='vertical'] - gradient direction
 * @param {number} [opts.width=1080] - canvas width (WA status default is 1080x1920)
 * @param {number} [opts.height=1920] - canvas height
 * @returns {Promise<Buffer>} PNG image buffer, ready to pass as `{ image: buffer }`
 */
export const renderStoryCard = async (opts = {}) => {
    const jimpLib = await getJimp();
    const { Jimp, HorizontalAlign, VerticalAlign, loadFont, measureTextHeight, fonts } = jimpLib;
    const width = opts.width || 1080;
    const height = opts.height || 1920;
    const direction = opts.direction || 'vertical';
    const [from, to] = opts.colors || DEFAULT_GRADIENTS[opts.gradient] || DEFAULT_GRADIENTS.purple;
    const colorFrom = typeof from === 'string' ? parseInt(from.replace('#', ''), 16) : from;
    const colorTo = typeof to === 'string' ? parseInt(to.replace('#', ''), 16) : to;
    const image = new Jimp({ width, height, color: colorFrom });
    // Paint the gradient pixel-row-by-row (vertical) or via a diagonal blend factor (diagonal)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const t = direction === 'diagonal' ? (x / width + y / height) / 2 : y / height;
            image.setPixelColor(lerpColor(colorFrom, colorTo, t, jimpLib), x, y);
        }
    }
    const titleFont = await loadFont(fonts.SANS_64_WHITE);
    const bodyFont = await loadFont(fonts.SANS_32_WHITE);
    const footerFont = await loadFont(fonts.SANS_16_WHITE);
    const padding = Math.round(width * 0.08);
    const contentWidth = width - padding * 2;
    let cursorY = Math.round(height * 0.38);
    if (opts.title) {
        const titleHeight = measureTextHeight(titleFont, opts.title, contentWidth);
        image.print({
            font: titleFont,
            x: padding,
            y: cursorY,
            text: { text: opts.title, alignmentX: HorizontalAlign.LEFT, alignmentY: VerticalAlign.TOP },
            maxWidth: contentWidth
        });
        cursorY += titleHeight + Math.round(height * 0.03);
    }
    if (opts.body) {
        image.print({
            font: bodyFont,
            x: padding,
            y: cursorY,
            text: { text: opts.body, alignmentX: HorizontalAlign.LEFT, alignmentY: VerticalAlign.TOP },
            maxWidth: contentWidth
        });
    }
    if (opts.footer) {
        image.print({
            font: footerFont,
            x: padding,
            y: height - Math.round(height * 0.06),
            text: { text: opts.footer, alignmentX: HorizontalAlign.LEFT, alignmentY: VerticalAlign.TOP },
            maxWidth: contentWidth
        });
    }
    return image.getBuffer('image/png');
};
export const STORY_GRADIENTS = Object.keys(DEFAULT_GRADIENTS);
