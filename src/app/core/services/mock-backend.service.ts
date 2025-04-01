import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {
  constructor() { }

  getPortfolioSummary(): Observable<any> {
    const mockData = {
      totalValue: 125000,
      totalChange: 12.5,
      dailyChange: 1250,
      dailyChangePercent: 1.01,
      annualReturn: 15000,
      annualReturnPercent: 13.64,
      performance: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        portfolio: [100000, 102000, 105000, 107000, 110000, 112000, 115000, 117000, 120000, 122000, 124000, 125000],
        benchmark: [100000, 101500, 102000, 103500, 105000, 106000, 107500, 108000, 109500, 110000, 111500, 112000]
      },
      allocation: {
        labels: ['Stocks', 'Bonds', 'ETFs', 'Real Estate', 'Crypto'],
        values: [60000, 30000, 20000, 10000, 5000]
      },
      recentTransactions: [
        { date: '2023-10-15', asset: 'AAPL', type: 'Buy', amount: 5000 },
        { date: '2023-10-10', asset: 'TSLA', type: 'Sell', amount: 3000 },
        { date: '2023-10-05', asset: 'VTI', type: 'Buy', amount: 2000 },
        { date: '2023-09-28', asset: 'BND', type: 'Buy', amount: 1500 }
      ]
    };

    return of(mockData).pipe(delay(500));
  }

  addInvestment(investment: any): Observable<any> {
    console.log('Investment added:', investment);
    return of({ success: true }).pipe(delay(500));
  }
}