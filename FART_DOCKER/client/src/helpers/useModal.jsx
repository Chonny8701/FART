import {useState} from 'react'

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue)
  const openModal = () =>{setIsOpen(true);console.log("Abriendo ventana modal")};
  const closeModal = () => {setIsOpen(false);console.log("Cerrando ventana modal")}

  return [isOpen, openModal, closeModal];
}

 