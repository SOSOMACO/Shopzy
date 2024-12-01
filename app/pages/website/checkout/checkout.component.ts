import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartList: any[] = [];
  shippingFee: number = 50;
  totalPrice: number = 0;
  selectedPaymentMethod: string = ''; 
  checkoutForm: FormGroup;
  paymentMethodError: boolean = false; 
  isOnlinePaymentSelected: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    
    this.checkoutForm = this.fb.group({
      id: this.generateUniqueId(),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      country: ['Egypt', Validators.required],
      streetNumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      cardNumber: [''],
      cardHolderName: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cvv: ['']
    });
  }
  generateUniqueId(): string {
    return 'order_' + Math.random().toString(36).substr(2, 9);
  }
  ngOnInit(): void {
    this.getCartDataFromLocalStorage();
    this.calculateTotalPrice();
  }

  getCartDataFromLocalStorage() {
    const cartData = localStorage.getItem('customer_cart');
    if (cartData) {
      this.cartList = JSON.parse(cartData);
    }
  }

  calculateTotalPrice() {
    const subtotal = this.cartList.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    this.totalPrice = subtotal + this.shippingFee;
  }

 
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    this.paymentMethodError = false;

    if (method === 'Online') {
      this.isOnlinePaymentSelected = true;

      this.checkoutForm.get('cardNumber')?.setValidators([Validators.required,Validators.pattern('^5[0-9]{15}$')]);
      this.checkoutForm.get('cardHolderName')?.setValidators([Validators.required,Validators.pattern('^[A-Z]+$')]);
      this.checkoutForm.get('expiryMonth')?.setValidators([Validators.required,Validators.pattern('^(0[1-9]|1[0-2])$')]);
      this.checkoutForm.get('expiryYear')?.setValidators([Validators.required,Validators.pattern('^[0-9]{2}$')]);
      this.checkoutForm.get('cvv')?.setValidators([Validators.required,Validators.pattern('^[0-9]{3}$')]);
    } else {
      this.isOnlinePaymentSelected = false;

      this.checkoutForm.get('cardNumber')?.clearValidators();
      this.checkoutForm.get('cardHolderName')?.clearValidators();
      this.checkoutForm.get('expiryMonth')?.clearValidators();
      this.checkoutForm.get('expiryYear')?.clearValidators();
      this.checkoutForm.get('cvv')?.clearValidators();
    }

    this.checkoutForm.get('cardNumber')?.updateValueAndValidity();
    this.checkoutForm.get('cardHolderName')?.updateValueAndValidity();
    this.checkoutForm.get('expiryMonth')?.updateValueAndValidity();
    this.checkoutForm.get('expiryYear')?.updateValueAndValidity();
    this.checkoutForm.get('cvv')?.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.selectedPaymentMethod) {
      this.paymentMethodError = true; 
      return;
    }
    this.calculateTotalPrice();
    if (this.checkoutForm.valid) {
      const orderData = {
        ...this.checkoutForm.value,
        items: this.cartList, 
        totalPrice: this.totalPrice 
      };
      const existingOrders = JSON.parse(localStorage.getItem('customer-orders') || '[]');
      existingOrders.push(orderData); 
      localStorage.setItem('customer-orders', JSON.stringify(existingOrders));
      this.router.navigate(['/order-history']);
    } else {
      Object.keys(this.checkoutForm.controls).forEach(field => {
        const control = this.checkoutForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }

  }
}