import {Product} from './product';

export interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
}
