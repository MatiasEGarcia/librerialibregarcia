import Item from "./Item";
import CartItem from "./CartItem";


const ItemList = ({ books , item}) => {

    if(item.match("item")){
        return(<>{books.map(book => <Item key={book.id} {...book}/>)} </>)  
    }else{
        return(<>{books.map(book => <CartItem key={book.id} {...book}/>)} </>)
    }
}

export default ItemList;