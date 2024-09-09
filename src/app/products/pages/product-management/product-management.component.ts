import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiProductResponse } from '@xl/api';
import { ProductsService } from '../../services/products.service';
import { TableModule } from '@xl/shared/features/table/table.module';
import { TableBase } from '@xl/shared/components/filter-page/table-base.directive';

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
export default class ProductManagementComponent extends TableBase<ApiProductResponse> {

  private productsService = inject(ProductsService);

  override data = this.productsService.getProducts();

  override getColumns() {
    return [
      { label: 'Id' },
      { label: 'Product' },
      { label: 'Available' }
    ];
  }

}
