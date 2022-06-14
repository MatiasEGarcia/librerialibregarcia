import {useContext}  from "react"; 
import CartContext from "../context/CartContext";

const Cart = ()=>{

    const {clearCart} = useContext(CartContext);

    return(
        <div>
            Hola,estas en el carrito
            <button onClick={clearCart}>Vaciar el carrito</button>
        </div>
    )
}

export default Cart;