import {ProductCategory} from './product-category';

export interface GetProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
