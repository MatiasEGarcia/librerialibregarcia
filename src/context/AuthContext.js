import { createContext, useContext, useState } from 'react';
import { auth } from '../Service/firebase';
import CartContext from './CartContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword,signInWithPopup ,signOut} from 'firebase/auth';

const useProviderAuth = () => {
    const [userEmail, setUserEmail] = useState(null);
    const { clearCart } = useContext(CartContext);


    //Crear usuario con con email y password
    const signUpEmail = ({email, password,redirect}) => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            const userEmail = user.email;

            setUserEmail(userEmail);

            console.log(`Se creo un nuevo usuario`)
            redirect();
        }).catch((error) => {
            console.log(error.message);
        });
    }


    //ingresar con email y password
    const signIn = ({email, password,redirect}) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            const userEmail = user.email;

            setUserEmail(userEmail);
            console.log(`Se ingreso con email`);
            redirect();
        }).catch((error) => {
            console.log(error.message);
        });
    };


    //ingresar con google
    const signUpGoogle = (redirect) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            setUserEmail(user.email);


            console.log(`Se ingreso con google`);
            redirect();
        }).catch((error) => {
            console.log(error);
        });

    };

    //salir de la sesion y limpiamos el carrito
    const logOut = () => {
        signOut(auth).then(() => {
            clearCart();
            setUserEmail(null);
        });
    };

    return {
        userEmail,
        signUpEmail,
        signIn,
        signUpGoogle,
        logOut
    }

}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProviderAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}