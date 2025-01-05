export interface ProductsProps {
    id: string,
    name: string,
    description: string,
    price: number,
    isAvailable: boolean
}

export interface FormProps {
    onSuccess?: () => void;
}
