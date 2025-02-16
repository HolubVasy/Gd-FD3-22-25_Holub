import { createContext } from 'react';
import { Product } from '../models/Product';

export interface ShopContextType {
  name: string;
  products: Product[];
}

export const ShopContext = createContext<ShopContextType>({
  name: '',
  products: []
}); 