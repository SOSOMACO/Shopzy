import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  ordersList: any[] = [];
  orderToDeleteId: string | null = null;
  isConfirmingDelete: boolean = false;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const storedOrders = localStorage.getItem('customer-orders');
    this.ordersList = storedOrders ? JSON.parse(storedOrders) : [];
  }
  

  confirmDelete(orderId: string) {
    this.orderToDeleteId = orderId; 
    this.isConfirmingDelete = true;
  }
  

  deleteOrder() {

    if (this.orderToDeleteId) {
      
      this.ordersList = this.ordersList.filter(order => order.id !== this.orderToDeleteId);
      localStorage.setItem('customer-orders', JSON.stringify(this.ordersList));
      this.orderToDeleteId = null;
      this.isConfirmingDelete = false;
    }
  }
  

  cancelDelete() {
    this.orderToDeleteId = null; 
    this.isConfirmingDelete = false; 
  }

  calculateOrderTotal(order: any): number {
    return order.items?.reduce((total: number, item: any) => total + (item.productPrice * item.quantity), 0) || 0;
  }

  toggleDetails(order: any) {
    order.showDetails = !order.showDetails;
  }
}
