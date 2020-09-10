import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../service/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit, OnDestroy {
  productCategories: ProductCategory[];
  private subscriptions: Subscription[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  listProductCategories(): void {
    this.subscriptions.push(
      this.productService.getProductCategories().subscribe(
        response => {
          this.productCategories = response;
        }
      ));
  }
}
