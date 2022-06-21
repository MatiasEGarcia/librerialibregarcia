import { useContext } from "react";
import CartContext from "../context/CartContext";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";

/*Cart.js*/
const CartListContainer = () => {

    const { cart, totalAmount, clearCart } = useContext(CartContext);


    if (!cart.length) {
        return (
            <div className="container cartEmptyListContainer">
                <h3>There are not books in cart</h3>
                <Link to="/" className="btn btn-success" >
                    <i className="fa-solid fa-arrow-left"></i>
                    Index
                </Link>
            </div>
        )
    }
    return (
        <div className="container cartListContainer">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Book</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <ItemList books={cart} item="cart" />
                </tbody>
            </table>
            <div className="cartListContainerFooter">
                <h3>Total amount: {totalAmount} </h3>
                <button className="btn btn-danger" onClick={() => clearCart()}>Remove All</button>
            </div>
        </div>
    )

};

export default CartListContainer;