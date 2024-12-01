import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingComponent } from './pages/website/landing/landing.component';
import { CategoryProductsComponent } from './pages/website/category-products/category-products.component';
import { WebProductsComponent } from './pages/website/web-products/web-products.component';
import { CheckoutComponent } from './pages/website/checkout/checkout.component';
import { CustomerOrdersComponent } from './pages/website/customer-orders/customer-orders.component';
import { authGuard } from './shared/guards/auth.guard';
import { CustomerCartComponent } from './pages/website/customer-cart/customer-cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'AllProducts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'AllProducts',
        component: WebProductsComponent,
        title: 'All-Products'
      },
      {
        path: 'products/:id',
        component: CategoryProductsComponent
      },
      {
        path: 'customer-cart',
        component: CustomerCartComponent,
      },
      {
        path: 'order-history',
        component: CustomerOrdersComponent,
        canActivate: [authGuard],
        title: 'Your Orders'
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
        title: 'Checkout'
      },
      {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: 'products',
            component: ProductsComponent,
            canActivate: [authGuard],
            title: 'Products'
          },
          {
            path: 'category',
            component: CategoriesComponent,
            title: 'Category'
          },
        ]
      }
    ]
  },




];
