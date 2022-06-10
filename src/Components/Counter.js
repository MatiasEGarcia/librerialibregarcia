import { useState } from 'react'
import CartWidwet from './CartWidget';


const Counter = ({initialValue}) => {
    const [order, setOrder] = useState(0);

    const increment = () => {
        (order < initialValue && true) && setOrder(order + 1);
    }

    const decrement = () => {
        if(order!==0){
            setOrder(order - 1);
        }
    }


    return (
        <ul className='counterContainer'>
            <li>
                <button type="button" className='decrementButton btn btn-danger' onClick={decrement}><i className="fa-solid fa-circle-minus"></i></button>
            </li>
            <li className='order'><p>{order}</p></li>
            <li>
                <button type="button" className='incrementButton btn btn-success' onClick={increment}><i className="fa-solid fa-circle-plus"></i></button>
            </li>
            <li>
                <button type="button" className="cartButton btn btn-success"><CartWidwet/></button> {/*Aun no hago la funcion para agregar al carrito*/}
            </li>
        </ul>
    )

}

export default Counter;