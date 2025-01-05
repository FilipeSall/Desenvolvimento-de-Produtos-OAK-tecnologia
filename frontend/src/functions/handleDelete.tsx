import axios from "axios";

export const handleDelete = async (id: string, refreshProducts: () => Promise<void>) => {
    try {
        await axios.delete(`http://localhost:3001/products/${id}`);
        await refreshProducts(); 
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        throw new Error("Erro ao deletar o produto. Tente novamente mais tarde.");
    }
};
