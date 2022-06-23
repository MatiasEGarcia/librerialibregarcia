import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Service/firebase";

const ItemDetailContainer = () => {

    const [book, setBook] = useState();
    const [loading, setLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState();
    const { idBook } = useParams();

    useEffect(() => {
        setLoading(true);

        const docRef= doc(db,'books',idBook);

        getDoc(docRef).then(doc => {
            const bookFormatted = {id:doc.id, ...doc.data()};
            setBook(bookFormatted);
        }).catch(error => {
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        });
        

    }, []);

    /*Listar el array de categorias*/
    useEffect(() => {
        if (book) {
            setCategoriesList(book.category.map(cate =>
                <li key={cate}>
                    {cate}
                </li>
            ))
        }
    }, [book])


    if(loading){
        return (<h2>Cargando ...</h2>)
    }


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