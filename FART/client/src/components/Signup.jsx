import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../scss/components/Signup.scss";
import authService from "../helpers/authService";
import Modal from './Modal'
import ModalLoading from './ModalLoading'
import { MiErrorPersonalizado} from "../helpers/generales";

const Signup = ({mostrarContenido}) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [cuentaBancariaUsuario, setCuentaBancariaUsuario] = useState("");

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
  const actualizarNombre = (event) => {
    setNombreUsuario(event.target.value);
    console.log(event.target.value);
  };
  const actualizarTelefono = (event) => {
    setTelefonoUsuario(event.target.value);
    console.log(event.target.value);
  };
  const actualizarEmail = (event) => {
    setEmailUsuario(event.target.value);
    console.log(event.target.value);
  };
  const actualizarPassword = (event) => {
    setPasswordUsuario(event.target.value);
    console.log(event.target.value);
  };
  const actualizarCuentaBancaria = (event) => {
    setCuentaBancariaUsuario(event.target.value);
    console.log(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Crear un objeto con los datos del formulario
    const formData = {
      nombreUsuario,
      telefonoUsuario,
      emailUsuario,
      passwordUsuario,
      cuentaBancariaUsuario,
    };

    try{
      // Mostrar ventana modal de loading en lo que se procesa la peticion
      openLoadingModal();

      // Realizar la peticion http para añadir usuario
      const response = await authService.handleSignUp(formData)

      // Si hubo errores en la peticion
      if (response.error)
        throw new MiErrorPersonalizado(response.error || "Error en la peticion al servidor para el registro del nuevo usuario");

      // Si la petición finalizó correctamente configurar mensaje de finalizacion
      setHeaderServerMessage("Confirmacion:")
      setServerMessage("Usuario registrado correctamente")

    } catch (error){
      if (error instanceof MiErrorPersonalizado) {
        // Configurar mensaje de finalizacion cuando hubo errores
        setHeaderServerMessage("Error en registro de usuario:")
        setServerMessage(error.message)
      } else {
        setServerMessage(error)
      }
    } finally{
      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

      // Abrir ventana modal de Mensaje
      openModalMessage()
    }
  };
  
  return (
    <div className="contenedor-signup container">
      <div className="signup-encabezado d-flex justify-content-between">
        <img
          className="signup-encabezado-imagen"
          src="../images/Logo1.webp"
          alt="logo"
        />
        <div className="signup-encabezado-datos">
          <h4>FABRICA DE ARTE</h4>
          <p>fabricadearte@fabricadearte.es</p>
          <p>+53 5 245-51-99</p>
        </div>
      </div>
      <h3>REGISTRO DE USUARIO</h3>
      <hr />

      <Form className="d-flex flex-column signup-formulario" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre-usuario">
          <Form.Label>
            Nombre completo<b className="asterisco">*</b>
          </Form.Label>
          <Form.Control
            onChange={actualizarNombre}
            type="text"
            placeholder="Ingrese su nombre"
            required
          />
        </Form.Group>

        <div className="d-flex usuario-form-contacto">
          <Form.Group className="mb-3 flex-grow-1" controlId="telefono-usuario">
            <Form.Label>
              Teléfono<b className="asterisco">*</b>
            </Form.Label>
            <Form.Control
              onChange={actualizarTelefono}
              type="text"
              placeholder="Ingrese su teléfono"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1" controlId="email-usuario">
            <Form.Label>
              E-mail<b className="asterisco">*</b>
            </Form.Label>
            <Form.Control
              onChange={actualizarEmail}
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </Form.Group>
        </div>
        <div className="d-flex usuario-form-contacto">
          <Form.Group className="mb-3 flex-grow-1" controlId="password-usuario">
            <Form.Label>
              Contraseña<b className="asterisco">*</b>
            </Form.Label>
            <Form.Control
              onChange={actualizarPassword}
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1" controlId="cuenta-bancaria">
            <Form.Label>Cuenta bancaria</Form.Label>
            <Form.Control
              onChange={actualizarCuentaBancaria}
              type="text"
              placeholder="Ingrese su número de cuenta bancaria"
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
        
      </Form>
      <div>
        Ya tienes una cuenta? <button className="signUp-linkTo" onClick={()=>mostrarContenido(0)}><b>Inicia Sesión</b></button>
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

export default Signup;
