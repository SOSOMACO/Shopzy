import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit, OnDestroy {
  cartList: any[] = [];
  loggedInObj: any = {};
  private cartUpdateSubscription: Subscription = new Subscription();

  constructor(private prodSrv: ProductService) {
    this.initializeCart();
  }

  ngOnInit(): void {
    this.cartUpdateSubscription = this.prodSrv.cartUpdated$.subscribe(() => {
      this.getCartByCustomerId(this.loggedInObj.custId);
    });
  }

  ngOnDestroy(): void {
    this.cartUpdateSubscription.unsubscribe();
  }

  initializeCart() {
    const localData = sessionStorage.getItem('bigBasket_user');
    if (localData) {
      this.loggedInObj = JSON.parse(localData);
      this.getCartByCustomerId(this.loggedInObj.custId);
    }
  }
  getCartByCustomerId(custId: number) {
    this.prodSrv.getCartDataByCustId(custId).subscribe((res: any) => {
      if (res.result) {
        this.cartList = res.data;  
        this.updateLocalStorage();
      }
    });
  }
  remove(cartId: number) {
    this.prodSrv.removeProductByCartId(cartId).subscribe(() => {
      this.prodSrv.cartUpdated$.next(true); 
      this.updateLocalStorage();
    });
  }

  calculateTotalSubtotal() {
    return this.cartList.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  }

  increaseQuantity(cart: any) {
    cart.quantity++;
    this.updateLocalStorage();
  }

  decreaseQuantity(cart: any) {
    if (cart.quantity > 1) {
      cart.quantity--;
      this.updateLocalStorage();
    } else {
      this.remove(cart.cartId);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('customer_cart', JSON.stringify(this.cartList));
  }
}
