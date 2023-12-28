import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Importa la librería Cookies
import { v4 as uuidv4 } from 'uuid';
import cestaService from "../helpers/cestaServices";
import authService from "../helpers/authService";
import ProductoCesta from "../components/ProductoCesta";
import Modal from '../components/Modal'
import ModalLoading from '../components/ModalLoading'
import ModalPago from '../components/ModalPago'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../scss/components/Cesta.scss";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/Stripe/CheckoutForm'
import { loadStripe } from "@stripe/stripe-js";

const Cesta = () => {
  const [listaProductos, setListaProductos] = useState([]);

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // Estado para controlar la visibilidad ventana modal de Loading ...
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const closeLoadingModal = () => {setIsLoadingModal(false)};
  const openLoadingModal = () => {setIsLoadingModal(true)};

  // Estado para controlar la visibilidad ventana modal Consulta si desea hacer donacion
  const [isOpenModalConsulta, setIsOpenModalConsulta] = useState(false)
  const openModalConsulta = () => { setIsOpenModalConsulta(true) }
  const closeModalConsulta = () =>{ setIsOpenModalConsulta(false) }

  // Estado para controlar la visibilidad ventana modal de Pago ...
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false)
  const openModalPayment = () => { setIsOpenModalPayment(true) }
  const closeModalPayment = () =>{ setIsOpenModalPayment(false) }

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

  const peticionServidor = async () => {
    try {

      // Comprobar que si existe un access_token en las cookies (Usuario Logueado)
      if (Cookies.get('access_token')){

        // Hacer petición al servidor para comprobar access_token sea valido
        const productos = await cestaService.get_all_products();
        console.log("Status: "+productos.status)

        // Si la respuesta es error 401 es que el usuario no esta logueado o el token esta caducado
        if (productos.status ==  "401"){
          const productosCookies = Cookies.get("cesta_usuario");
          setListaProductos(productosCookies);
          authService.handleLogout();

        // Si el usuario está logueado, obtener cesta de DB
        } else if ( productos.status == "200" || productos.status == "201"){
          setListaProductos(productos.data);
          console.log(productos.data)
        }

      // Si el usuario no esta logueado usar cesta de las cookies
      } else {
        setListaProductos(JSON.parse(Cookies.get("cesta_usuario")) || []);
        console.log(Cookies.get("cesta_usuario"))
      }

    } catch (error) {
      console.log(error);

      setListaProductos(JSON.parse(Cookies.get("cesta_usuario")) || []);
    }
  };

  useEffect(() => {
    peticionServidor();
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_ROUTE +"/stripe/config").then(async (r) => {
      const { publishableKey } = await r.json();
      // console.log(publishableKey)
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_ROUTE + "/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      // console.log(clientSecret)
      setClientSecret(clientSecret);
    });
  }, []);

  const calcularTotal = () => {
    return listaProductos.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio;
    }, 0);
  };

  const realizarPeticionPago = () =>{
    // Si la cetas contiene productos preguntar si desea hacer donacion
    if (calcularTotal()){
      openModalConsulta()

    //Si la cesta esta a 0 lanzar modal que se necesitan agregar productos a la cesta
    } else {
      setHeaderServerMessage("Notificación");
      setServerMessage("Para proceder a la compra debe añadir al menos un producto a la cesta")
      openModalMessage()
    }
  }

  return (
    <div className="cesta-usuario-container-general">
      <h4 >Cesta de la compra</h4>
      <hr />
      <div className="container">
        <Row className="cesta-contenedor-general">
          <Col className="columna-izquierda-cesta ">
            <h4>Resumen de la compra</h4>
            <Table striped borderless hover >
              <thead>
                <tr>
                  <th className="tabla-columna-nombre">Nombre</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {listaProductos.map((producto, index) => (
                  <tr key={index}>
                    <td style={{ maxWidth: "90px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio.toFixed(2) } &euro;</td>
                    <td>{(producto.cantidad * producto.precio).toFixed(2)} &euro;</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{width:"80px", height:"80px", borderRadius:"50%", backgroundColor:"green", color: "white"}}>Total: <b>{calcularTotal().toFixed(2)} &euro;</b> </div>
            <Button variant="primary" className="producto-button" onClick={realizarPeticionPago} style={{justifyContent: "center"}}>
              Comprar productos
            </Button>
          </Col>

          <Col className="columna-derecha-cesta " style={{ padding: "0px" }}>
            {listaProductos && listaProductos.length > 0 ? (
              listaProductos.map((producto, index) => (
                <ProductoCesta
                  className = "producto-cesta"
                  key={uuidv4()}
                  id={producto.id}
                  nombre={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  cantidad={producto.cantidad}
                  url_imagen={
                    import.meta.env.VITE_SERVER_ROUTE +
                    "/productos/uploads/images/" +
                    producto.url_imagen
                  }
                />
              ))
            ) : (
              <p className="d-flex justify-content-center">La cesta está vacía.</p>
            )}
          </Col>
        </Row>
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

      {/* -----------------------------Ventana Modal Consulta Pago Donacion----------------------------- */}
      <Modal isOpen={isOpenModalConsulta} closeModal={closeModalConsulta} width="100">
        {/* Contenido del modal */}
        <h5>Notificación</h5>
        <p>Los artículos en venta de esta página son con fines didáctivos y no se encuentran a la venta. Sin embargo puede realizar una donacion de 5.00 &euro; si desea probar nuestra pasarela de pago</p>
        <div className="d-flex justify-content-center gap-4">
        <Button onClick={()=>{closeModalConsulta(); openModalPayment()}}>Continuar</Button>
        <Button onClick={closeModalConsulta}>Cancelar</Button>
        </div>

      </Modal>

      {/* -----------------------------Ventana Modal Pasarela de pago----------------------------- */}
      <ModalPago isOpen={isOpenModalPayment} closeModal={closeModalPayment}>
        <div className="container main-container">
          <h5>Información de pago</h5>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </ModalPago>

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

export default Cesta;

