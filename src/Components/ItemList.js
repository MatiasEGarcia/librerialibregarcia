import Item from "./Item";


const ItemList = ({ books }) => {
    return (
        <>
            {books.map(book => <Item key={book.id} {...book}/>)}   {/*Se va a iterar item por cada elemento que haya en books, cada iteracion con su respectiva key*/}
        </>
    )
}

export default ItemList;