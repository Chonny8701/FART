import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../scss/components/Login.scss";
import authService from "../helpers/authService";
import Modal from "./Modal"; // Importa el componente Modal
import ModalLoading from './ModalLoading'
import { MiErrorPersonalizado} from "../helpers/generales";

const Login = ({ mostrarContenido, setearIsAuthenticated, actualizarUsuarioGeneral }) => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");

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

  // Actualizar valor de los inputs
  const actualizarEmail = (event) => {
    setEmailUsuario(event.target.value);
    console.log(event.target.value);
  };
  const actualizarPassword = (event) => {
    setPasswordUsuario(event.target.value);
    console.log(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Crear un objeto con los datos del formulario
    const formData = {
      emailUsuario,
      passwordUsuario,
    };
  
    try{
      // Mostrar ventana modal de loading en lo que se procesa la peticion
      openLoadingModal();

      // Realizar la peticion http para loguear usuario
      const response = await authService.handleLogin(formData);

      // Si hubo errores en la peticion
      if (response.error)
        throw new MiErrorPersonalizado(response.error || "Error al acceder a la base de datos para loguear usuario");

      // Si no hubo errores cambiar el estado a isAuthenticated y actualizar los valores del usuario
      setearIsAuthenticated()
      
      console.log(response)
      actualizarUsuarioGeneral(response)
      closeLoadingModal()
      window.location.href = '/usuario/cuenta';

    } catch (error) {
      // Configurar mensaje de finalizacion cuando hubo errores
      setHeaderServerMessage("Error en el inicio de sesión del usuario:")
      setServerMessage(error.message)

      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

      // Abrir ventana modal de Mensaje
      openModalMessage()
    }
  };

  return (
    <div className="contenedor-login container">
      <div className="login-encabezado d-flex justify-content-between">
        <img
          className="login-encabezado-imagen"
          src="../images/Logo1.webp"
          alt="logo"
        />
        <div className="login-encabezado-datos">
          <h4>FABRICA DE ARTE</h4>
          <p>fabricadearte@fabricadearte.es</p>
          <p>+53 5 245-51-99</p>
        </div>
      </div>
      <h3>INICIO DE SESIÓN</h3>
      <hr/>

        <Form className="login-formulario container" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email-usuario" style={{width:"100%", maxWidth: "400px"}}>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              onChange={actualizarEmail}
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 flex-grow-1" controlId="password-usuario" style={{width:"100%", maxWidth: "400px"}}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              onChange={actualizarPassword}
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{width:"100%", maxWidth: "400px"}}>
            Iniciar Sesión
          </Button>
        </Form>
        <div className="d-flex justify-content-center">
          No tiene una cuenta? <button className="login-linkTo" onClick={()=>mostrarContenido(1)}><b>Regístrate</b></button>
        </div>

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
              x="0px"
              y="0px"
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
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"
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
          <h5>{headerServerMessage}</h5>
          <p>{serverMessage}</p>
          <Button onClick={closeModalMessage}>Cerrar</Button>
        </Modal>
        
      </div>
  );
};

export default Login;
