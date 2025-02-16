import { Product } from '../../models/Product';

export const shopData = {
  name: "MyShop",
  products: [
    new Product(
      1,
      "Ноутбук",
      999.99,
      "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      5
    ),
    new Product(
      2,
      "Смартфон",
      499.99,
      "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      8
    ),
    new Product(
      3,
      "Наушники",
      99.99,
      "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      15
    ),
    new Product(
      4,
      "Планшет",
      299.99,
      "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      3
    )
  ]
}; 