import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestmentsComponent } from './investments.component';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: InvestmentsComponent }])
  ]
})
export class InvestmentsModule { }
