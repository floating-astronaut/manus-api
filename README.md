# manus-api

Minimal Node.js client for the [Manus API v2](https://open.manus.ai/docs/v2/overview).

## Setup

```bash
npm install
cp .env.example .env  # fill in MANUS_API_KEY
```

## Usage

```bash
npm run task:create -- "Summarize today's AI news"
npm run task:get -- <task_id>
```

Or import the client:

```js
import { tasks } from './src/client.js';
const t = await tasks.create({ prompt: 'hello' });
```

Docs: https://open.manus.ai/docs/llms.txt
