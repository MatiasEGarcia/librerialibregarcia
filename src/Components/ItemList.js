import Item from "./Item";


const ItemList = ({ books }) => {
    return (
        <div className="bookList">
            {books.map(book => <Item key={book.id} {...book}/>)}   {/*Se va a iterar item por cada elemento que haya en books, cada iteracion con su respectiva key*/}
        </div>
    )
}

export default ItemList;