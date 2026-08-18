export interface PosterProduct {
  product_id: string;
  menu_category_id: string;
  product_name: string;
  price: number; // Will be converted to actual currency (UAH instead of kopecks)
  photo: string | null;
  type: number; // 2 for dishes, 3 or 1 for products
  ingredient_id: string;
  weight_flag: string;
}

export interface PosterCategory {
  category_id: string;
  category_name: string;
}

export interface PosterTable {
  table_id: string;
  spot_id: string;
  table_name: string;
}
