import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPercentage]'
})

export class PercentageDirective implements OnInit {
  @Input() appPercentage!: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const color = this.appPercentage >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = this.appPercentage >= 0 ? '+' : '';
    this.el.nativeElement.classList.add(color);
    this.el.nativeElement.textContent = `${sign}${this.appPercentage.toFixed(2)}%`;
  }
}