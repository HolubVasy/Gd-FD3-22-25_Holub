import { type Product } from './components/shop/Shop';

export const shopData = {
  name: "Electronics Store",
  products: [
    { id: 1, name: "Laptop", price: 999.99, url: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200", stock: 5 },
    { id: 2, name: "Smartphone", price: 499.99, url: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 12 },
    { id: 3, name: "Headphones", price: 79.99, url: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 8 },
    { id: 4, name: "Mouse", price: 29.99, url: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 15 },
    { id: 5, name: "Keyboard", price: 59.99, url: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 7 },
    { id: 6, name: "Monitor", price: 299.99, url: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 4 },
    { id: 7, name: "Tablet", price: 399.99, url: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 10 },
    { id: 8, name: "Printer", price: 199.99, url: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 3 },
    { id: 9, name: "Speakers", price: 89.99, url: "https://images.pexels.com/photos/157557/pexels-photo-157557.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 9 },
    { id: 10, name: "Webcam", price: 49.99, url: "https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&w=200", stock: 6 }
  ] as Product[]
}; 