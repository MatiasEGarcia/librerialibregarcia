import { collection, addDoc, writeBatch, query, where, documentId, getDocs } from 'firebase/firestore';
import { db } from '.';


export const generateBookOrder = (objCreate) => {
    return new Promise((resolve, reject) => {

        const batch = writeBatch(db);

        const ids = objCreate.item.map(book => book.id);
        const outOfStock = [];

        const collectionRef = collection(db, 'books');


        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data();

                    const book = objCreate.item.find(book => book.id === book.id);
                    const prodQuantity = book.quantity;

                    if (dataDoc.stock >= prodQuantity) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc });
                    }
                })
            }).then(() => {
                if (outOfStock.length === 0) {
                    const collectionRef = collection(db, 'orders');
                    return addDoc(collectionRef, objCreate);
                } else {
                    return reject({ type: 'outOfStock', books: outOfStock });
                }
            }).then(({ id }) => {
                batch.commit();
                resolve(id); //id de la orden generada
            })
    });
};