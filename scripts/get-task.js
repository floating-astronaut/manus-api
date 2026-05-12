import { tasks } from '../src/client.js';

const id = process.argv[2];
if (!id) {
  console.error('usage: node scripts/get-task.js <task_id>');
  process.exit(1);
}
console.log(JSON.stringify(await tasks.detail(id), null, 2));
