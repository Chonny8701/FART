import React, {useState} from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
import cestaServices from "../helpers/cestaServices";
import Modal from '../components/Modal'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { BsCart3 } from 'react-icons/bs';
import '../scss/components/Producto.scss';

const Producto = (props) => {
  const {imageSrc,  nombre, descripcion, precio, url_imagen, tipo} = props;
  const [cantidad, setCantidad] = useState (1)

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

  const actualizarCantidad = (e) =>{
    setCantidad(e.target.value)
  }

  const enviarProductoACesta = async () =>{
    // Si el usuario esta autenticado enviar a CESTA_DB
    if (Cookies.get('access_token')){

      // Crear un objeto FormData para enviar datos del producto
      const producto = new FormData();
      producto.append('id', uuidv4());
      producto.append('nombre', nombre);
      producto.append('descripcion', descripcion);
      producto.append('precio', precio);
      producto.append('cantidad', cantidad);
      producto.append('url_imagen', url_imagen);
      
      try{
        // Hacer peticion para agregar producto a la base de datos
        const respuesta = await cestaServices.add_product_to_basketDB(producto)
  
        if (respuesta.status == "200" || "201"){
          setHeaderServerMessage("Confirmación: ")
          setServerMessage(respuesta.message)

        } else{
          setHeaderServerMessage("Error agregando producto a la cesta: ")
          setServerMessage(respuesta.error)
        }
  
      } catch (error) {
        setHeaderServerMessage("Error agregando producto a la cesta: ")
        setServerMessage(error)  
      } finally{
        openModalMessage()
      }

    // Si el usuario no esta autenticado guardar en Cesta-Cookies
    } else {

      // Comprobar si existe la cookie cesta_usuario y si no existe
      if (!(Cookies.get('cesta_usuario'))){
        Cookies.set('cesta_usuario', [])
      }

      // Analiza la cadena JSON en un objeto JavaScript o inicializa un arreglo vacío si la cookie está vacía
      const cestaUsuarioString = Cookies.get('cesta_usuario');
      const cestaUsuario = cestaUsuarioString ? JSON.parse(cestaUsuarioString) : [];
      
      // Definir producto a añadir
      const nuevoProducto = { id:uuidv4(), nombre: nombre, descripcion: descripcion, precio: precio, cantidad: cantidad, url_imagen: url_imagen };

      // Agrega el nuevo producto a la cesta
      cestaUsuario.push(nuevoProducto);

      // Guarda la cesta actualizada en la cookie
      Cookies.set('cesta_usuario', JSON.stringify(cestaUsuario));
      
      console.log("Datos en cookies: "+Cookies.get('cesta_usuario') )
    }
  }

  return (
    <>
      <Card className = "producto-card-container" >
        <Card.Img variant="top" src={imageSrc} className="producto-card-image"/>
        <Card.Body className="producto-card-body">
          <Card.Title className="producto_ truncado_1_fila">{nombre}</Card.Title>
          {/* <Card.Text className="producto-card-descripcion">{descripcionReducida}</Card.Text> */}
          <Card.Text><b>{precio.toFixed(2)} &euro;</b></Card.Text>
          <Form.Select aria-label="Default select example" onChange={actualizarCantidad}>
            <option>Cantidad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </Form.Select>
          <Button variant="primary" className="producto-button" onClick={enviarProductoACesta}>Enviar a la cesta<BsCart3 className="cart-icon"/></Button>
        </Card.Body>
      </Card>


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

export default Producto;
