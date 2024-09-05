import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterPageDirective } from '@xl/shared/components/filterPage/filter-page.directive';
import { ApiProductResponse } from '@xl/api';
import { TableModule } from '@xl/shared/components/table/table.module';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'xl-product-management',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProductManagementComponent extends FilterPageDirective<ApiProductResponse> {

  private productsService = inject(ProductsService);

  data = this.productsService.getProducts();

  getColumns() {
    return [
      { label: 'Id' },
      { label: 'Product' },
      { label: 'Available' },
      { label: '' },
    ];
  }
}
