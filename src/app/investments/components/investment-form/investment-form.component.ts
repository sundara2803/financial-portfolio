import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../../core/services/portfolio.service';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss']
})
export class InvestmentFormComponent {
  investmentForm!: FormGroup;
  assetTypes = ['Stock', 'Bond', 'ETF', 'Mutual Fund', 'Real Estate', 'Crypto'];
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService) {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      assetName: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required, Validators.min(0.01)]],
      purchasePrice: ['', [Validators.required, Validators.min(0.01)]],
      purchaseDate: ['', [Validators.required]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {
      const investment = this.investmentForm.value;
  
      this.portfolioService.addInvestment(investment).subscribe({
        next: (response) => {
          console.log('Investment added:', response);
          this.investmentForm.reset();
        },
        error: (error) => {
          console.error('Error adding investment:', error);
        }
      });
  
    } else {
      this.markFormGroupTouched(this.investmentForm);
    }
  }
  

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
