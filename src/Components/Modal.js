const Modal = ({children,title,isOpen,closeModal}) => {

    //parar la propagacion del cierre del modal
    const handlePropagation= (e) => e.stopPropagation();

    return(
        <div className={`modal ${isOpen && "isOpen"}`} onClick={()=> closeModal()}>
            <div className="modalContainer" onClick={handlePropagation}>
                <div className="modalHeader">
                    <h2>{title}</h2>
                    <button className="btn btn-danger modalClose" onClick={()=> closeModal()}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;