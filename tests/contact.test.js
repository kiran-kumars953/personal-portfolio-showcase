import { afterEach, describe, expect, it, vi } from 'vitest';
import { onRequestPost } from '../functions/api/contact.js';

const ENV = { WEB3FORMS_ACCESS_KEY: 'test-key' };

const post = (body) =>
  new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const valid = { firstName: 'Asha', lastName: 'Rao', email: 'asha@example.com', message: 'Hello!' };

afterEach(() => vi.unstubAllGlobals());

describe('POST /api/contact', () => {
  it('rejects a submission with missing required fields', async () => {
    const res = await onRequestPost({ request: post({ email: 'a@b.c' }), env: ENV });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/name, email, and message/);
  });

  it('returns 500 when the email service key is not configured', async () => {
    const res = await onRequestPost({ request: post(valid), env: {} });
    expect(res.status).toBe(500);
  });

  it('forwards a trimmed message to Web3Forms and returns ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const res = await onRequestPost({
      request: post({ ...valid, firstName: '  Asha ', message: '  Hello!  ' }),
      env: ENV,
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({
      access_key: 'test-key',
      name: 'Asha Rao',
      email: 'asha@example.com',
      message: 'Hello!',
      phone: 'Not provided',
    });
  });

  it('returns 502 when Web3Forms rejects the request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('quota exceeded', { status: 429 })));
    const res = await onRequestPost({ request: post(valid), env: ENV });
    expect(res.status).toBe(502);
    expect((await res.json()).detail).toBe('quota exceeded');
  });

  it('returns 500 on a malformed JSON body', async () => {
    const bad = new Request('https://example.com/api/contact', { method: 'POST', body: '{not json' });
    const res = await onRequestPost({ request: bad, env: ENV });
    expect(res.status).toBe(500);
  });
});
