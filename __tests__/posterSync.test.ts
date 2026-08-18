import { syncUserWithPoster } from '../src/lib/poster/client-sync';
import { fetchPosterAPI } from '../src/lib/poster/client';

jest.mock('../src/lib/poster/client');

describe('syncUserWithPoster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('finds existing posterClientId when found', async () => {
    (fetchPosterAPI as jest.Mock).mockResolvedValue([{ client_id: '123' }]);

    const clientId = await syncUserWithPoster('+380991234567');

    expect(fetchPosterAPI).toHaveBeenCalledWith('/clients.getClients?phone=%2B380991234567');
    expect(clientId).toBe('123');
  });

  it('creates new client if not found', async () => {
    (fetchPosterAPI as jest.Mock)
      .mockResolvedValueOnce([]) // First call to getClients returns empty
      .mockResolvedValueOnce({ client_id: '456' }); // Second call to createClient returns new client

    const clientId = await syncUserWithPoster('+380991111111', { name: 'Test User' });

    expect(fetchPosterAPI).toHaveBeenCalledWith('/clients.createClient', expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('+380991111111')
    }));
    expect(clientId).toBe('456');
  });
});
