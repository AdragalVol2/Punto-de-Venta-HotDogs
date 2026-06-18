import { useCart } from "../hooks/useCart";
import { products } from "../data/mockProducts";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";

export default function POS() {
    const { cart, addToCart, updateCartItem, removeItem, clearCart, total } = useCart();

    const handleCheckout = () => {
        alert('¡Venta registrada con éxito!');
        clearCart();
    };

    return (
        <div className="h-screen bg-slate-100 flex overflow-hidden">

            {/* ZONA DE PRODUCTOS */}
            <div className="w-2/3 p-6 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Dogos Chema</h1>
                    <p className="text-slate-500">Selecciona los productos para agregar al pedido</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}

                            onAdd={() => addToCart(product, undefined, "")}
                        />
                    ))}
                </div>
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