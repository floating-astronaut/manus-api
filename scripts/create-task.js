import { tasks } from '../src/client.js';

const content = process.argv.slice(2).join(' ') || 'Say hello from the Manus API.';
const res = await tasks.create({ message: { content } });
console.log(JSON.stringify(res, null, 2));
