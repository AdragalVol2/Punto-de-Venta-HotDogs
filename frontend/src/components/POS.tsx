import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { products } from "../data/mockProducts";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import type { Category } from "../types";

const CATEGORIES: Category[] = ['Todos', 'Dogos', 'Complementos', 'Bebidas'];

export default function POS() {
    const { cart, addToCart, updateCartItem, removeItem, clearCart, total } = useCart();

    const [activeCategory, setActiveCategory] = useState<Category>('Todos');

    const handleCheckout = () => {
        alert('¡Venta registrada con éxito!');
        clearCart();
    };

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(product => product.category === activeCategory);

    return (
        <div className="h-screen bg-slate-100 flex overflow-hidden">

            {/* ZONA DE PRODUCTOS */}
            <div className="w-2/3 p-6 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Dogos Chema</h1>
                    <p className="text-slate-500">Selecciona los productos para agregar al pedido</p>
                </div>
                {/* 3. BARRA DE CATEGORÍAS */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${activeCategory === category
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* 4. CUADRÍCULA DE PRODUCTOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={() => addToCart(product, undefined, "")}
                        />
                    ))}
                </div>

                {/* Mensaje por si una categoría se queda sin productos */}
                {filteredProducts.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-slate-400 mt-10">
                        No hay productos en esta categoría.
                    </div>
                )}
            </div>

            {/* CARRITO LATERAL */}
            <CartSidebar
                cart={cart}
                total={total}
                onRemove={removeItem}
                onUpdateItem={updateCartItem}
                onCheckout={handleCheckout}
            />

        </div>
    );
}