import { useContext, useState } from 'react';
import { ProductsProps } from '../../types';
import CreateBtn from '../createBtn/CreateBtn';
import styles from './table.module.css';
import { GlobalContext } from '../../GlobalContext';
import { handleDelete } from '../../functions/handleDelete';
import { FaSort } from 'react-icons/fa';

function Table() {
    const context = useContext(GlobalContext);
    const { products, refreshProducts, setSelectedProduct, setIsFormOn } = context || {};


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByPrice = () => {
        setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
    };

    const sortedProducts = products ? [...products].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }) : [];

    return (
        <table className={styles.container}>
            <thead className={styles.head}>
                <tr>
                    <th>Produto</th>
                    <th
                        onClick={handleSortByPrice}
                        className={styles.sortableHeader}
                    >
                        Preço <FaSort />
                    </th>
                    <th>Disponível</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className={styles.body}>
                {sortedProducts.map((product: ProductsProps) => (
                    <tr key={product.id}>
                        <td>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                        </td>
                        <td className={styles.price}>${product.price.toFixed(2)}</td>
                        <td>
                            <p className={`${product.isAvailable ? styles.isAvailable : styles.isUnavailable}`}>
                                {product.isAvailable ? "Disponível" : "Indisponível"}
                            </p>
                        </td>
                        <td className={styles.actions}>
                            <button
                                className={styles.editButton}
                                onClick={() => {
                                    setSelectedProduct!(product);
                                    setIsFormOn!(true);
                                }}
                            >
                                Editar
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    if (refreshProducts) {
                                        handleDelete(product.id, refreshProducts);
                                    } else {
                                        console.error("refreshProducts não está definido.");
                                    }
                                }}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                <CreateBtn />
            </tbody>
        </table>
    );
}

export default Table;
