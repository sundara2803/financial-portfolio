import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Investment } from '../models/investment.model';
import { PortfolioSummary } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private http: HttpClient) { }
  private apiBaseUrl = environment.apiBaseUrl;

  getPortfolioSummary(): Observable<PortfolioSummary[]> {
    return this.http.get<PortfolioSummary[]>(`${this.apiBaseUrl}portfoliosummary`);
  }

  addInvestment(investment: Investment): Observable<any> {
    return of({
      status: 'success',
      message: 'Request was successful',
      data: investment || null,
      error: null
    }).pipe(delay(500));
  }
}