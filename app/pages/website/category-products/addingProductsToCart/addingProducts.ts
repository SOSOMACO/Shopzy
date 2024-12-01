import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'adding-cart',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './addingProducts.html',
  
})
export class addingProductsComponent implements OnChanges{
  @Output() addProductToCart = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

 

  addToCart() {
    this.addProductToCart.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}