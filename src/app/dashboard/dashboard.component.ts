import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from '../core/services/portfolio.service';
import { PortfolioSummary } from '../core/models/portfolio.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Subject } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  portfolioData!: PortfolioSummary | null;
  performanceChartData!: ChartConfiguration['data'];
  allocationChartData!: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'] = { responsive: true };
  performanceChartType: ChartType = 'line';
  allocationChartType: ChartType = 'doughnut';
  loading = false;

  private unsubscribe$ = new Subject<void>(); 

  constructor(private portfolioService: PortfolioService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.fetchPortfolioData();
  }

  private fetchPortfolioData(): void {
    this.loading = true;
    this.portfolioService.getPortfolioSummary()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(error => {
          this.snackbarService.showErrorMessage("Error fetching portfolio data: " + (error.message || error));
          return [];
        }),
        finalize(() => this.loading = false)
      )
      .subscribe((response:any) => {
        if (response.status === 'success') {
          this.portfolioData = response?.data[0];
          this.snackbarService.showSuccessMessage('Portfolio loaded successfully!');
          this.initCharts(); 
        } else {
          this.portfolioData = null;
        }
      });
  }
  
  private initCharts(): void {
    if (!this.portfolioData) return;

    this.performanceChartData = {
      labels: this.portfolioData.performance.labels,
      datasets: [
        {
          data: this.portfolioData.performance.portfolio,
          label: 'Your Portfolio',
          borderColor: '#3e95cd',
          backgroundColor: 'rgba(62, 149, 205, 0.3)',
          fill: true
        },
        {
          data: this.portfolioData.performance.benchmark,
          label: 'S&P 500',
          borderColor: '#8e5ea2',
          backgroundColor: 'rgba(142, 94, 162, 0.3)',
          fill: true
        }
      ]
    };

    this.allocationChartData = {
      labels: this.portfolioData.allocation.labels,
      datasets: [{
        data: this.portfolioData.allocation.values,
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850']
      }]
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); 
  }
}
