import React, { useState, useEffect } from "react";
import Modal from '../components/Modal'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import productosServices from "../helpers/productosServices"

const ProductoEditar = ({my_id,  my_nombre, my_descripcion, my_precio, my_url_imagen, my_categoria, my_codigo_usuario, closeModalEditarProducto}) => {
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
  const [nombre, setNombre] = useState(my_nombre);
  const [descripcion, setDescripcion] = useState(my_descripcion);
  const [precio, setPrecio] = useState(my_precio);
  const [categoria, setCategoria] = useState(my_categoria);
  const [imagen, setImagen] = useState(null);
  const [codigo_usuario, setUsuario] = useState(my_codigo_usuario);
  const [previewUrl, setPreviewUrl] = useState(my_url_imagen);

  // Estado para controlar la visibilidad ventana modal de Loading ...
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const closeLoadingModal = () => {setIsLoadingModal(false)};
  const openLoadingModal = () => {setIsLoadingModal(true)};

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
  const actualizarNombre = (event) => {
    setNombre(event.target.value);
    console.log(event.target.value)
  };

  const actualizarDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const actualizarPrecio = (event) => {
    const inputValue = event.target.value;

    // Utiliza una expresión regular para validar que el valor contiene solo números, punto o coma
    if (/^[0-9,.]*$/.test(inputValue))
      setPrecio(inputValue); // Almacenar el valor en el estado 
  };

  const actualizarCategoria = (event) => {
    setCategoria(event.target.value);
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
    
    const peticionEditarProducto = async () => {

      // Crear un objeto FormData para enviar datos de formulario, incluida la imagen
      const datosProducto = new FormData();
      datosProducto.append('id', id);
      datosProducto.append('nombre', nombre);
      datosProducto.append('descripcion', descripcion);
      datosProducto.append('precio', precio);
      datosProducto.append('categoria', categoria);
      datosProducto.append('imagen', imagen); // Agregar la imagen al formulario
      datosProducto.append('codigo_usuario', codigo_usuario);
  
      try{
        const respuesta = await productosServices.edit_user_product(datosProducto)
        console.log(respuesta)
  
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

    await peticionEditarProducto();
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
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={actualizarNombre}
            type="text"
            placeholder="Ingrese el nombre"
            value = {nombre}
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

        <Form.Group className="mb-3" controlId="descripcion-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Precio</Form.Label>
          <Form.Control
            onChange={actualizarPrecio}
            type="text"
            placeholder="Ingrese el precio"
            value = {precio}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoria-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Categorías</Form.Label>
          <Form.Select aria-label="Default select example" onChange={actualizarCategoria} value={categoria}>
            <option value="Adornos Hogar">Adornos Hogar</option>
            <option value="Manualidades">Manualidades</option>
            <option value="Pinturas">Pinturas</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex gap-4 justify-content-center">
          <Button type="submit" style={{ width: "100px" }}>
            Actualizar
          </Button>
          <Button onClick={closeModalEditarProducto} style={{ width: "100px" }}>
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

export default ProductoEditar;
