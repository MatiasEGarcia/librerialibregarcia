import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import { collection, addDoc, writeBatch, query, where, documentId, getDocs } from 'firebase/firestore';
import { db } from "../Service/firebase";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { useNotification } from "../Notification/Notification";

/*Cart.js*/ 
const CartListContainer = () => {
    const [loading, setLoading] = useState(false);
    const { cart, totalAmount, clearCart } = useContext(CartContext);
    //customHooks
    const { isOpen, openModal, closeModal } = useModal(false);
    const setNotification = useNotification();

    const generateOrder = (evt) => {
        evt.preventDefault();
        setLoading(true);

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

        const batch = writeBatch(db);

        const ids = cart.map(book => book.id);
        const outOfStock = [];

        const collectionRef = collection(db, 'books');
       
        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
        .then(response => {
            response.docs.forEach(doc => {
                const dataDoc = doc.data();

                const book = cart.find(book => book.id === book.id);
                const prodQuantity = book.quantity;

                if(dataDoc.stock >= prodQuantity) {
                    batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc});
                }
            })
        }).then(() => {
            if(outOfStock.length === 0) {
                const collectionRef = collection(db, 'orders');
                return addDoc(collectionRef, objCreate);
            } else {
                return Promise.reject({ type: 'outOfStock', books: outOfStock });
            }
        }).then(({ id }) => {
            batch.commit();
            clearCart();
            setNotification('success',`Your order was generated successfully. Your order id is: ${id}`);
        }).catch(error => {
            if(error.type === 'outOfStock') {
                setNotification('error','There are products that do not have stock');
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