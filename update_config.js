const fs = require('fs');

async function run() {
  try {
    const res = await fetch('http://localhost:3000/api/poster/menu?all=true');
    const data = await res.json();
    
    if (!data.success) {
      console.error("Failed to fetch menu");
      return;
    }
    
    const products = data.items;
    const productsWithoutPhotos = products.filter(p => !p.photo).map(p => p.product_id);
    
    const configPath = './data/.menu_config.json';
    let config = { hiddenCategories: [], hiddenProducts: [], customProductPhotos: {} };
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    
    // Hide all products without a photo
    config.hiddenProducts = Array.from(new Set([...config.hiddenProducts, ...productsWithoutPhotos]));
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Hidden ${productsWithoutPhotos.length} products without photos.`);
  } catch (err) {
    console.error(err);
  }
}
run();
