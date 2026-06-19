export type Category = 'Todos' | 'Dogos' | 'Complementos' | 'Bebidas';

export interface Ingredient {
    id: number;
    name: string;
    quantity: number; // 0 = Sin, 1 = Normal, 2 = Extra, etc.
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    defaultIngredients: Ingredient[]; //ingredientes base del producto
}

export interface CartItem {
    cartItemId: string; //ID único que combina el producto y sus modificaciones
    product: Product;
    quantity: number;
    ingredients: Ingredient[];
    comments: string;
}