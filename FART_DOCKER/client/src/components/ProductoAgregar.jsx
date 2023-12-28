import React, { useState, useEffect } from "react";
import Modal from '../components/Modal'
import ModalLoading from '../components/ModalLoading'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie"; // Importa la librería Cookies
import productosServices from "../helpers/productosServices"
import imagenBlanco from "../images/imagen-blanco.webp";

const ProductoAgregar = ({ closeModalAgregarProducto }) => {

  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("Adornos Hogar ");
  const [imagenProducto, setImagenProducto] = useState(null);
  const [usuarioProducto, setUsuarioProducto] = useState("");
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

    setNombreProducto("");
    setDescripcionProducto("");
    setPrecioProducto("");
    setImagenProducto(imagenBlanco)
    setPreviewUrl()
    window.location.reload()
  }

  useEffect(() => {
    console.log("Verificar access token")
    try{
      if(Cookies.get("access_token"))
        setUsuarioProducto(Cookies.get("access_token")) 
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

  const actualizarNombreProducto = (event) => {
    setNombreProducto(event.target.value);
    console.log(event.target.value)
  };

  const actualizarDescripcionProducto = (event) => {
    setDescripcionProducto(event.target.value);
  };

  const actualizarPrecioProducto = (event) => {
    const inputValue = event.target.value;

    // Utiliza una expresión regular para validar que el valor contiene solo números, punto o coma
    if (/^[0-9,.]*$/.test(inputValue))
      setPrecioProducto(inputValue); // Almacenar el valor en el estado
  }

  const actualizarCategoriaProducto = (event) => {
    setCategoriaProducto(event.target.value);
  };

  // Manejar el cambio en el campo de entrada de archivo
  const actualizarImagenProducto = (e) => {
    const file = e.target.files[0];
    setImagenProducto(file);

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
    const datosProducto = new FormData();
    datosProducto.append('nombre', nombreProducto);
    datosProducto.append('descripcion', descripcionProducto);
    datosProducto.append('precio', precioProducto);
    datosProducto.append('categoria', categoriaProducto);
    datosProducto.append('imagen', imagenProducto); // Agregar la imagen al formulario
    datosProducto.append('fk_usuario', usuarioProducto);

    try{
      openLoadingModal()
      const respuesta = await productosServices.add_user_product(datosProducto)
      console.log(respuesta)

      if (respuesta.error){
        setHeaderServerMessage("Error agregando producto: ")
        setServerMessage(respuesta.error)
      } else{
        setHeaderServerMessage("Confirmación: ")
        setServerMessage(respuesta.message)
      }

    } catch (error) {
      setHeaderServerMessage("Error agregando producto: ")
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
          <Form.Control type="file" accept="image/*" onChange={actualizarImagenProducto} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nombre-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={actualizarNombreProducto}
            type="text"
            placeholder="Ingrese el nombre"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            onChange={actualizarDescripcionProducto}
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            required
            style={{ overflowWrap: 'break-word' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="precio-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Precio</Form.Label>
          <Form.Control
            onChange={actualizarPrecioProducto}
            type="text"
            placeholder="Ingrese el precio"
            required
            value = {precioProducto}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoria-producto" style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label>Categorías</Form.Label>
          <Form.Select aria-label="Default select example" onChange={actualizarCategoriaProducto} defaultValue="Adornos Hogar">
            <option value="Adornos Hogar">Adornos Hogar</option>
            <option value="Manualidades">Manualidades</option>
            <option value="Pinturas">Pinturas</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex gap-4">
          <Button type="submit" style={{ width: "100px" }}>
            Agregar
          </Button>
          <Button onClick={()=>{setImagenProducto(imagenBlanco);setPreviewUrl(imagenBlanco);closeModalAgregarProducto()}} style={{ width: "100px" }}>
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

export default ProductoAgregar;
