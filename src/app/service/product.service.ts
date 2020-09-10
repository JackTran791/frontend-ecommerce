import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {GetProductResponse} from '../common/product-response';
import {Router} from '@angular/router';
import {ProductCategory} from '../common/product-category';
import {GetProductCategoryResponse} from '../common/product-category-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public host: string = environment.host;
  private pageSize: number;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getProductList(categoryId: number): Observable<Product[]> {
    this.pageSize = 100;
    const searchUrl = `${this.host}/api/products/search/findByCategoryId?id=${categoryId}&size=${this.pageSize}`;
    return this.pullProducts(searchUrl);
  }

  private pullProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(keyWord: string): Observable<Product[]> {
    const searchUrl = `${this.host}/api/products/search/findByNameContaining?name=${keyWord}`;
    return this.pullProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = `${this.host}/api/product-category`;
    return this.httpClient.get<GetProductCategoryResponse>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}


