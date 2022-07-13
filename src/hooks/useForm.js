import { useState } from "react";

export const useForm = (initialForm, validationForm) => {
    const [form, setForm] = useState(initialForm);
    const [error, setErrors] = useState({});
   // const [formLoading, setFormLoading] = useState(false);   esto creo que no lo voy a poner
    //const [response, setResponse] = useState(null);

    const handleChange = (e) =>{
        const {name,value}= e.target;

        //actualizo
        setForm({
            ...form,
            [name]:value
        })
    };


    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationForm(form)); 
    };

    //const handleSubmit = (e) => {};

    return{
        form,
        error,
        handleChange,
        handleBlur,
    }

}