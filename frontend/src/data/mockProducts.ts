import type { Product } from "../types";

export const products: Product[] = [
    {
        id: 1,
        name: "Hot Dog Clásico",
        description: "Salchicha, tomate, cebolla y aderezos.",
        price: 55,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
        category: "Dogos",
        defaultIngredients: [
            { id: 1, name: "Salchicha", quantity: 1 },
            { id: 2, name: "Tomate", quantity: 1 },
            { id: 3, name: "Cebolla", quantity: 1 },
            { id: 4, name: "Mayonesa", quantity: 1 },
        ]
    },
    {
        id: 2,
        name: "Hot Dog Especial",
        description: "Tocino, queso cheddar y jalapeños.",
        price: 75,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
        category: "Dogos",
        defaultIngredients: [
            { id: 1, name: "Salchicha", quantity: 1 },
            { id: 5, name: "Tocino", quantity: 1 },
            { id: 6, name: "Queso Cheddar", quantity: 1 },
            { id: 7, name: "Jalapeños", quantity: 1 },
        ]
    },
    {
        id: 3,
        name: "Papas Francesas",
        description: "Porción grande.",
        price: 45,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
        category: "Complementos",
        defaultIngredients: []
    },
    {
        id: 4,
        name: "Refresco",
        description: "600 ml.",
        price: 30,
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500",
        category: "Bebidas",
        defaultIngredients: []
    },
    {
        id: 5,
        name: "Agua de Jamaica",
        description: "Medio litro, natural.",
        price: 25,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500",
        category: "Bebidas",
        defaultIngredients: []
    },
    {
        id: 6,
        name: "Papas Gajo",
        description: "Sazonadas con paprika.",
        price: 55,
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500",
        category: "Complementos",
        defaultIngredients: []
    }
];