import { useState } from "react";

export const useModal = (initialValue=false) => {
    const [isOpen, setIsOpen] = useState(initialValue); // como es false, no se muestra el modal, almenos en un principio

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

return{isOpen,openModal,closeModal};
} 