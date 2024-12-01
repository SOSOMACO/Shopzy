import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable, Subject, map, retry, take, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class ProductService {

  constructor(private http: HttpClient) { }
// used to notify when the cart is updated
  public cartUpdated$: Subject<boolean> = new Subject();

// Fetches a list of product categories
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }

// Creates a new product category   
  createCategory(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.CREATE_NEW_CATEGORY, obj);
  }

// Fetches products by a specific ID
  getProductsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT_BY_CATEGORY + id);
  }

// Fetches all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT);
  }

// Fetches the details of a single product
  getProductById(productId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_PRODUCT_BY_ID + productId);
  }

// Saves (creates) a new product
  saveProduct(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT, obj);
  }

// Updates an existing product
  updateProduct(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT, obj);
  }

// Deletes a product
  deleteProduct(id: any): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + id);
  }

// Deletes a Category
  deleteCategory(id: any): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.DELETE_CATEGORY + id);
  }

// Adds a product to the user's cart
  addToCart(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART, obj);
  }

// Fetches cart data for a specific customer
  getCartDataByCustId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CART_BY_CUST + custId);
  }

// Removes a product from the cart
  removeProductByCartId(cartId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.REMOVE_CART + cartId);
  }

// Places an order
  placeOrder(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.PLACE_ORDER, obj);
  }

// Fetches all available offers
  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_OFFERS).pipe(map((res: any) => res.data));
  }

// Creates a new offer
  createNewOffer(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.CREATE_NEW_OFFER, obj)
  }

// Fetches customer details 
  getCustomerById(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CUSTOMER_BY_ID + custId);
  }

// Updates the customer's profile info
  updateProfile(obj: any): Observable<any> {
    return this.http.put<any>(Constant.API_END_POINT + Constant.METHODS.UPDATE_PROFILE, obj);
  }

// Fetches all sales records for a specific customer
  getAllSalesByCustomerId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_SALE_BY_CUSTOMER_ID + custId);
  }

// Cancels an order based on its sale ID
  cancelOrder(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.CANCEL_ORDER_BY_SALE_ID + saleId);
  }

// Opens a sale record based on its sale ID
  openSaleBySaleId(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.OPEN_SALE_BY_SALE_ID + saleId);
  }
}