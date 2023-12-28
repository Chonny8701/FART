import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Importa la librería Cookies
import Modal from '../components/Modal'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import imagenBlanco from "../images/imagen-blanco.webp";
import eventosServices from "../helpers/eventosServices";

const EventoAgregar = ({ closeModalAgregarEvento }) => {

  const [tituloEvento, setTituloEvento] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [organizadorEvento, setOrganizadorEvento] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");
  const [telefonoEvento, setTelefonoEvento] = useState("");
  const [emailEvento, setEmailEvento] = useState("");
  const [imagenEvento, setImagenEvento] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imagenBlanco);

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

    setTituloEvento("");
    setDescripcionEvento("");
    setOrganizadorEvento("");
    setUbicacionEvento("");
    setFechaEvento("");
    setImagenEvento(imagenBlanco)
    setPreviewUrl()
    window.location.reload()
  }

  useEffect(() => {
    console.log("Verificar access token")
    try{
      if(Cookies.get("access_token"))
        setOrganizadorEvento(Cookies.get("access_token")) 
      else{
        // Eliminar la cookie de autenticación
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("email_token");
        Cookies.remove("usuario");

        // Redirigir al usuario a la página de inicio
        window.location.href = "/usuario";
      }
    } catch (error){
      // Eliminar la cookie de autenticación
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("email_token");
      Cookies.remove("usuario");

      // Redirigir al usuario a la página de inicio
      window.location.href = "/usuario";
    }
  }, []);

  const actualizarTituloEvento = (event) => {
    setTituloEvento(event.target.value);
    console.log(event.target.value)
  };

  const actualizarDescripcionEvento = (event) => {
    setDescripcionEvento(event.target.value);
  };

  const actualizarOrganizadorEvento = (event) => {
    setOrganizadorEvento(event.target.value);
  };

  const actualizarUbicacionEvento = (event) => {
    setUbicacionEvento(event.target.value);
  };

  const actualizarFechaEvento = (event) => {
    // Convertir el string que devuelve el input en una variable de tipo date para guardarla en el servidor
    const fecha = new Date(event.target.value);

    // Convierte la fecha a ISO 8601 que es el formato valido para almacenar en la DB
    const fechaISO8601 = fecha.toISOString(); 
    setFechaEvento(fechaISO8601);
  };

  const actualizarTelefonoEvento = (event) => {
    setTelefonoEvento(event.target.value);
  };

  const actualizarEmailEvento = (event) => {
    setEmailEvento(event.target.value);
  };

  // Manejar el cambio en el campo de entrada de archivo
  const actualizarImagenEvento = (e) => {
    const file = e.target.files[0];
    setImagenEvento(file);

    // Mostrar la vista previa de la imagen
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar datos de formulario, incluida la imagen
    const datosEvento = new FormData();
    datosEvento.append('titulo', tituloEvento);
    datosEvento.append('descripcion', descripcionEvento);
    // datosEvento.append('organizador', organizadorEvento);
    datosEvento.append('ubicacion', ubicacionEvento);
    datosEvento.append('fecha', fechaEvento);
    datosEvento.append('telefono', telefonoEvento);
    datosEvento.append('email', emailEvento);
    datosEvento.append('imagen', imagenEvento); // Agregar la imagen al formulario

    try{
      openLoadingModal()
      const respuesta = await eventosServices.add_user_event(datosEvento)
      console.log(respuesta)

      if (respuesta.error){
        setHeaderServerMessage("Error agregando evento: ")
        setServerMessage(respuesta.error)
      } else{
        setHeaderServerMessage("Confirmación: ")
        setServerMessage(respuesta.message)
      }

    } catch (error) {
      setHeaderServerMessage("Error agregando evento: ")
      setServerMessage(error)
      
    } finally{
      closeLoadingModal()
      openModalMessage()
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Vista previa" style={{ maxWidth: "100%" }} />
          </div>
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" accept="image/*" onChange={actualizarImagenEvento} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="titulo-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            onChange={actualizarTituloEvento}
            type="text"
            placeholder="Ingrese el titulo del evento "
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            onChange={actualizarDescripcionEvento}
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            required
            style={{ overflowWrap: 'break-word' }}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="organizador-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Organizador</Form.Label>
          <Form.Control
            onChange={actualizarOrganizadorEvento}
            type="text"
            placeholder="Ingrese el nombre del organizador"
            required
          />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="ubicacion-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control
            onChange={actualizarUbicacionEvento}
            type="text"
            placeholder="Ingrese la dirección del evento"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fecha-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            onChange={actualizarFechaEvento}
            type="date"
            placeholder="Ingrese el nombre del organizador"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefono-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Telefono de Contacto</Form.Label>
          <Form.Control
            onChange={actualizarTelefonoEvento}
            type="text"
            placeholder="Ingrese un telefono de contacto"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ubicacion-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Correo de contacto</Form.Label>
          <Form.Control
            onChange={actualizarEmailEvento}
            type="email"
            placeholder="Ingrese un correo de contacto"
            required
          />
        </Form.Group>

        <div className="d-flex gap-4">
          <Button type="submit" style={{ width: "100px" }}>
            Agregar
          </Button>
          <Button onClick={()=>{setImagenEvento(imagenBlanco);setPreviewUrl(imagenBlanco);closeModalAgregarEvento()}} style={{ width: "100px" }}>
            Cancelar
          </Button>
        </div>
      </Form>

      {/* Modal Mensaje OK / ERROR */}
      <Modal isOpen={isOpenModalMessage} closeModal={closeModalMessage}>
        {/* Contenido del modal */}
        <h4>{headerServerMessage}</h4>
        <p>{serverMessage}</p>
        <Button onClick={closeModalMessage}>Cerrar</Button>
      </Modal>
    </>
  );
};

export default EventoAgregar;
