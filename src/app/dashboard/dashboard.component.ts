import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../core/services/portfolio.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  portfolioData: any;
  performanceChartData!: ChartConfiguration['data'];
  allocationChartData!: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'] = { responsive: true };
  performanceChartType: ChartType = 'line';
  allocationChartType: ChartType = 'doughnut';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioSummary().subscribe(data => {
      this.portfolioData = data;
      this.initCharts();
    });
  }

  private initCharts(): void {
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
        backgroundColor: [
          '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'
        ]
      }]
    };
  }
}