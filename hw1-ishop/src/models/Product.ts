// Class for product
export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public image: string,
    public stock: number
  ) {}

  // Method to check if the product is in stock
  isInStock(): boolean {
    return this.stock > 0;
  }

  // Method to format the price
  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  // Method to get the stock status
  getStockStatus(): string {
    if (this.stock > 10) return "Много";
    if (this.stock > 0) return "Мало";
    return "Нет в наличии";
  }
} 