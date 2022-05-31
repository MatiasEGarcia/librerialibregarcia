import { useState, useEffect } from 'react';
import { getBooks } from '../asyncmock';
import ItemList from './ItemList';


const ItemListContainer = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(response => {
            setBooks(response)
        })
    }, [])

    return (
        <div className='itemListContainer'>
            <ItemList books={books}/>         
        </div>
    )
};

export default ItemListContainer;