import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => this.getProducts()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts(): void {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    this.subscriptions.push(
      this.productService.getProductList(this.currentCategoryId).subscribe(
        (response: Product[]) => {
          this.products = response;
        }
      )
    );
  }

  handleSearchProducts(): void {
    const keyWord = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyWord).subscribe(
      response => this.products = response
    );
  }
}
