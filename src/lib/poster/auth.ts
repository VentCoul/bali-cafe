import fs from 'fs';
import path from 'path';

const TOKEN_FILE_PATH = path.join(process.cwd(), '.poster_data.json');

export interface PosterTokenData {
  access_token: string;
  account: string;
}

/**
 * Saves the Poster access token to a local file.
 * This is an MVP approach. In a production app with multiple tenants, use a database.
 */
export function savePosterToken(token: string, account: string): void {
  const data: PosterTokenData = { access_token: token, account };
  fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Retrieves the saved Poster access token.
 */
export function getPosterToken(): PosterTokenData | null {
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const fileData = fs.readFileSync(TOKEN_FILE_PATH, 'utf-8');
      return JSON.parse(fileData) as PosterTokenData;
    }
  } catch (error) {
    console.error('Error reading Poster token file:', error);
  }
  return null;
}
