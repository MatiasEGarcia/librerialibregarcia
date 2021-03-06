import CartWidwet from "./CartWidget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function NavBar() {

    const { totalQuantity } = useContext(CartContext);


    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand ">
                    <h1>Libreria libre</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navOpcionesCollapse" aria-controls="navBarOpciones" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navOpcionesCollapse">
                    <div className="navbar-nav navOpciones">
                            <Link className="nav-link" to="/cart">
                                <CartWidwet />
                                {totalQuantity}
                            </Link>
                        <div className="dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="dropdownGeneros" data-bs-toggle="dropdown" aria-expanded="false">
                                Generos
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownGeneros">
                                <li><Link to="/categories/Fantasia" className="dropdown-item">Fantasia</Link></li>
                                <li><Link to="/categories/Ciencia Ficcion" className="dropdown-item">Ciencia Ficcion</Link></li>
                                <li><Link to="/categories/Historia" className="dropdown-item">Historia</Link></li>
                                <li><Link to="/categories/Romance" className="dropdown-item">Romance</Link></li>
                                <li><Link to="/categories/Aventura" className="dropdown-item">Aventura</Link></li>
                                <li><Link to="/categories/Misterio" className="dropdown-item">Misterio</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;