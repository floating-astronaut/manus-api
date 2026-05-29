# manus-api

[![npm-less](https://img.shields.io/badge/runtime-Node%2018%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE)
[![Zero deps](https://img.shields.io/badge/deps-1%20(dotenv)-blue.svg)]()

A tiny, dependency-light **Node.js client for the [Manus API v2](https://open.manus.ai/docs/v2/overview)** —
tasks, projects, files, and webhooks behind one thin RPC-style wrapper. No SDK
bloat, no build step; one `fetch`-based module you can read end to end.

> Maintained by [Nuraveda Lab](https://nuraveda.com). MIT licensed.

## Install

```bash
git clone https://github.com/floating-astronaut/manus-api.git
cd manus-api
npm install                 # only dependency: dotenv
cp .env.example .env        # add your MANUS_API_KEY
```

## Quick start

```bash
# create a task from the CLI
npm run task:create -- "Summarize today's AI news"

# fetch a task by id
npm run task:get -- <task_id>
```

Or import the client:

```js
import { tasks } from './src/client.js';

const t = await tasks.create({ message: { content: 'Summarize today\'s AI news' } });
console.log(t);

const detail = await tasks.detail(t.task_id);
```

## Environment

```
MANUS_API_KEY=sk-...                  # required
MANUS_BASE_URL=https://api.manus.ai   # optional; defaults to this
```

`.env` is gitignored — never commit your key.

## API surface

All methods return the parsed JSON response and throw on a non-2xx /
`{ ok: false }` body (the thrown error carries `.status` and `.body`).

| Group | Methods |
|---|---|
| `tasks` | `create(params)` · `detail(id)` · `list(params?)` · `listMessages(id, params?)` · `sendMessage(params)` · `stop(id)` · `delete(id)` |
| `projects` | `create(params)` · `list(params?)` |
| `files` | `upload(params)` · `detail(id)` |
| `webhooks` | `create(params)` · `list()` · `delete(id)` |

Need an endpoint that isn't wrapped yet? Call the low-level helper directly:

```js
import { manus } from './src/client.js';
await manus('task.list', { limit: 20 }, { http: 'GET' });
```

## How it works

`src/client.js` is ~50 lines: it maps a method name (`task.create`) to
`POST/GET ${BASE_URL}/v2/<method>`, attaches the `x-manus-api-key` header,
encodes GET params as a query string and POST params as JSON, and normalizes
errors. That's the whole thing — fork it and add methods as you need them.

## License

[MIT](LICENSE) — use it, fork it, ship it.

---

<sub>Manus is a trademark of its respective owner; this is an unofficial client. Built by [Nuraveda Lab](https://nuraveda.com).</sub>
