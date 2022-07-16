import { useState } from 'react'
import CartWidwet from './CartWidget';


const Counter = ({initialValue, add}) => {
    const [quantity , setQuantity ] = useState(0);

    const increment = () => {
        (quantity < initialValue && true) && setQuantity(quantity + 1);
    }

    const decrement = () => {
        if(quantity!==0){
            setQuantity(quantity - 1);
        }
    }

    return (
        <ul className='counterContainer'>
            <li>
                <button type="button" className='decrementButton btn btn-danger' onClick={decrement}><i className="fa-solid fa-circle-minus"></i></button>
            </li>
            <li className='order'><p>{quantity}</p></li>
            <li>
                <button type="button" className='incrementButton btn btn-success' onClick={increment}><i className="fa-solid fa-circle-plus"></i></button>
            </li>
            <li>
                <button type="button" className="cartButton btn btn-success" onClick={() => add(quantity)} ><CartWidwet/></button>
            </li>
        </ul>
    )

}

export default Counter;