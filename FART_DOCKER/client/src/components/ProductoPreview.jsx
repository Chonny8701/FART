import React, {useState} from "react";
import Modal from './Modal'
import ModalLoading from './ModalLoading'
import ProductoEditar from "./ProductoEditar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import productosServices from "../helpers/productosServices"
import { FiEdit } from 'react-icons/fi'; 
import { AiOutlineDelete } from 'react-icons/ai';
import '../scss/components/ProductoPreview.scss';
import { MiErrorPersonalizado} from "../helpers/generales";

const ProductoPreview = (props) => {
  const {id, nombre, descripcion, precio, categoria, url_imagen, codigo_usuario} = props;
  const descripcionReducida =  descripcion.length > 60 ? descripcion.slice(0, 60) + '...' : descripcion;

  // Estado para controlar la visibilidad ventana modal de Loading ...
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const closeLoadingModal = () => {setIsLoadingModal(false)};
  const openLoadingModal = () => {setIsLoadingModal(true)};

  // Estado para controlar la visibilidad ventana modal de Mensaje ...
  const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
  const [headerServerMessage, setHeaderServerMessage] = useState ("")
  const [serverMessage, setServerMessage] = useState ("")
  const openModalMessage = () => { setIsOpenModalMessage(true) }
  const closeModalMessage = () =>{ 
    setIsOpenModalMessage(false); 
    setHeaderServerMessage("");
    setServerMessage("")
    window.location.reload()
  }  

  // Estado para controlar la visibilidad ventana modal de Editar Producto
  const [isOpenModalEditarProducto , setIsOpenModalEditarProducto] = useState(false);
  const openModalEditarProducto = () => { setIsOpenModalEditarProducto(true); };
  const closeModalEditarProducto = () => { setIsOpenModalEditarProducto(false); };

  const peticionEliminarProducto = async () =>{
    try{
      // Mostrar ventana modal de loading en lo que se procesa la peticion
      openLoadingModal(true)

      // Realizar la peticion http para eliminar producto
      const response = await productosServices.delete_user_product(id)

      // Si hubo errores en la peticion
      if (response.error)
        throw new MiErrorPersonalizado(response.error || "Producto no eliminado de la base de datos. Por favor intentelo más tarde");

      // Si la petición finalizó correctamente configurar mensaje de finalizacion
      setHeaderServerMessage("Confirmacion:")
      setServerMessage("Producto eliminado correctamente")

    } catch(error){
      // Configurar mensaje de finalizacion cuando hubo errores
      setHeaderServerMessage("Error en la eliminacion del producto:")
      setServerMessage(error)

    } finally {
      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

      // Abrir ventana modal de Mensaje
      openModalMessage()

      window.location.reload()
    }

  }

  return (
    <>
      <Card className = "producto-card-container" >
        <Card.Img variant="top" src={url_imagen} className="producto-card-image"/>
        <Card.Body className="producto-card-body">
          <Card.Title className="truncado_1_fila">{nombre}</Card.Title>
          {/* <Card.Text className="producto-card-descripcion">{descripcionReducida}</Card.Text> */}
          <Card.Text><b>{precio.toFixed(2)} &euro;</b></Card.Text>

          <Button variant="primary" className="producto-button" onClick={openModalEditarProducto}>Editar<FiEdit className="fi-edit-icon"/></Button>
          <Button variant="primary" className="producto-button" onClick={peticionEliminarProducto}>Eliminar<AiOutlineDelete className="ai-out-line-edit-icon"/></Button>
        </Card.Body>
      </Card>

      {/* -----------------------------------Ventana Modal de Loading----------------------------------- */}
      <ModalLoading isOpen={isLoadingModal} >
        {/* Contenido del modal */}
        <h4>Loading ...</h4>
        {/* Icono de carga de la pagina */}
        <div className="loader loader--style1" title="0">
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            enableBackground="new 0 0 40 40"
            xmlSpace="preserve"
          >
            <path
              opacity="0.2"
              fill="#000"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            />
            <path
              fill="#000"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </ModalLoading>      

      {/* ---------------------------Ventana Modal Mensaje Peticion OK / Error--------------------------- */}
      <Modal isOpen={isOpenModalMessage} closeModal={closeModalMessage}>
        {/* Contenido del modal */}
        <h4>{headerServerMessage}</h4>
        <p>{serverMessage}</p>
        <Button onClick={closeModalMessage}>Cerrar</Button>
      </Modal>

      {/* ---------------------------------Ventana Modal Editar Producto--------------------------------- */}
      <Modal isOpen={isOpenModalEditarProducto} closeModal={closeModalEditarProducto}>
        <h4>Nuevo Producto:</h4>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
          <ProductoEditar my_id = {id} my_nombre = {nombre}  my_descripcion ={descripcion}  my_precio = {precio} my_categoria = {categoria}  my_url_imagen = {url_imagen}  my_codigo_usuario ={codigo_usuario} closeModalEditarProducto= {closeModalEditarProducto}/>
        </div>
      </Modal>
    </>


    
  );
};

export default ProductoPreview;