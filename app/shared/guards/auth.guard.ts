import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAdmin = sessionStorage.getItem('isAdmin');
  const bigBasketUser = sessionStorage.getItem('bigBasket_user');

  if ((state.url.startsWith('/products') || state.url.startsWith('/category')) && isAdmin === 'true') {
    return true;
  }
  if ((state.url.startsWith('/products') || state.url.startsWith('/category')) && bigBasketUser && isAdmin !== 'true') {
    router.navigate(['/AllProducts']);
    return false;
  }
  if (!state.url.startsWith('/products') && !state.url.startsWith('/category') && (isAdmin === 'true' || bigBasketUser)) {
    return true;
  }
  router.navigate(['/AllProducts']);
  return false;
};