import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../../shared/components/card/card.component';
import { addingProductsComponent } from './addingProductsToCart/addingProducts';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,addingProductsComponent],
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'] // Corrected the typo from "styleUrl" to "styleUrls"
})
export class CategoryProductsComponent implements OnInit {
  productList: any[] = [];
  categoryList: any[] = [];
  filterdProducts: any[] = [];
  productId: string | null = null; // Changed type to match expected param type
  loggedInObj: any = {};
  isAddToCartApiCallInProgress: boolean = false;

  // Inject ProductService and ActivatedRoute
  constructor(private prodSrv: ProductService, private route: ActivatedRoute,private router: Router, private toastr: ToastrService) {
    const localData = sessionStorage.getItem('bigBasket_user');
    if (localData !== null) {
      const parseObj = JSON.parse(localData);
      this.loggedInObj = parseObj;
    }
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductIdFromRoute();
  }

  getAllProducts(): void {
    this.prodSrv.getProducts().subscribe((res: any) => {
      this.filterdProducts = res.data.filter((list: any) => list.categoryId === Number(this.productId)); // Ensure categoryId matches the productId
      console.log(this.filterdProducts);
      this.productList = this.filterdProducts; // Assign the filtered products
    

    });
  }

  getProductIdFromRoute(): void {
    // Subscribe to the paramMap observable to get the id
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // Get the route parameter 'id'
      
    });
  }
  addToCart(product: any) {
    const localData = sessionStorage.getItem('bigBasket_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      const addToCartObj = {
        "cartId": 0,
        "custId": this.loggedInObj.custId,
        "productId": product.productId,
        "quantity": product.quantity || 1,
        "addedDate": new Date()
      };
      if (!product.isAddToCartApiCallInProgress) {
        product.isAddToCartApiCallInProgress = true;
        this.prodSrv.addToCart(addToCartObj).subscribe((res: any) => {
          if (res.result) {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.success("Product Added to cart");
            this.prodSrv.cartUpdated$.next(true);
          } else {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.error(res.message ? res.message : "Error adding product to cart");
          }
        },
          (err: any) => {
            product.isAddToCartApiCallInProgress = false;
            this.toastr.error(err.message ? err.message : "An error occurred while adding the product to the cart. Please try again later.");
          });
      }
    } else {
      this.toastr.warning("Please Login To Add Product");
    }
  }

 








  
}
