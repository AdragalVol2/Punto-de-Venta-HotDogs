import { useState } from "react";
import type { CartItem, Ingredient } from "../types";

interface EditItemModalProps {
    item: CartItem;
    onClose: () => void;
    onSave: (oldId: string, ingredients: Ingredient[], comments: string) => void;
}

export default function EditItemModal({ item, onClose, onSave }: EditItemModalProps) {
    const [ingredients, setIngredients] = useState<Ingredient[]>(item.ingredients);
    const [comments, setComments] = useState(item.comments);

    const updateQuantity = (id: number, delta: number) => {
        setIngredients(prev => prev.map(ing => {
            if (ing.id === id) {
                const newQty = Math.max(0, ing.quantity + delta);
                return { ...ing, quantity: newQty };
            }
            return ing;
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Editar {item.product.name}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {/* Lista de ingredientes */}
                    {ingredients.map(ing => (
                        <div key={ing.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                            <span className={`font-medium ${ing.quantity === 0 ? 'text-red-500 line-through' : 'text-slate-700'}`}>
                                {ing.name}
                            </span>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(ing.id, -1)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 font-bold">-</button>
                                <span className="w-4 text-center font-bold">{ing.quantity}</span>
                                <button onClick={() => updateQuantity(ing.id, 1)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 font-bold">+</button>
                            </div>
                        </div>
                    ))}

                    {/* Comentarios extra */}
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Comentarios especiales</label>
                        <textarea
                            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={3}
                            placeholder="Ej. Salchicha bien dorada..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200">
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onSave(item.cartItemId, ingredients, comments);
                            onClose();
                        }}
                        className="flex-1 py-3 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}