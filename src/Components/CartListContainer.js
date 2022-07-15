import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { useNotification } from "../notification/Notification";
import BookOrderForm from "./BookOrderForm";
import { generateBookOrder } from "../services/firebase/firestore";

/*Cart.js*/
const CartListContainer = () => {
    const [loading, setLoading] = useState(false);
    const { cart, totalAmount, clearCart } = useContext(CartContext);
    //customHooks
    const { isOpen, openModal, closeModal } = useModal(false);
    const setNotification = useNotification();

    const formSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);

        const objCreate = {
            buyer: {
                name: evt.target.Name.value,
                surname: evt.target.Surname.value,
                tel: evt.target.Tel.value,
                email: evt.target.Email.value,
                address:evt.target.Address.value
            },
            item: cart,
            totalAmount
        };

        generateBookOrder(objCreate).then((id) => {
            clearCart();
            setNotification('success', `Your order was generated successfully. Your order id is: ${id}`);
        }).catch(error => {
            if (error.type === 'outOfStock') {
                setNotification('error', 'There are products that do not have stock');
            } else {
                console.log(error);
            }
        }).finally(() => {
            setLoading(false);
            closeModal();
        })
    }


    if (loading) {
        return <h1>Loading...</h1>
    }


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
                        <th scope="col"><button className="btn btn-danger" onClick={() => clearCart()}>Remove All</button></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <ItemList books={cart} item="cart" />
                </tbody>
            </table>
            <div className="cartListContainerFooter">
                <button onClick={openModal} className="btn btn-success btn-lg">Buy</button>

                <h3>Total amount: {totalAmount} </h3>
            </div>
            <Modal title='Complete before buying' isOpen={isOpen} closeModal={closeModal}>
                <div className="modalBody">
                    <BookOrderForm handleSubmit={formSubmit}/>
                </div>
            </Modal>
        </div>
    )

};

export default CartListContainer;