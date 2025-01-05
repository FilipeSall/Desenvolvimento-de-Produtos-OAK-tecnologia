import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import styles from './form.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Form() {
    const context = useContext(GlobalContext);
    const { setIsFormOn, selectedProduct, setSelectedProduct, products, setProducts } = context || {};
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        isAvailable: true
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                isAvailable: selectedProduct.isAvailable,
            });
        }
    }, [selectedProduct]);

    const validate = () => {
        const newErrors = { name: '', description: '', price: '' };

        if (formData.name.length < 3) newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
        if (formData.name.length > 50) newErrors.name = 'O nome deve ter no máximo 50 caracteres';

        if (formData.description.length < 10) newErrors.description = 'A descrição deve ter pelo menos 10 caracteres';
        if (formData.description.length > 500) newErrors.description = 'A descrição deve ter no máximo 500 caracteres';

        if (formData.price < 0.01) newErrors.price = 'O preço deve ser maior que zero';
        if (formData.price > 999999.99) newErrors.price = 'O preço máximo é 999999.99';

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === 'true';
        setFormData(prevData => ({
            ...prevData,
            isAvailable: value,
        }));
    };


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const formattedData = {
                ...formData,
                price: Number(formData.price),
                isAvailable: formData.isAvailable ?? true 
            };

            console.log('Dados formatados:', formattedData); 

            if (selectedProduct) {
                const response = await axios.put(`http://localhost:3001/products/${selectedProduct.id}`, formattedData);
                setProducts!(products!.map(product =>
                    product.id === selectedProduct.id ? response.data.product : product
                ));
                toast.success("Produto atualizado com sucesso!");
            } else {
                const response = await axios.post("http://localhost:3001/products", formattedData);
                setProducts!(prevProducts => [...prevProducts, response.data.product]);
                toast.success("Produto criado com sucesso!");
            }

            setFormData({
                name: '',
                description: '',
                price: 0,
                isAvailable: true
            });
            setSelectedProduct?.(null);
            setIsFormOn?.(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro detalhado:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                toast.error(error.response?.data?.message || `Erro ao ${selectedProduct ? 'atualizar' : 'criar'} produto`);
            } else {
                console.error('Erro não-Axios:', error);
                toast.error(`Erro ao ${selectedProduct ? 'atualizar' : 'criar'} produto. Tente novamente mais tarde.`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        setIsFormOn?.(false);
                        setSelectedProduct?.(null);
                        setFormData({
                            name: '',
                            description: '',
                            price: 0,
                            isAvailable: true
                        });
                    }}
                    disabled={isSubmitting}
                >
                    ×
                </button>

                <h2>{selectedProduct ? 'Editar Produto' : 'Criar Novo Produto'}</h2>

                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome do Produto</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && (
                            <span className={styles.error}>{errors.name}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        {errors.description && (
                            <span className={styles.error}>{errors.description}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price">Preço</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        {errors.price && (
                            <span className={styles.error}>{errors.price}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Produto disponível?</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="isAvailable"
                                    value="true"
                                    defaultChecked={selectedProduct ? selectedProduct.isAvailable === true : true}
                                    onChange={handleRadioChange}
                                />
                                Sim
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="isAvailable"
                                    value="false"
                                    defaultChecked={selectedProduct ? selectedProduct.isAvailable === false : false}
                                    onChange={handleRadioChange}
                                />
                                Não
                            </label>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsFormOn?.(false);
                                setSelectedProduct?.(null);
                                setFormData({
                                    name: '',
                                    description: '',
                                    price: 0,
                                    isAvailable: true
                                });
                            }}
                            className={styles.cancelButton}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitButton}
                        >
                            {isSubmitting
                                ? (selectedProduct ? 'Atualizando...' : 'Criando...')
                                : (selectedProduct ? 'Atualizar Produto' : 'Criar Produto')
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
