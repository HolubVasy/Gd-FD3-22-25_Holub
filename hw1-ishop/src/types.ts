export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface ShopProps {
  name: string;
  products: Product[];
} 