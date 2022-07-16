import { useState } from "react";
import Input from "./Input";

const BookOrderForm = ({ handleSubmit }) => {
    const [name, setName] = useState({ val: '', error: false });
    const [surname, setSurname] = useState({ val: '', error: false });
    const [tel, setTel] = useState({ val: '', error: false });
    const [email, setEmail] = useState({ val: '', error: false });
    const [email2, setEmail2] = useState({ val: '', error: false });
    const [address, setAddress] = useState({ val: '', error: false });
    const [errors, setErrors] = useState(false)


    const expressions = {
        nameSurname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        tel: /^\d{7,14}$/, // 7 a 14 numeros.
        address: /[A-Za-z0-9'\.\-\s\,]/

    }

    const emailRepeatValidation = () => {
        if (email.campo.lenght > 0) {
            if (email.val !== email2.val) {
                setEmail2((prev) => {                 /*Porque el prev? para acceder al valor del email2, y asi cambiar el estado sin perder lo que ingreso el usuario antes*/
                    return { ...prev, error: true }
                })
            } else {
                setEmail2((prev) => {
                    return { ...prev, error: false }
                })
            }
        }
    }



    return (
        <form id="orderForm" onSubmit={(evt) => handleSubmit(evt)}>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <Input
                            type="text"
                            state={name}
                            changeState={setName}
                            label="Name"
                            regularExpression={expressions.nameSurname}
                            errorMessage="The name can only contain letters and spaces."
                            changeError={setErrors}
                            required="true"

                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="text"
                            state={surname}
                            changeState={setSurname}
                            label="Surname"
                            regularExpression={expressions.nameSurname}
                            errorMessage="The Surname can only contain letters and spaces."
                            changeError={setErrors}
                            required="true"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="tel"
                            state={tel}
                            changeState={setTel}
                            label="Tel"
                            regularExpression={expressions.tel}
                            errorMessage="The phone can only contain numbers and the maximum is 14 digits."
                            changeError={setErrors}
                            required="true"
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <Input
                            type="email"
                            state={email}
                            changeState={setEmail}
                            label="Email"
                            regularExpression={expressions.email}
                            errorMessage="The email you are trying to enter is incorrect"
                            changeError={setErrors}
                            required="true"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="email"
                            state={email2}
                            changeState={setEmail2}
                            label="Repeat Email"
                            regularExpression={expressions.email}
                            errorMessage="The email you are trying to enter is not the same"
                            changeError={setErrors}
                            required="true"
                            extraFunction={emailRepeatValidation}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="text"
                            state={address}
                            changeState={setAddress}
                            label="Address"
                            regularExpression={expressions.address}
                            errorMessage="The address has wrong symbols"
                            changeError={setErrors}
                            required="true"
                        />
                    </div>
                </div>
            </div>



            {!errors && <button type="submit" className="btn btn-success btn-lg" >Finish purchase</button>}
            {errors && <button type="submit" className="btn btn-success btn-lg" disabled>Finish purchase</button>}
        </form>
    )
}

export default BookOrderForm;