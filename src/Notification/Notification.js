import { useState, createContext, useContext } from "react";

//Componente que despliega la notificacion
const Notification = ({ message, severity }) => {

    const notificationStyle = {
        position: 'absolute',
        top: 100,
        right: 5,
        width: 'auto',
        height: 'auto',
        color: 'white',
        padding: '10px 20px 10px 20px',
        borderRadius: '10px'
    }

    if (message === '') return

    return (
        <div className={` notificationContainer ${severity === 'error' ? 'Error' : 'Success'}`}>
            <div className="notificationHeader">
                <h4>{severity === 'error' ? 'Error' : 'Success'}</h4>
            </div>
            <div className="notificationBody">
                {message}
            </div>
        </div>
    )
}

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [msgConfig, setMsgConfig] = useState({
        severity: 'success',
        message: ''
    });

    const setNotification = (sev, msg, timeout = 3) => {
        setMsgConfig({ severity: sev, message: msg });

        //Para que desaparesca la notificacion
        /*setTimeout(() => {
            setMsgConfig({ ...msgConfig, message: '' })
        }, timeout * 1000)*/

    }

    return (
        <NotificationContext.Provider value={setNotification}>
            <Notification message={msgConfig.message} severity={msgConfig.severity} />
            {children}
        </NotificationContext.Provider>
    )
}


export const useNotification = () => {
    return useContext(NotificationContext)
}