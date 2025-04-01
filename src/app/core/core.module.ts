import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { PortfolioService } from './services/portfolio.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ]
})
export class CoreModule { }
