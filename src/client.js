import 'dotenv/config';

const BASE_URL = process.env.MANUS_BASE_URL || 'https://api.manus.ai';
const API_KEY = process.env.MANUS_API_KEY;

if (!API_KEY) throw new Error('MANUS_API_KEY missing from env');

export async function manus(method, params = {}, { http = 'POST' } = {}) {
  let url = `${BASE_URL}/v2/${method}`;
  const init = {
    method: http,
    headers: {
      'x-manus-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  };
  if (http === 'GET') {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
    ).toString();
    if (qs) url += `?${qs}`;
  } else {
    init.body = JSON.stringify(params);
  }
  const res = await fetch(url, init);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) {
    const err = new Error(json?.error?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export const tasks = {
  create: (p) => manus('task.create', p),
  detail: (task_id) => manus('task.detail', { task_id }, { http: 'GET' }),
  list: (p = {}) => manus('task.list', p, { http: 'GET' }),
  listMessages: (task_id, p = {}) => manus('task.listMessages', { task_id, ...p }, { http: 'GET' }),
  sendMessage: (p) => manus('task.sendMessage', p),
  stop: (task_id) => manus('task.stop', { task_id }),
  delete: (task_id) => manus('task.delete', { task_id }),
};

export const projects = {
  create: (p) => manus('project.create', p),
  list: (p = {}) => manus('project.list', p, { http: 'GET' }),
};

export const files = {
  upload: (p) => manus('file.upload', p),
  detail: (file_id) => manus('file.detail', { file_id }, { http: 'GET' }),
};

export const webhooks = {
  create: (p) => manus('webhook.create', p),
  list: () => manus('webhook.list', {}, { http: 'GET' }),
  delete: (webhook_id) => manus('webhook.delete', { webhook_id }),
};
