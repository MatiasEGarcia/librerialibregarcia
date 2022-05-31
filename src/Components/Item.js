const Item = ({ name, price, img }) => {
    return (
        <div className="card listBookCard"> {/*La key esta en ItemList*/}
            <div className="contenedorImg">
                <img src={img} className="card-img-top img" alt={name} />
            </div>
            <div className="card-body">
                <h5 className="card-title bookName">{name}</h5>
                <p className="card-text bookPrice">{price}</p>
                <a href="#" className="btn btn-primary detalleButton">Ver detalle</a>
            </div>
        </div>
    )
}
export default Item;