import { useState, useEffect } from "react";
import type { Product } from "../types";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Asegúrate de que este puerto sea exactamente el que te dio tu terminal de .NET
        fetch("http://localhost:5265/api/products")
            .then((res) => {
                if (!res.ok) throw new Error("Error al conectar con el servidor");
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudieron cargar los productos.");
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
}