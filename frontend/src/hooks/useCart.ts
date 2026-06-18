import { useState } from "react";
import type { Product, CartItem, Ingredient } from "../types";

// Genera un string único basado en la configuración. Ejemplo: "1-1:1|2:0|3:1-sin mostaza"
const generateCartItemId = (productId: number, ingredients: Ingredient[], comments: string) => {
    const configString = ingredients.map(i => `${i.id}:${i.quantity}`).join('|');
    return `${productId}-${configString}-${comments}`;
};

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product, customIngredients?: Ingredient[], comments: string = "") => {
        const ingredientsToUse = customIngredients || product.defaultIngredients;
        const cartItemId = generateCartItemId(product.id, ingredientsToUse, comments);

        setCart((prev) => {
            const exists = prev.find((item) => item.cartItemId === cartItemId);

            if (exists) {
                return prev.map((item) =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, {
                cartItemId,
                product,
                quantity: 1,
                ingredients: ingredientsToUse,
                comments
            }];
        });
    };

    const updateCartItem = (oldCartItemId: string, newIngredients: Ingredient[], newComments: string) => {
        setCart((prev) => {
            const itemToUpdate = prev.find(item => item.cartItemId === oldCartItemId);
            if (!itemToUpdate) return prev;

            const newCartItemId = generateCartItemId(itemToUpdate.product.id, newIngredients, newComments);

            if (newCartItemId === oldCartItemId) return prev;

            let updatedCart = [...prev];

            if (itemToUpdate.quantity > 1) {
                updatedCart = updatedCart.map(item =>
                    item.cartItemId === oldCartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                updatedCart = updatedCart.filter(item => item.cartItemId !== oldCartItemId);
            }

            const existingIdenticalItem = updatedCart.find(item => item.cartItemId === newCartItemId);

            if (existingIdenticalItem) {
                return updatedCart.map(item =>
                    item.cartItemId === newCartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...updatedCart, {
                    cartItemId: newCartItemId,
                    product: itemToUpdate.product,
                    quantity: 1,
                    ingredients: newIngredients,
                    comments: newComments
                }];
            }
        });
    };

    const removeItem = (cartItemId: string) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return {
        cart,
        addToCart,
        updateCartItem,
        clearCart,
        removeItem,
        total,
    };


}