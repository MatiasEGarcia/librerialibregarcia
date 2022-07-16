import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { getBooks } from '../services/firebase/firestore';

const ItemListContainer = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();

    useEffect(() => {
            setLoading(true);

            getBooks(categoryName).then((booksFormatted)=>{
                setBooks(booksFormatted);
            }).catch(error=>{
                console.log(error);
            }).finally(()=>{
                setLoading(false)
            })
  
    }, [categoryName]) 

    if(loading){
        return(
            <h2>Cargando ...</h2>
        )
    }


    return (
        <div className='container itemListContainer'>
            {books.length > 0 ? <ItemList books={books} item="item"/> : <h2>No hay libros</h2>}
        </div>
    )
};

export default ItemListContainer;

