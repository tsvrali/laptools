export interface BakingIngredient {
  id: string;
  name: string;
  category: 'Flour & Grains' | 'Sugars & Sweeteners' | 'Fats & Dairy' | 'Leavening & Spices' | 'Nuts & Seeds' | 'Liquids & Miscellaneous';
  gramsPerCup: number; // 1 US cup = 236.588 ml
  description: string;
}

export const bakingIngredients: BakingIngredient[] = [
  // Flour & Grains
  { id: 'all_purpose_flour', name: 'All-Purpose Flour (unbleached/bleached)', category: 'Flour & Grains', gramsPerCup: 120, description: 'Spoon-and-leveled measurement' },
  { id: 'bread_flour', name: 'Bread Flour', category: 'Flour & Grains', gramsPerCup: 127, description: 'Higher protein hard wheat flour' },
  { id: 'cake_flour', name: 'Cake Flour (sifted)', category: 'Flour & Grains', gramsPerCup: 114, description: 'Delicate low-protein flour' },
  { id: 'whole_wheat_flour', name: 'Whole Wheat Flour', category: 'Flour & Grains', gramsPerCup: 128, description: 'Full grain flour with bran and germ' },
  { id: 'almond_flour', name: 'Almond Flour (blanched, fine)', category: 'Flour & Grains', gramsPerCup: 96, description: 'Finely ground skinless almonds' },
  { id: 'coconut_flour', name: 'Coconut Flour', category: 'Flour & Grains', gramsPerCup: 112, description: 'Highly absorbent dried ground coconut' },
  { id: 'rye_flour', name: 'Rye Flour (medium)', category: 'Flour & Grains', gramsPerCup: 102, description: 'Traditional bread grain flour' },
  { id: 'oat_flour', name: 'Oat Flour', category: 'Flour & Grains', gramsPerCup: 92, description: 'Ground rolled oats' },
  { id: 'cornstarch', name: 'Cornstarch', category: 'Flour & Grains', gramsPerCup: 128, description: 'Pure thickening starch' },
  { id: 'rolled_oats', name: 'Rolled Oats (Old Fashioned)', category: 'Flour & Grains', gramsPerCup: 90, description: 'Whole steamed and rolled oat flakes' },
  { id: 'quick_oats', name: 'Quick-Cooking Oats', category: 'Flour & Grains', gramsPerCup: 85, description: 'Thinly cut rolled oats' },
  { id: 'semolina', name: 'Semolina Flour', category: 'Flour & Grains', gramsPerCup: 167, description: 'Durum wheat semolina for pasta and cakes' },
  { id: 'tapioca_starch', name: 'Tapioca Flour / Starch', category: 'Flour & Grains', gramsPerCup: 120, description: 'Cassava root starch' },

  // Sugars & Sweeteners
  { id: 'granulated_sugar', name: 'Granulated White Sugar', category: 'Sugars & Sweeteners', gramsPerCup: 200, description: 'Standard table sugar' },
  { id: 'brown_sugar_packed', name: 'Brown Sugar (light or dark, firmly packed)', category: 'Sugars & Sweeteners', gramsPerCup: 220, description: 'Moist sugar with molasses' },
  { id: 'powdered_sugar', name: 'Confectioners / Powdered Sugar (sifted)', category: 'Sugars & Sweeteners', gramsPerCup: 120, description: '10x powdered sugar with cornstarch' },
  { id: 'honey', name: 'Honey (pure liquid)', category: 'Sugars & Sweeteners', gramsPerCup: 340, description: 'Dense liquid natural sweetener' },
  { id: 'maple_syrup', name: 'Pure Maple Syrup', category: 'Sugars & Sweeteners', gramsPerCup: 312, description: 'Grade A maple syrup' },
  { id: 'molasses', name: 'Molasses (dark or unsulphured)', category: 'Sugars & Sweeteners', gramsPerCup: 328, description: 'Dense sugarcane byproduct' },
  { id: 'corn_syrup', name: 'Corn Syrup (light or dark)', category: 'Sugars & Sweeteners', gramsPerCup: 328, description: 'Glucose syrup for confectionery' },
  { id: 'agave_nectar', name: 'Agave Nectar', category: 'Sugars & Sweeteners', gramsPerCup: 336, description: 'Liquid agave syrup' },
  { id: 'coconut_sugar', name: 'Coconut Palm Sugar', category: 'Sugars & Sweeteners', gramsPerCup: 154, description: 'Granulated coconut flower sap' },

  // Fats & Dairy
  { id: 'butter', name: 'Butter (unsalted or salted, 2 sticks)', category: 'Fats & Dairy', gramsPerCup: 227, description: '80% milkfat standard American butter' },
  { id: 'vegetable_oil', name: 'Vegetable / Canola / Olive Oil', category: 'Fats & Dairy', gramsPerCup: 218, description: 'Pure liquid cooking oils' },
  { id: 'coconut_oil_melted', name: 'Coconut Oil (melted liquid)', category: 'Fats & Dairy', gramsPerCup: 216, description: 'Refined or virgin coconut oil' },
  { id: 'shortening', name: 'Vegetable Shortening (Crisco)', category: 'Fats & Dairy', gramsPerCup: 190, description: 'Hydrogenated baking fat' },
  { id: 'sour_cream', name: 'Sour Cream (full fat)', category: 'Fats & Dairy', gramsPerCup: 242, description: 'Cultured cream' },
  { id: 'greek_yogurt', name: 'Greek Yogurt (plain, whole milk)', category: 'Fats & Dairy', gramsPerCup: 245, description: 'Strained cultured yogurt' },
  { id: 'heavy_cream', name: 'Heavy Whipping Cream', category: 'Fats & Dairy', gramsPerCup: 238, description: '36% milkfat cream' },
  { id: 'whole_milk', name: 'Whole Milk (3.25% fat)', category: 'Fats & Dairy', gramsPerCup: 245, description: 'Standard liquid dairy' },
  { id: 'cream_cheese', name: 'Cream Cheese (softened block)', category: 'Fats & Dairy', gramsPerCup: 226, description: '8 oz standard baking block' },
  { id: 'buttermilk', name: 'Cultured Buttermilk', category: 'Fats & Dairy', gramsPerCup: 245, description: 'Tangy fermented dairy' },

  // Leavening & Spices
  { id: 'cocoa_powder_natural', name: 'Unsweetened Cocoa Powder (Natural)', category: 'Leavening & Spices', gramsPerCup: 86, description: 'Sifted cocoa solids' },
  { id: 'cocoa_powder_dutch', name: 'Dutch-Process Cocoa Powder', category: 'Leavening & Spices', gramsPerCup: 92, description: 'Alkalized dark cocoa' },
  { id: 'table_salt', name: 'Table Salt (fine iodized)', category: 'Leavening & Spices', gramsPerCup: 288, description: 'Standard fine salt' },
  { id: 'kosher_salt_diamond', name: 'Kosher Salt (Diamond Crystal)', category: 'Leavening & Spices', gramsPerCup: 140, description: 'Light flake salt' },
  { id: 'kosher_salt_morton', name: 'Kosher Salt (Morton)', category: 'Leavening & Spices', gramsPerCup: 240, description: 'Coarse dense salt' },
  { id: 'baking_powder', name: 'Baking Powder', category: 'Leavening & Spices', gramsPerCup: 192, description: 'Double-acting chemical leavener' },
  { id: 'baking_soda', name: 'Baking Soda (Sodium Bicarbonate)', category: 'Leavening & Spices', gramsPerCup: 288, description: 'Pure bicarbonate' },
  { id: 'cinnamon_ground', name: 'Ground Cinnamon', category: 'Leavening & Spices', gramsPerCup: 125, description: 'Aromatic spice' },

  // Nuts & Miscellaneous
  { id: 'chocolate_chips', name: 'Semisweet Chocolate Chips', category: 'Nuts & Seeds', gramsPerCup: 170, description: 'Standard morsels' },
  { id: 'walnuts_chopped', name: 'Walnuts (chopped)', category: 'Nuts & Seeds', gramsPerCup: 117, description: 'Raw shelled pieces' },
  { id: 'pecans_chopped', name: 'Pecans (chopped)', category: 'Nuts & Seeds', gramsPerCup: 109, description: 'Shelled pecan pieces' },
  { id: 'peanut_butter', name: 'Peanut Butter (creamy/smooth)', category: 'Nuts & Seeds', gramsPerCup: 258, description: 'Standard commercial spread' },
  { id: 'water', name: 'Water (room temperature 20°C)', category: 'Liquids & Miscellaneous', gramsPerCup: 237, description: 'Density 1.00 g/ml' }
];
