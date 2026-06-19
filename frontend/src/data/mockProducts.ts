import type { Product } from "../types";

export const products: Product[] = [
    {
        id: 1,
        name: "Hot Dog Clásico",
        description: "Salchicha, tomate, cebolla y aderezos.",
        price: 55,
        image: "",
        category: 'Dogos',
        defaultIngredients: [
            { id: 1, name: "Salchicha", quantity: 1 },
            { id: 2, name: "Tomate", quantity: 1 },
            { id: 3, name: "Cebolla", quantity: 1 },
            { id: 4, name: "Mayonesa", quantity: 1 },
        ]
    },
];