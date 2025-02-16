// Класс для товара
export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public image: string,
    public stock: number
  ) {}

  // Метод для проверки наличия товара
  isInStock(): boolean {
    return this.stock > 0;
  }

  // Метод для форматирования цены
  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  // Метод для получения статуса наличия
  getStockStatus(): string {
    if (this.stock > 10) return "Много";
    if (this.stock > 0) return "Мало";
    return "Нет в наличии";
  }
}

// Тип для пропсов компонента Shop
export type ShopProps = {
  name: string;
  products: Product[];
}; 