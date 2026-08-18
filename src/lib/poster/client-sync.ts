import { prisma } from '../db';
import { fetchPosterAPI } from './client';

export async function syncUserWithPoster(phone: string, data?: { name?: string, email?: string }) {
  // Check if client exists in Poster
  const clients = await fetchPosterAPI(`/clients.getClients?phone=${encodeURIComponent(phone)}`);
  
  let clientId = null;
  
  if (clients && Array.isArray(clients) && clients.length > 0) {
    clientId = clients[0].client_id;
  } else {
    // Create new client in Poster
    const newClient = await fetchPosterAPI('/clients.createClient', {
      method: 'POST',
      body: JSON.stringify({
        client_name: data?.name || 'Новий клієнт',
        phone: phone,
        email: data?.email,
      })
    });
    // @ts-ignore Poster returns the created object
    clientId = newClient.client_id;
  }
  
  if (!clientId) {
    throw new Error('Failed to resolve Poster client ID');
  }

  return String(clientId);
}
