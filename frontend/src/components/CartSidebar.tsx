import { useState } from "react";
import type { CartItem, Ingredient } from "../types";
import EditItemModal from "./EditItemModal";

interface CartSidebarProps {
    cart: CartItem[];
    total: number;
    onRemove: (id: string) => void;
    onUpdateItem: (oldId: string, ingredients: Ingredient[], comments: string) => void;
}

export default function CartSidebar({ cart, total, onRemove, onUpdateItem }: CartSidebarProps) {
    const [editingItem, setEditingItem] = useState<CartItem | null>(null);

    return (
        <div className="w-1/3 bg-white border-l border-slate-200 flex flex-col relative">
            {/* Modal condicional */}
            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                    onSave={onUpdateItem}
                />
            )}

            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">🛒 Pedido</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-400">No hay productos agregados</div>
                ) : (
                    <div className="space-y-3">
                        {cart.map((item) => (
                            <div key={item.cartItemId} className="bg-slate-50 rounded-xl p-3 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 pr-2">
                                        <h4 className="font-bold text-slate-800">{item.product.name}</h4>

                                        {/* modificaciones de ingredientes */}
                                        <div className="text-sm text-slate-500 mt-1">
                                            {item.ingredients.map(ing => {
                                                if (ing.quantity === 0) return <p key={ing.id} className="text-red-500">- Sin {ing.name.toLowerCase()}</p>;
                                                if (ing.quantity > 1) return <p key={ing.id} className="text-orange-500">+ Extra {ing.name.toLowerCase()} (x{ing.quantity})</p>;
                                                return null;
                                            })}
                                            {item.comments && <p className="italic mt-1 text-slate-600">"{item.comments}"</p>}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-orange-600">${item.product.price * item.quantity}</p>
                                        <p className="text-xs text-slate-400">${item.product.price} c/u</p>
                                    </div>
                                </div>

                                <div className="mt-3 flex justify-between items-center border-t border-slate-200 pt-2">
                                    <span className="font-medium text-sm text-slate-600">Cant: {item.quantity}</span>

                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingItem(item)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 px-2">
                                            Editar
                                        </button>
                                        <button onClick={() => onRemove(item.cartItemId)} className="text-sm font-semibold text-red-500 hover:text-red-700 px-2">
                                            Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t p-5 bg-white">
                <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition shadow-md hover:shadow-lg">
                    Cobrar Pedido
                </button>
            </div>
        </div>
    );
}