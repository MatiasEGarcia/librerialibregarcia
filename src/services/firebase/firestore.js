import { collection, addDoc, writeBatch, query, where, documentId, getDocs, getDoc,doc } from 'firebase/firestore';
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

export const findBook = (idBook) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, 'books', idBook);

        getDoc(docRef).then(doc => {
            const bookFormatted = { id: doc.id, ...doc.data() };
            resolve(bookFormatted);
        }).catch(error => {
            reject(error);
        })

    })
};

export const getBooks = (categoryName) => {

    return new Promise((resolve, reject) => {

        const collectionRef = categoryName ?
            query(collection(db, 'books'), where('category', 'array-contains-any', [categoryName])) 
            : (collection(db, 'books'));

        getDocs(collectionRef).then(response => {
            const booksFormatted = response.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            resolve(booksFormatted);
        }).catch(error => {
            reject(error);
        });

    })



};