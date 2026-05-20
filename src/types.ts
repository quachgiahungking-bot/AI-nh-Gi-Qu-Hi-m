export interface ArtifactFormData {
  name: string;
  weight: string;
  dimensions: string;
  material: string;
  origin: string;
  history: string;
  discovery: string;
  condition: string;
}

export interface ValuationResult {
  valuation: string;
  reference_price_range?: {
    lowest: string;
    highest: string;
  };
  comparable_sales: string;
  rarity_score: number;
  historical_mystery_score: number;
  investment_strength: number;
  age_and_origin: string;
  surface_structure: string;
  story: string;
  collector_appeal: string;
  sales_post: {
    facebook: string;
    tiktok: string;
    auction: string;
  };
}
