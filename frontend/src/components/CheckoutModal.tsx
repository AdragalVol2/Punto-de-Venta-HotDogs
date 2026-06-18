import { useState } from "react";

interface CheckoutModalProps {
    total: number;
    onClose: () => void;
    onConfirm: () => void;
}

export default function CheckoutModal({ total, onClose, onConfirm }: CheckoutModalProps) {
    const [method, setMethod] = useState<'efectivo' | 'tarjeta'>('efectivo');
    const [receivedAmount, setReceivedAmount] = useState<number | ''>('');

    const change = typeof receivedAmount === 'number' ? receivedAmount - total : 0;

    // El pago es válido si es con tarjeta, o si es efectivo y nos dieron igual o más dinero que el total
    const isPaymentValid = method === 'tarjeta' || (typeof receivedAmount === 'number' && receivedAmount >= total);

    const handleQuickBill = (amount: number) => {
        setReceivedAmount(amount);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Completar Pago</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>
                </div>

                <div className="text-center mb-6 bg-orange-50 py-4 rounded-xl border border-orange-100">
                    <p className="text-orange-600 font-semibold mb-1">Total a cobrar</p>
                    <p className="text-4xl font-bold text-orange-600">${total}</p>
                </div>

                {/* Métodos de pago */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setMethod('efectivo')}
                        className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${method === 'efectivo' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                    >
                        💵 Efectivo
                    </button>
                    <button
                        onClick={() => setMethod('tarjeta')}
                        className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${method === 'tarjeta' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                    >
                        💳 Tarjeta
                    </button>
                </div>

                {/* Lógica si es efectivo */}
                {method === 'efectivo' && (
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Monto recibido</label>
                            <input
                                type="number"
                                className="w-full border-2 border-slate-200 rounded-xl p-3 text-xl font-bold focus:outline-none focus:border-orange-500"
                                placeholder="0.00"
                                value={receivedAmount}
                                onChange={(e) => setReceivedAmount(e.target.value ? Number(e.target.value) : '')}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => handleQuickBill(total)} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg font-semibold text-slate-700">Exacto</button>
                            <button onClick={() => handleQuickBill(100)} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg font-semibold text-slate-700">$100</button>
                            <button onClick={() => handleQuickBill(200)} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg font-semibold text-slate-700">$200</button>
                            <button onClick={() => handleQuickBill(500)} className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg font-semibold text-slate-700">$500</button>
                        </div>

                        {typeof receivedAmount === 'number' && (
                            <div className={`flex justify-between items-center p-4 rounded-xl font-bold text-lg ${change >= 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'
                                }`}>
                                <span>Cambio a devolver:</span>
                                <span>${change >= 0 ? change : 0}</span>
                            </div>
                        )}
                    </div>
                )}

                {method === 'tarjeta' && (
                    <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-xl border border-blue-200 text-center font-medium">
                        Cobra ${total} en la terminal y confirma aquí abajo.
                    </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!isPaymentValid}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${isPaymentValid ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        Confirmar Venta
                    </button>
                </div>
            </div>
        </div>
    );
}