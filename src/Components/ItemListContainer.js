import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import{collection,getDocs,query,where} from 'firebase/firestore';

const ItemListContainer = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();

    useEffect(() => {
            setLoading(true);

            const collectionRef=categoryName ? 
                query(collection(db, 'books'),where('category','array-contains-any', [categoryName] ) ) /*obtengo documentos que tengan ese nombre de categoria en el array category*/
                : (collection(db,'books'));

            //peticion asincrona al firestore    
            getDocs(collectionRef).then(response => {
                const booksFormatted = response.docs.map(doc => {
                    return{id: doc.id , ...doc.data()};
                });
                setBooks(booksFormatted);
            }).catch(error=>{
                console.log(error);
            }).finally(()=>{
                setLoading(false)
            })
  
    }, [categoryName]) //Para que se ejecute cada vez que cambiamos de categoria

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

