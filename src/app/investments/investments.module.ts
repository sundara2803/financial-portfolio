import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestmentsComponent } from './investments.component';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { 
    path: '', 
    component: InvestmentsComponent,
    children: [
      { path: 'new', component: InvestmentFormComponent }
    ]
  }
];

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InvestmentsModule { }
