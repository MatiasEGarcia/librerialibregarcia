import { Link } from "react-router-dom";

const Item = ({ id,name, price, img }) => {
    return (
        <div className="card listBookCard"> 
            <div className="containerImg">
                <img src={img} className="card-img-top img" alt={name} />
            </div>
            <div className="card-body">
                <h5 className="card-title bookName">{name}</h5>
                <p className="card-text bookPrice"> Precio : ${price}</p>
                <Link to={`/detailBook/${id}`} className="btn btn-primary detailButton">Ver detalle</Link>
            </div>
        </div>
    )
}
export default Item;