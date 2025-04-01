export interface Performance {
    labels: string[];
    portfolio: number[];
    benchmark: number[];
  }
  
  export interface Allocation {
    labels: string[];
    values: number[];
  }
  
  export interface RecentTransaction {
    date: string;
    asset: string;
    type: 'Buy' | 'Sell';
    amount: number;
  }
  
  export interface PortfolioSummary {
    totalValue: number;
    totalChange: number;
    dailyChange: number;
    dailyChangePercent: number;
    annualReturn: number;
    annualReturnPercent: number;
    performance: Performance;
    allocation: Allocation;
    recentTransactions: RecentTransaction[];
  }
  