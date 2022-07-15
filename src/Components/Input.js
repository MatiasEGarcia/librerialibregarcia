import { useState } from "react";

const Input = ({ type, state, changeState, label, regularExpression, errorMessage, changeError, required }) => {

    const [isEmpty, setIsEmpty] = useState(false);
    const emptyMessage= "This field can not be empty";

    const onChangeHandler = (evt) => {
        changeState({ ...state, val: evt.target.value });
    };

    const validationHandler = (evt) => {
        onChangeHandler(evt);
        const value= evt.target.value;

        if (required.match("true") && value.length === 0) {
            setIsEmpty(true);
            changeError(true);
        } else {
            setIsEmpty(false);
            changeError(false);

            if (regularExpression) {
                if (regularExpression.test(state.val)) {
                    changeState({ ...state, error: false });
                } else {
                    changeState({ ...state, error: true });
                    changeError(true);
                };
            };
        };
    };


    return (
        <>
            <label for={label} className="form-label inputLabel">{label}</label>
            <input
                type={type}
                className="form-control"
                name={label}
                id={label}
                value={state.val}
                onChange={(evt) => onChangeHandler(evt)}
                onBlur={(evt) => validationHandler(evt)}
            />
            {state.error && <small className="inputErrorMessage">{errorMessage}</small>}
            {isEmpty && <small className="inputErrorMessage">{emptyMessage}</small>}
        </>
    )
}

export default Input;