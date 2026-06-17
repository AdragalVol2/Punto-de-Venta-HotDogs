import type { Product } from "../types";

interface ProductCardProps {
    product: Product;
    onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
    return (
        <button
            onClick={onAdd}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden text-left group"
        >
            <div className="h-44 overflow-hidden bg-slate-200">
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                )}
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-slate-800">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    {product.description}
                </p>

                <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-xl text-orange-600">
                        ${product.price}
                    </span>

                    <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm">
                        Agregar
                    </span>
                </div>
            </div>
        </button>
    );
}