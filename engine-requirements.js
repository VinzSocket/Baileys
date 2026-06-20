const [major, minor] = process.versions.node.split('.').map(Number);

// require(esm) is only stable on Node 20.19.0+ and 22.12.0+ (and any 23.x+).
// Below that, `require('@vinzsocket/baileys')` from a CommonJS bot will throw ERR_REQUIRE_ESM.
const supportsRequireEsm =
  major >= 23 ||
  (major === 22 && minor >= 12) ||
  (major === 20 && minor >= 19);

if (major < 20) {
  console.error(
    `\n❌ This package requires Node.js 20+ to run reliably.\n` +
    `   You are using Node.js ${process.versions.node}.\n` +
    `   Please upgrade to Node.js 20+ to proceed.\n`
  );
  process.exit(1);
}

if (!supportsRequireEsm) {
  console.warn(
    `\n⚠️  Node.js ${process.versions.node} detected.\n` +
    `   This package is ESM ("type": "module"). If your bot uses require() to load it,\n` +
    `   you need Node.js 20.19.0+ or 22.12.0+ for require(esm) support.\n` +
    `   Either upgrade Node.js, or load this package with dynamic import() instead:\n` +
    `     const baileys = await import('@vinzsocket/baileys')\n`
  );
}
