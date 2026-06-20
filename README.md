Harps Baileys

A WebSockets library for interacting with WhatsApp Web Multi-Device.

Features

- Multi-Device WhatsApp Support
- QR Code Authentication
- Pairing Code Authentication
- Message Sending & Receiving
- Image, Video, Audio & Document Support
- Sticker Support
- Poll Support
- Reaction Message Support
- Group Management
- Contact Management
- Presence Updates
- Link Preview Generation
- WhatsApp Protocol Implementation
- Signal Encryption Support
- Session Management
- Event-Based Architecture
- TypeScript Definitions

Installation

NPM

npm install @vinzsocket/latest

Yarn

yarn add @vinzsocket/latest

PNPM

pnpm add @vinzsocket/latest

Import

ESM

import makeWASocket from '@vinzsocket/latest'

CommonJS

const makeWASocket = require('@vinzsocket/latest')

Project Structure

.
├── WAProto/          # WhatsApp Protocol Buffers
├── lib/
│   ├── Socket/       # Core WhatsApp Socket
│   ├── Signal/       # Signal Encryption
│   ├── Utils/        # Utility Functions
│   ├── Types/        # Type Definitions
│   ├── WABinary/     # Binary Protocol Parser
│   ├── WAUSync/      # WhatsApp Sync Engine
│   └── WAM/          # Analytics & Metrics
├── package.json
└── README.md

Basic Example

import makeWASocket from '@vinzsocket/latest'

const sock = makeWASocket({})

sock.ev.on('connection.update', ({ connection }) => {
    console.log('Connection:', connection)
})

Supported Messages

- Text Message
- Image Message
- Video Message
- Audio Message
- Sticker Message
- Document Message
- Contact Message
- Location Message
- Poll Message
- Reaction Message

Group Features

- Create Group
- Update Group Subject
- Update Group Description
- Add Members
- Remove Members
- Promote Admin
- Demote Admin
- Fetch Group Metadata

License

MIT License

Credits

- Baileys
- WhatsApp Web Reverse Engineering Community
- VinzSocket
