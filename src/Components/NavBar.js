function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Libreria libre</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navOpcionesCollapse" aria-controls="navBarOpciones" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navOpcionesCollapse">
                    <div className="navbar-nav navOpciones">
                        <a className="nav-link" href="#">Cuenta</a>
                        <a className="nav-link" href="#">Carrito</a>
                        <a className="nav-link" href="#">Favoritos</a>
                        <div className="dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdownGeneros" data-bs-toggle="dropdown" aria-expanded="false">
                                Generos
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownGeneros">
                                <li><a className="dropdown-item" href="#">Fantasia</a></li>
                                <li><a className="dropdown-item" href="#">Suspenso</a></li>
                                <li><a className="dropdown-item" href="#">Historia</a></li>
                                <li><a className="dropdown-item" href="#">Romance</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Otros</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;