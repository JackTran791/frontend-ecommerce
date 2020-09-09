import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {GetProductResponse} from '../common/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public host: string = environment.host;
  private pageSize: number;

  constructor(private httpClient: HttpClient) {
  }

  getProductList(): Observable<Product[]> {
    this.pageSize = 100;
    return this.httpClient.get<GetProductResponse>(`${this.host}/api/products?size=${this.pageSize}`).pipe(
      map(response => response._embedded.products)
    );
  }
}


