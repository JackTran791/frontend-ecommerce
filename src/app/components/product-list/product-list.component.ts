import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.productService.getProductList().subscribe(
        (response: Product[]) => {
          this.products = response;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
