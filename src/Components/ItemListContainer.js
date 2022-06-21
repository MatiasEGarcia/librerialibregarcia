import { useState, useEffect } from 'react';
import { getBooks } from '../asyncmock';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';


const ItemListContainer = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();

    useEffect(() => {
            setLoading(true);

            if(!categoryName){
                getBooks().then(response => {
                    setBooks(response);
                }).catch(error => {
                    console.log(error);
                }).finally(()=>{
                    setLoading(false);
                });
            }else{
                getBooks(categoryName).then(response => {
                    setBooks(response);
                }).catch(error =>{
                    console.log(error);
                }).finally(()=>{
                    setLoading(false)
                });
            };   
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

