import Counter from "./Counter";
import {useState,useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const ItemDetail = ({id, name, img, price, description, stock, categoriesList }) => {
    const [quantityAdded,setQuantityAdded] = useState(0);

    const {addBook} = useContext(CartContext);

    const handleAdd= (quantity ) => {
        console.log(`se agregaron ${quantity } ${name}`)
        addBook({id,name,price,quantity});
        setQuantityAdded(quantity);
    };


    return (
        <>
            <div className="card mb-3 cardContainer">
                <div className="row g-0">
                    <div className="col-md-4 imgCol">
                        <div className="containerImg">
                            <img src={img} className="img" alt={name} />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-header">
                            <h2 className="card-title">{name}</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="bookPrice list-group-item"><h4>Precio :</h4> ${price}</li>
                                <li className="containerbookCategories list-group-item">
                                    <h4>Categorias</h4>
                                    <ul className="bookCategories">
                                        {categoriesList}
                                    </ul>
                                </li>
                                <li className="bookDescription list-group-item">
                                    <h4>Descripcion</h4>
                                    {description}
                                </li>
                                <li className="bookStock list-group-item">
                                    <h4>Stock</h4> : {stock}</li>
                                <li className="list-group-item">
                                    {/*itemCount*/}
                                    {quantityAdded === 0 
                                    ? <Counter initialValue={stock} add={handleAdd} />
                                    : <Link to='/cart'><button className="btn btn-success">Terminar compra</button></Link> }
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ItemDetail;