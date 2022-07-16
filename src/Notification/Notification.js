import { useState, createContext, useContext } from "react";


const Notification = ({ message, severity }) => {

    if (message === '') return

    return (
        <div className={`notificationContainer ${severity === 'error' ? 'Error' : 'Success'}`}>
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

  
        setTimeout(() => {
            setMsgConfig({ ...msgConfig, message: '' })
        }, timeout * 1000)

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