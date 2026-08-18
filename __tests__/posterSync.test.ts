import { syncUserWithPoster } from '../src/lib/poster/client-sync';
import { prisma } from '../src/lib/db';
import { fetchPosterAPI } from '../src/lib/poster/client';

jest.mock('../src/lib/poster/client');
jest.mock('../src/lib/db', () => ({
  prisma: {
    user: {
      update: jest.fn()
    }
  }
}));

describe('syncUserWithPoster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates user with existing posterClientId when found', async () => {
    (fetchPosterAPI as jest.Mock).mockResolvedValue([{ client_id: '123' }]);

    const clientId = await syncUserWithPoster('user_1', '+380991234567');

    expect(fetchPosterAPI).toHaveBeenCalledWith('/clients.getClients?phone=%2B380991234567');
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_1' },
      data: { posterClientId: '123' }
    });
    expect(clientId).toBe('123');
  });

  it('creates new client if not found', async () => {
    (fetchPosterAPI as jest.Mock)
      .mockResolvedValueOnce([]) // First call to getClients returns empty
      .mockResolvedValueOnce({ client_id: '456' }); // Second call to createClient returns new client

    const clientId = await syncUserWithPoster('user_2', '+380991111111');

    expect(fetchPosterAPI).toHaveBeenCalledWith('/clients.createClient', expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('+380991111111')
    }));
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_2' },
      data: { posterClientId: '456' }
    });
    expect(clientId).toBe('456');
  });
});
