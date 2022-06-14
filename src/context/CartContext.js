import {useState, useEffect, createContext} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]); // array para guardar los libros
    const [totalQuantity , setTotalQuantity] = useState(0); //cantidad de libros en el carrito


    useEffect(()=>{
        let totalQuantity=0;

        cart.forEach(book => {
            totalQuantity += book.quantity;
        })
        setTotalQuantity(totalQuantity);
    },[cart])


    const addBook =(bookToAdd)=>{
        if(!isInCart(bookToAdd.id)){
            setCart([...cart,bookToAdd]);
        }else{
            console.log(`This book is alredy in the cart, idBook:${bookToAdd.id}`)
        };
    };

    const removeBook = (id) => {
        const cartWithoutBook = cart.filter(book => book.id === id);
        setCart(cartWithoutBook);
    };

    const clearCart = ()=> {
        console.log(`clean cart`)
        setCart([]);
    }

    const isInCart = (id)=>{
        return cart.some(book => book.id === id);
    };

    return(
        <CartContext.Provider value={{
            cart,
            totalQuantity,
            addBook,
            removeBook,
            clearCart,
            isInCart
        }}>
            {/*toda la app tendra acceso a las variables*/}
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;