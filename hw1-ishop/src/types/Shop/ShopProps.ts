import { Product } from '../../models/Product';

// Type for the props of the Shop component
export type ShopProps = {
  name: string;
  products: Product[];
}; 