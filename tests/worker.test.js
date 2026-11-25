import { describe, expect, it, vi } from 'vitest';
import worker from '../worker-entry.js';

describe('Cloudflare Worker entry', () => {
  it('serves static assets for normal page requests', async () => {
    const assets = { fetch: vi.fn().mockResolvedValue(new Response('<html>', { status: 200 })) };
    const res = await worker.fetch(new Request('https://me.nmstudios.ai/'), { ASSETS: assets });
    expect(res.status).toBe(200);
    expect(assets.fetch).toHaveBeenCalledOnce();
  });

  it('routes POST /api/contact to the contact handler instead of assets', async () => {
    const assets = { fetch: vi.fn() };
    const req = new Request('https://me.nmstudios.ai/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const res = await worker.fetch(req, { ASSETS: assets });
    expect(res.status).toBe(400); // validation error from the contact handler
    expect(assets.fetch).not.toHaveBeenCalled();
  });
});
