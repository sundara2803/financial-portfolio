import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { PercentageDirective } from './directives/percentage.directive';

@NgModule({
  declarations: [
    CurrencyFormatPipe,
    PercentageDirective
  ],
  imports: [CommonModule],
  exports: [
    CurrencyFormatPipe,
    PercentageDirective
  ]
})
export class SharedModule { }
