import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Investment } from '../../../core/models/investment.model';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss']
})
export class InvestmentFormComponent {
  investmentForm!: FormGroup;
  assetTypes = ['Stock', 'Bond', 'ETF', 'Mutual Fund', 'Real Estate', 'Crypto'];
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService, private snackbarService: SnackbarService) {
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
      const investment: Investment = this.investmentForm.value;

      this.portfolioService.addInvestment(investment).subscribe({
        next: (response) => {
          if(response.status === 'success'){
            this.snackbarService.showSuccessMessage('Investment added: ' + response?.data?.assetName);
            this.investmentForm.reset();
          }
        },
        error: (error) => {
          this.snackbarService.showErrorMessage('Error adding investment: ' + (error.message || error));
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
