import React, { useState, useEffect } from "react";
import Modal from '../components/Modal'
import eventosServices from "../helpers/eventosServices";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EventoEditar = ({my_id,  my_titulo, my_descripcion, my_organizador, my_ubicacion, my_fecha, my_telefono, my_email,  my_url_imagen, closeModalEditarEvento}) => {
  const obtenerNombreImagen = (url) => {
    const partes = url.split('/'); // Dividir el texto en partes utilizando "/"
    const nombreImagen = partes[partes.length - 1]; // Obtener el último segmento
    return nombreImagen;
  }
  // Función para cargar una imagen desde una URL y devolverla como Blob
  const cargarImagen = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const imagenBlob = await response.blob();
        const imagenComoArchivo = new File([imagenBlob], obtenerNombreImagen(my_url_imagen));
        return imagenComoArchivo;
      } else {
        throw new Error('Error al cargar la imagen');
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      throw error;
    }
  };

  const [id, setId] = useState(my_id);
  const [titulo, setTitulo] = useState(my_titulo);
  const [descripcion, setDescripcion] = useState(my_descripcion);
  const [organizador, setOrganizador] = useState(my_organizador);
  const [ubicacion, setUbicacion] = useState(my_ubicacion);
  const [fecha, setFecha] = useState(my_fecha);
  const [telefono, setTelefono] = useState(my_telefono);
  const [email, setEmail] = useState(my_email);
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(my_url_imagen);

  // Estado para controlar la visibilidad ventana modal de Mesaje ...
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

  // Inicializar variables
  useEffect(() => {
    cargarImagen(my_url_imagen)
      .then((imagenBlob) => {
        setImagen(imagenBlob);
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });

  }, []);

  // Funciones para actualizar valores de los inputs del formulario
  const actualizarTitulo = (event) => {
    setTitulo(event.target.value);
    console.log(event.target.value)
  };

  const actualizarDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const actualizarUbicacion = (event) => {
    setUbicacion(event.target.value);
    console.log(event.target.value)
  };

  const actualizarFecha = (event) => {
    // Convertir el string que devuelve el input en una variable de tipo date para guardarla en el servidor
    const fecha = new Date(event.target.value);

    // Convierte la fecha a ISO 8601 que es el formato valido para almacenar en la DB
    const fechaISO8601 = fecha.toISOString(); 
    setFecha(fechaISO8601);
  };

  const actualizarTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const actualizarEmail = (event) => {
    setEmail(event.target.value);
  };

  const actualizarImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    // Mostrar la vista previa de la imagen
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  // Manejar el envío del formulario para editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const peticionEditarEvento = async () => {

      // Crear un objeto FormData para enviar datos de formulario, incluida la imagen
      const datosEvento = new FormData();
      datosEvento.append('id', id);
      datosEvento.append('titulo', titulo);
      datosEvento.append('descripcion', descripcion);
      datosEvento.append('ubicacion', ubicacion);
      datosEvento.append('fecha', fecha);
      datosEvento.append('telefono', telefono);
      datosEvento.append('email', email);
      datosEvento.append('imagen', imagen); // Agregar la imagen al formulario
  
      try{
        const respuesta = await eventosServices.edit_user_event(datosEvento)
  
        if (respuesta.error){
          setHeaderServerMessage("Error editando producto: ")
          setServerMessage(respuesta.error)
        } else{
          setHeaderServerMessage("Confirmación: ")
          setServerMessage(respuesta.message)
        }
  
      } catch (error) {
        setHeaderServerMessage("Error agregando producto: ")
        setServerMessage(error)
        
      } finally{
        openModalMessage()
      }
    };

    await peticionEditarEvento();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Vista previa" style={{ maxWidth: "100%" }} />
          </div>
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" accept="image/*" onChange={actualizarImagen} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nombre-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            onChange={actualizarTitulo}
            type="text"
            placeholder="Ingrese el titulo del evento"
            value = {titulo}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            onChange={actualizarDescripcion}
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            required
            value = {descripcion}
            style={{ overflowWrap: 'break-word' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ubicacion-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control
            onChange={actualizarUbicacion}
            type="text"
            placeholder="Ingrese la dirección del evento"
            required
            value = {ubicacion}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fecha-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            onChange={actualizarFecha}
            type="date"
            placeholder="Ingrese el nombre del organizador"
            required
            value = {fecha}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefono-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Telefono de Contacto</Form.Label>
          <Form.Control
            onChange={actualizarTelefono}
            type="text"
            placeholder="Ingrese un telefono de contacto"
            required
            value = {telefono}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ubicacion-evento" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Correo de contacto</Form.Label>
          <Form.Control
            onChange={actualizarEmail}
            type="text"
            placeholder="Ingrese un correo de contacto"
            required
            value = {email}
          />
        </Form.Group>

        <div className="d-flex gap-4 justify-content-center">
          <Button type="submit" style={{ width: "100px" }}>
            Actualizar
          </Button>
          <Button onClick={closeModalEditarEvento} style={{ width: "100px" }}>
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

export default EventoEditar;
