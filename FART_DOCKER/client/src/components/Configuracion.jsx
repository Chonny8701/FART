import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import authService from "../helpers/authService";
import Modal from "./Modal";
import ModalLoading from './ModalLoading'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../scss/components/Configuracion.scss";
import { CiEdit } from "react-icons/ci";

const Configuracion = ({actualizarUsuarioGeneral}) => {

  // Estados variables del usuario
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [telefonoUsuario, setTelefonoUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [newPasswordUsuario, setNewPasswordUsuario] = useState("");
  const [originalPasswordUsuario, setOriginalPasswordUsuario] = useState("");
  const [cuentaBancariaUsuario, setCuentaBancariaUsuario] = useState("");

  // Estado para controlar la visibilidad ventana modal de Loading ...
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const closeLoadingModal = () => { setIsLoadingModal(false); };
  const openLoadingModal = () => { setIsLoadingModal(true); };

  // Estado para controlar la visibilidad ventana modal de Dialogo (Aceptar / Cancelar) ...
  const [isOpenModalDialogo, setIsOpenModalDialogo] = useState(false);
  const openModal = () => { setIsOpenModalDialogo(true); };
  const closeModal = () => { setIsOpenModalDialogo(false); };

  // Estado para controlar la visibilidad ventana modal de Mensaje ...
  const [isOpenModalMessage, setIsOpenModalMessage] = useState(false)
  const [headerServerMessage, setHeaderServerMessage] = useState ("")
  const [serverMessage, setServerMessage] = useState ("")
  const openModalMessage = () => { setIsOpenModalMessage(true) }
  const closeModalMessage = () =>{ 
    setIsOpenModalMessage(false); 
    setHeaderServerMessage("");
    setServerMessage("")

    const usuario = {
      nombre: nombreUsuario,
      telefono:telefonoUsuario,
      email: emailUsuario,
      cuenta_bancaria: cuentaBancariaUsuario
    }

    actualizarUsuarioGeneral(usuario)
    window.location.reload()
  }
 
  // Actualizar campos de entrada de datos
  const actualizarNombre = (event) => {
    setNombreUsuario(event.target.value);
  };
  const actualizarTelefono = (event) => {
    setTelefonoUsuario(event.target.value);
  };
  const actualizarEmail = (event) => {
    setEmailUsuario(event.target.value);
  };
  const actualizarNewPassword = (event) => {
    setNewPasswordUsuario(event.target.value);
  };
  const actualizarOriginalPassword = (event) => {
    setOriginalPasswordUsuario(event.target.value);
  };
  const actualizarCuentaBancaria = (event) => {
    setCuentaBancariaUsuario(event.target.value);
  };

  // Actualizar informacion en el servidor
  const actualizarInfoUsuarioServidor = async () =>{
    openLoadingModal();
    const datosActualizados = await authService.actualizarInfoUsuarioDB(nombreUsuario, telefonoUsuario, emailUsuario, newPasswordUsuario, originalPasswordUsuario,cuentaBancariaUsuario)
    closeLoadingModal()

    if (datosActualizados.message){
      setHeaderServerMessage("Confirmacion:")
      setServerMessage(datosActualizados.message)

      if (datosActualizados.data){
        Cookies.set("nombre", datosActualizados.data.nombre)
        Cookies.set("email", datosActualizados.data.email)
        Cookies.set("telefono", datosActualizados.data.telefono)
        Cookies.set("contraseña", datosActualizados.data.contraseña)
        Cookies.set("cuenta_bancaria", datosActualizados.data.cuenta_bancaria)
      }
    }
    else if (datosActualizados.error){
      setHeaderServerMessage("Error en la actualización del usuario:")
      setServerMessage(datosActualizados.message)
    }
    else{
      setHeaderServerMessage("Error en la actualización del usuario:")
      setServerMessage("No se ha podido completar la actualizacion del usuario")
    }
    openModalMessage()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const respuesta = await authService.checkAccessToken(); // Llama a la función de authService
        if (respuesta){
          setNombreUsuario(respuesta.nombre);
          setTelefonoUsuario(respuesta.telefono);
          setEmailUsuario(respuesta.email);
          setCuentaBancariaUsuario(respuesta.cuenta_bancaria);
        }
        else{
          window.location.href = 'http://localhost:5173/usuario';
        }
        
      } catch (error) {
        console.error("Error al verificar el token de acceso:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="contenedor-signup container">
      <h3>AJUSTES DEL PERFIL</h3>
      <hr />
      <Form
        className="d-flex flex-column signup-formulario"
      >
        <Form.Group className="mb-3" controlId="nombre-usuario">
          <Form.Label>
            Nombre completo<b className="asterisco">*</b>
          </Form.Label>
          <div className="input_with_icon">
            <Form.Control
              onChange={actualizarNombre}
              type="text"
              placeholder="Ingrese su nombre"
              value={nombreUsuario}
              required
            />
            <CiEdit className="icon_of_input" />
          </div>
        </Form.Group>

        <div className="d-flex usuario-form-contacto">
          <Form.Group className="mb-3 flex-grow-1" controlId="telefono-usuario">
            <Form.Label>
              Teléfono<b className="asterisco">*</b>
            </Form.Label>
            <div className="input_with_icon">
              <Form.Control
                onChange={actualizarTelefono}
                type="text"
                placeholder="Ingrese su teléfono"
                value={telefonoUsuario}
                required
              />
              <CiEdit className="icon_of_input" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1" controlId="email-usuario">
            <Form.Label>
              E-mail<b className="asterisco">*</b>
            </Form.Label>
            <div className="input_with_icon">
              <Form.Control
                onChange={actualizarEmail}
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={emailUsuario}
                required
              />
              <CiEdit className="icon_of_input" />
            </div>
          </Form.Group>
        </div>

        <div className="d-flex usuario-form-contacto">
          <Form.Group className="mb-3 flex-grow-1" controlId="password-usuario">
            <Form.Label>
              Contraseña<b className="asterisco">*</b>
            </Form.Label>
            <div className="input_with_icon">
              <Form.Control
                onChange={actualizarNewPassword}
                type="password"
                placeholder="Ingrese su contraseña"
              />
              <CiEdit className="icon_of_input" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1" controlId="cuenta-bancaria">
            <Form.Label>Cuenta bancaria</Form.Label>
            <div className="input_with_icon">
              <Form.Control
                onChange={actualizarCuentaBancaria}
                type="text"
                placeholder="Ingrese su número de cuenta bancaria"
                value={cuentaBancariaUsuario}
              />
              <CiEdit className="icon_of_input" />
            </div>
          </Form.Group>
        </div>

        <Button variant="primary"  onClick={openModal}>
          Guardar Cambios
        </Button>
      </Form>

      {/* ---------------------------------Ventana Modal Verificacion--------------------------------- */}
      <Modal isOpen={isOpenModalDialogo} closeModal={closeModal}>
        <h4>Confirmar:</h4>
        <p>Desea guardar las modificaciones realizadas?</p>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">

        <Form className="d-flex flex-column signup-formulario">
          <Form.Group className="mb-3 flex-grow-1" controlId="password-usuario">
            <div className="input_with_icon">
              <Form.Control
                onChange={actualizarOriginalPassword}
                type="password"
                placeholder="Ingrese su contraseña original"
                // value={passwordUsuario}
                required
              />
              <CiEdit className="icon_of_input" />
            </div>
          </Form.Group>
        </Form>

        <div className="d-flex gap-4">
          <Button onClick={actualizarInfoUsuarioServidor} style={{ width: "100px" }}>
            Aceptar
          </Button>
          <Button onClick={closeModal} style={{ width: "100px" }}>
            Cancelar
          </Button>
        </div>
      </div>
      </Modal>

      {/* ---------------------------------Ventana Modal Mensaje--------------------------------- */}
      <Modal isOpen={isOpenModalMessage} closeModal={closeModalMessage}>
        {/* Contenido del modal */}
        <h5>{headerServerMessage}</h5>
        <p>{serverMessage}</p>
        <Button onClick={closeModalMessage}>Cerrar</Button>
      </Modal>

      {/* ---------------------------------Ventana Modal Loading--------------------------------- */}
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


    </div>
  );
};

export default Configuracion;
