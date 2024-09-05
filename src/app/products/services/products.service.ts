import { Injectable, inject } from '@angular/core';
import { toListSignal } from '@xl/shared/helpers/signal-helper';
import { catchError, of } from 'rxjs';
import { ApiProductResponse, ProductsApiService } from '@xl/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsApiService = inject(ProductsApiService);

  getProducts() {
    return toListSignal(this.productsApiService.getProductList()
      .pipe(
        catchError(() => of(orders))
      ));
  }

}

const orders: ApiProductResponse[] = [
  { productId: 1, productName: 'First Order', available: true }
];
