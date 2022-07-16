import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { findBook } from "../services/firebase/firestore";

const ItemDetailContainer = () => {

    const [book, setBook] = useState();
    const [noBook, setNoBook] = useState(); 
    const [loading, setLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState();
    const { idBook } = useParams();

    useEffect(() => {
        setLoading(true);

        findBook(idBook).then((bookFormatted) =>{
            setBook(bookFormatted);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });


    }, []);


    useEffect(() => {
        if (book) {
            try {
                setCategoriesList(book.category.map(cate =>
                    <li key={cate}>
                        {cate}
                    </li>
                ))
            } catch (error) {
                console.log(`Ocurrio un error : ${error}`)
                setNoBook(true);
            }

        }
    }, [book])

    if (noBook) {
        return (
            <div className="container">
                <h2>An error has occurred</h2>
                <Link to="/" className="btn btn-success" >
                    <i className="fa-solid fa-arrow-left"></i>
                    Index
                </Link>
            </div>
        )
    }

    if (loading) {
        return (<h2>Cargando ...</h2>)
    };


    return (
        <div className="container itemDetailContainer">
            <div className="row">
                <h1 className="titleDetailBook">Detalle del libro</h1>
            </div>
            <div className="row">
                <ItemDetail {...book} categoriesList={categoriesList} />
            </div>
        </div>
    )

};

export default ItemDetailContainer;