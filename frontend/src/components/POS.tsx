import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import type { Category } from "../types";

const CATEGORIES: Category[] = ['Todos', 'Dogos', 'Complementos', 'Bebidas'];

export default function POS() {
    // 1. Extraemos todo del carrito, incluyendo la función para limpiarlo
    const { cart, addToCart, updateCartItem, removeItem, clearCart, total } = useCart();

    // 2. Extraemos los productos reales de tu backend en .NET
    const { products, loading, error } = useProducts();

    // 3. Estado para manejar la categoría seleccionada
    const [activeCategory, setActiveCategory] = useState<Category>('Todos');

    // 4. Función que se ejecuta al confirmar el cobro en el modal
    const handleCheckout = () => {
        alert('¡Venta registrada con éxito!');
        clearCart();
    };

    // 5. Filtramos los productos según la categoría activa
    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(product => product.category === activeCategory);

    return (
        <div className="h-screen bg-slate-100 flex overflow-hidden">

            {/* ZONA DE PRODUCTOS */}
            <div className="w-2/3 p-6 overflow-y-auto flex flex-col">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Dogos Chema</h1>
                    <p className="text-slate-500">Selecciona los productos para agregar al pedido</p>
                </div>

                {/* BARRA DE CATEGORÍAS */}
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

                {/* MANEJO DE ESTADOS (Cargando / Error) */}
                {loading && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-xl font-semibold text-slate-500">Cargando menú desde el servidor...</p>
                    </div>
                )}

                {error && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-xl font-semibold text-red-500">{error}</p>
                    </div>
                )}

                {/* CUADRÍCULA DE PRODUCTOS */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={() => addToCart(product, undefined, "")}
                            />
                        ))}
                    </div>
                )}

                {/* MENSAJE SI LA CATEGORÍA ESTÁ VACÍA */}
                {!loading && !error && filteredProducts.length === 0 && (
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