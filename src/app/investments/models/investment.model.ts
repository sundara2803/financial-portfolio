export interface Investment {
    assetType: string;
    assetName: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
    notes?: string; // Optional field
  }