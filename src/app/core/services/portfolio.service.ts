import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockBackendService } from './mock-backend.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(
    private http: HttpClient,
    private mockBackend: MockBackendService
  ) { }

  getPortfolioSummary(): Observable<any> {
    return this.mockBackend.getPortfolioSummary();
  }

  addInvestment(investment: any): Observable<any> {
    return this.mockBackend.addInvestment(investment);
  }
}