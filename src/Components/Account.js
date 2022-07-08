import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Account = () => {
    const { signIn , signUpEmail, signUpGoogle} = useAuth();
    const { accion } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    

    const handleSignIn = (evt) => {
        evt.preventDefault();
        signIn({
            email:evt.target.inputEmail.value,
            password:evt.target.inputPassword.value,
            redirect: () => {navigate(from, { replace: true })}
        }).catch(error =>{
            console.log(error)
        });
    }

    const handleSignUpEmail = (evt) => {
        evt.preventDefault();
        signUpEmail({
            email:evt.target.inputEmail.value,
            password:evt.target.inputPassword.value,
            redirect: () => {navigate(from, { replace: true })}
        }).catch(error =>{
            console.log(error)
        });
    }


    return (
        <div className="account">
            <div className="accountContainer">
                <div className="header">
                    <h2 className="display-4">{accion.includes('signIn') ? 'Sign In' : 'Sign Up'}</h2>
                </div>
                <div className="body">
                    <form onSubmit={(evt) => (accion.includes('signIn')) ? handleSignIn(evt) : handleSignUpEmail(evt)}>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" name="inputEmail" placeholder="..." />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="inputPassword" placeholder="more than 6 characters" />
                        </div>
                        <div className="mb-3 d-grid">
                            <button className="btn btn-success" type="submit" >{accion.includes('signIn') ? 'Login' : 'Finish'}</button>
                        </div>
                    </form>
                </div>
                <div className="footer d-grid">
                    <button className="btn btn-primary" onClick={()=>signUpGoogle({redirect: () => {navigate(from, { replace: true })}})}>Login with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Account;