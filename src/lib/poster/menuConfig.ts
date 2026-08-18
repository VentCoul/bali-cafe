import fs from 'fs';
import path from 'path';

export interface CustomCategory {
  id: string;
  name: string;
  productIds: string[];
}

export interface MenuConfig {
  hiddenCategories: string[];
  hiddenProducts: string[];
  customProductPhotos: Record<string, string>;
  customCategories: CustomCategory[];
}

const CONFIG_PATH = path.join(process.cwd(), 'data', '.menu_config.json');

const DEFAULT_CONFIG: MenuConfig = {
  hiddenCategories: [],
  hiddenProducts: [],
  customProductPhotos: {},
  customCategories: [],
};

export function getMenuConfig(): MenuConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error("Failed to read menu config", error);
  }
  return DEFAULT_CONFIG;
}

export function saveMenuConfig(config: MenuConfig): boolean {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Failed to save menu config", error);
    return false;
  }
}
