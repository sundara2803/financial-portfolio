import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss']
})
export class InvestmentFormComponent {
  @Output() formSubmit = new EventEmitter<Investment>();
  investmentForm: FormGroup;
  assetTypes = ['Stock', 'Bond', 'ETF', 'Mutual Fund', 'Real Estate', 'Crypto'];
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {
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
      this.formSubmit.emit(this.investmentForm.value);
      this.investmentForm.reset();
    } else {
      this.markFormGroupTouched(this.investmentForm);
    }
  }

  onReview(): void {
    if (this.investmentForm.valid) {
      this.formSubmit.emit(this.investmentForm.value);
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