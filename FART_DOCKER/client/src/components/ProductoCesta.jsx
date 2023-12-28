import React, {useState} from "react";
import Cookies from "js-cookie"; // Importa la librería Cookies
import { MiErrorPersonalizado} from "../helpers/generales";
import Modal from './Modal'
import ModalLoading from './ModalLoading'
import Button from "react-bootstrap/Button";
import { Card, Row, Col} from "react-bootstrap";
import '../scss/components/ProductoCesta.scss'
import cestaServices from "../helpers/cestaServices";

const ProductoCesta = (props) => {
  const { id, nombre, descripcion, cantidad, precio, url_imagen, peticionEliminarProductoCesta } = props;

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
  
  
  // Peticion para eliminar producto de la cesta
  const eliminarProductoCesta = async () =>{
    // Si el usuario esta autenticado enviar a CESTA_DB
    if (Cookies.get('access_token')){
      
      try{
        // Mostrar ventana modal de loading en lo que se procesa la peticion
        openLoadingModal(true)

        // Realizar la peticion http para eliminar producto
        const response = await cestaServices.delete_product_from_basket(id)
  
        // Si hubo errores en la peticion
        if (response.error)
          throw new MiErrorPersonalizado(response.error || "Producto no eliminado de la base de datos. Por favor intentelo más tarde");

        // Si la petición finalizó correctamente configurar mensaje de finalizacion
        setHeaderServerMessage("Confirmacion:")
        setServerMessage("Producto eliminado correctamente")
  
      } catch (error) {
        // Configurar mensaje de finalizacion cuando hubo errores
        setHeaderServerMessage("Error en la eliminacion del producto:")
        setServerMessage(error)

      } finally{
        // Cerrar ventana modal de Loading ...
        closeLoadingModal()

        // Abrir ventana modal de Mensaje
        openModalMessage()
      }

    // Si el usuario no esta autenticado guardar en Cesta-Cookies
    } else {
      // Analiza la cadena JSON en un objeto JavaScript
      const cestaUsuarioString = Cookies.get('cesta_usuario');
      const cestaUsuario = cestaUsuarioString ? JSON.parse(cestaUsuarioString) : [];
      
      // Utiliza el método filter para eliminar el producto con el id especificado
      const cestaUsuarioActualizada   = cestaUsuario.filter(producto => producto.id !== id);

      // Guarda la cesta actualizada en la cookie
      Cookies.set('cesta_usuario',JSON.stringify(cestaUsuarioActualizada));
      console.log("Datos en cookies: "+Cookies.get('cesta_usuario') )
    }
    window.location.reload()
  }

  return (
    <div className="container">
      <Card>
        <Row>
        <Col  lg={4} className="d-flex justify-content-center align-items-center">
          <Card.Img variant="start" src={url_imagen} className="cesta-producto-imagen" alt="Imagen del producto"/>
        </Col>
        <Col  lg={8}>
          <Card.Body className="cesta-producto-card-body">
            <Card.Title><b>{nombre}</b></Card.Title>
            <Card.Text className="texto-truncado">{descripcion}</Card.Text>
            <div className="d-flex flex-wrap gap-3">
            <Card.Text>Cantidad: <b>{cantidad}</b></Card.Text>           
            <Card.Text>Precio: <b>{precio.toFixed(2)} &euro;</b></Card.Text>
            <Card.Text>Total: <b>{(precio*cantidad).toFixed(2)} &euro;</b></Card.Text>
            </div>

            <Button variant="primary" className="cesta-button" onClick={eliminarProductoCesta}>Eliminar producto de la cesta</Button>
            
          </Card.Body>
          </Col>
        </Row>
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

    </div>
  );
};

export default ProductoCesta;