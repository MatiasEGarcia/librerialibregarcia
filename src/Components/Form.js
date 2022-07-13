
const Form = ({ onSubmitHandler, submitBtnMessage, fields }) => {
    return (
        <form onSubmit={(evt) => onSubmitHandler(evt)}>
            {fields.map(field =>
                <div className="mb-3" key={field.fieldName}>
                    <label for={field.fieldName} className="form-label">{field.fieldName}</label>
                    <input type={field.fieldType} className="form-control" id={field.fieldName} name={field.fieldName} />
                </div>
            )}

            <button type="submit" className="btn btn-success btn-lg">{submitBtnMessage}</button>
        </form>
    )
}

export default Form;