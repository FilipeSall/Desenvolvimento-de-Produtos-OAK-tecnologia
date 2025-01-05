import { useContext } from 'react'
import styles from './createbtn.module.css'
import { GlobalContext } from '../../GlobalContext'

function CreateBtn() {

    const provider = useContext(GlobalContext);

    const { setIsFormOn } = provider || {};

    if (!setIsFormOn) return <p>Error ao buscar dados globais</p>

    return (
        <tr>
            <td colSpan={4} className={styles.newProductCell}>
                <button className={styles.newProductButton} onClick={() => setIsFormOn(true)}>
                    Criar novo produto
                </button>
            </td>
        </tr>
    )
}

export default CreateBtn