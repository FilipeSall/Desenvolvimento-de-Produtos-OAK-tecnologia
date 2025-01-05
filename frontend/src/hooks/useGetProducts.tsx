import axios from "axios";
import { useCallback, useEffect, useState } from "react"

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:3001/products");
            setProducts(response.data.products);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Ops...Algo deu errado! Tente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Função que força uma nova requisição
    const refreshProducts = async () => {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data.products);
    };

    return { products, loading, error, refreshProducts };
};