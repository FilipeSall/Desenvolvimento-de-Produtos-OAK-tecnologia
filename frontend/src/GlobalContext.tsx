import { createContext, Dispatch, ReactNode, useCallback, useEffect, useState } from "react";
import { ProductsProps } from "./types";
import axios from "axios";

interface GlobalContextProps {
    isFormOn: boolean;
    setIsFormOn: Dispatch<React.SetStateAction<boolean>>;
    products: ProductsProps[];
    setProducts: Dispatch<React.SetStateAction<ProductsProps[]>>;
    refreshProducts: () => Promise<void>;
    loading: boolean;
    error: string | null;
    selectedProduct: ProductsProps | null; 
    setSelectedProduct: Dispatch<React.SetStateAction<ProductsProps | null>>;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isFormOn, setIsFormOn] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductsProps | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:3001/products");
            setProducts(response.data.products);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Ops... Algo deu errado! Tente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refreshProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/products");
            setProducts(response.data.products);
            console.log("Produtos atualizados:", response.data.products); 
        } catch (error) {
            console.error("Erro ao atualizar produtos:", error);
        }
    }, []);

    const value = {
        isFormOn,
        setIsFormOn,
        products,
        setProducts,
        refreshProducts,  
        loading,
        error,
        selectedProduct,
        setSelectedProduct
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
