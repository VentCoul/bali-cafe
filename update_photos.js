const fs = require('fs');

async function run() {
  try {
    const html = fs.readFileSync('/Users/sashasitnickyi/dev/bali/poster_page.html', 'utf8');
    const match = html.match(/<script id=\"menu-data\" type=\"application\/json\">(.*?)<\/script>/s);
    if (!match) {
      console.error("Could not find menu-data");
      return;
    }
    
    const items = JSON.parse(match[1]);
    const photoMap = {};
    let count = 0;
    
    items.forEach(item => {
      if (item.productId && item.photo) {
        // Just extract the relative path or use full URL.
        // We can just use the full URL as our custom photo supports it.
        photoMap[item.productId.toString()] = item.photo;
        count++;
      }
    });
    
    console.log(`Found ${count} photos in Poster QR.`);
    
    // Now write a script that we can run on the VPS
    fs.writeFileSync('apply_photos.js', `
const fs = require('fs');
const configPath = '/root/bali-cafe/data/.menu_config.json';
let config = { hiddenCategories: [], hiddenProducts: [], customProductPhotos: {} };
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const photoMap = ${JSON.stringify(photoMap, null, 2)};

Object.keys(photoMap).forEach(id => {
  config.customProductPhotos[id] = photoMap[id];
  
  // also un-hide the product since it now has a photo
  config.hiddenProducts = config.hiddenProducts.filter(p => p !== id);
});

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("Updated config with " + Object.keys(photoMap).length + " custom photos and unhid them.");
    `);
    
  } catch (err) {
    console.error(err);
  }
}
run();
