// 1. Agregamos las categorías permitidas
export type Category = 'Todos' | 'Dogos' | 'Complementos' | 'Bebidas';

export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    defaultIngredients: Ingredient[];
}

export interface CartItem {
    cartItemId: string;
    product: Product;
    quantity: number;
    ingredients: Ingredient[];
    comments: string;
}