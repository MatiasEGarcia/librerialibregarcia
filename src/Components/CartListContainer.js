import { useContext } from "react";
import CartContext from "../context/CartContext";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../Service/firebase";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { useNotification } from "../Notification/Notification";

/*Cart.js*/
const CartListContainer = () => {

    const { cart, totalAmount, clearCart } = useContext(CartContext);
    //customHooks
    const { isOpen, openModal, closeModal } = useModal(false);
    const setNotification = useNotification();

    const generateOrder = (evt) => {
        evt.preventDefault();

        const objCreate = {
            buyer: {
                name: evt.target.inputName.value,
                surname: evt.target.inputSurname.value,
                tel: evt.target.inputTel.value,
                email: evt.target.inputEmail.value
            },
            item: cart,
            totalAmount
        };

        const collectionRef = collection(db, 'orders');

        addDoc(collectionRef, objCreate).then(({ id }) => {
            console.log(`El id de la orden es : ${id}`);
            clearCart();
            closeModal();
            setNotification('success',`Su orden se genero correctamente. El id de su orden es: ${id}`);
        });

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
                    <form id="userFormBuy" onSubmit={(evt) => generateOrder(evt)}>
                        <div className="mb-3">
                            <label for="inputName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputName" name="inputName" />
                        </div>
                        <div className="mb-3">
                            <label for="inputSurname" className="form-label">Surname</label>
                            <input type="text" className="form-control" id="inputSurname" name="inputSurname" />
                        </div>
                        <div className="mb-3">
                            <label for="inputTel" className="form-label">Tel</label>
                            <input type="tel" className="form-control" id="inputTel" name="inputTel" />
                        </div>
                        <div className="mb-3">
                            <label for="inputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg">Finish purchase</button>
                    </form>
                </div>
            </Modal>
        </div>
    )

};

export default CartListContainer;