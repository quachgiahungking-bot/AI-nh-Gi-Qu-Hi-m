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
  rarity_score: number;
  age: string;
  origin_analysis: string;
  analysis: string;
  story: string;
  collector_appeal: string;
  sales_post: {
    facebook: string;
    tiktok: string;
    auction: string;
  };
}
