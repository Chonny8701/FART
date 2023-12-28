import React, {useEffect, useState} from "react";
import productosServices from "../helpers/productosServices";
import ProductoAgregar from "./ProductoAgregar"
import ProductoPreview from "./ProductoPreview";
import Modal from './Modal'
import ModalLoading from './ModalLoading'
import Button from "react-bootstrap/Button";
import { BsClipboardData} from "react-icons/Bs";
import {LuLampCeiling} from "react-icons/Lu";
import {HiGift} from "react-icons/Hi";
import {GiWoodFrame} from "react-icons/Gi";
import '../scss/components/ProductosUsuario.scss'

const ProductosUsuario = () => {
  const [listaProductos, setListaProductos] = useState ([])
  const [productoSeleccionado, setProductoSeleccionado] = useState ({})

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

  // Ventana modal para agregar un nuevo producto
  const [isOpenModalAgregarProducto , setIsOpenModalAgregarProducto] = useState(false);
  const openModalAgregarProducto = () => { setIsOpenModalAgregarProducto(true); };
  const closeModalAgregarProducto = () => { setIsOpenModalAgregarProducto(false); };

  // Peticion al servidor para obtener todos los productos de un usuario
  const peticionServidor = async (categoria) =>{
    try{
      if (!categoria){
        const res = await productosServices.get_all_products_from_user()
        setListaProductos(res.data)
      } else {
        const res = await productosServices.get_all_products_from_user(categoria)
        setListaProductos(res.data)
      }
        
      // Cerrar ventana modal de Loading ...
      closeLoadingModal()
      // console.log(listaProductos)

    } catch (error){
      // Configurar mensaje de finalizacion cuando hubo errores
      setHeaderServerMessage("Error al acceder a los productos del usuario");
      setServerMessage(error)

      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

      // Abrir ventana modal de Mensaje
      openModalMessage()
    }
  }

  useEffect(() => {
    // Mostrar ventana modal de loading en lo que se procesa la peticion
    openLoadingModal();

    // Peticion al servidor para obtener todos los productos de un usuario
    peticionServidor()
  }, []);

  return (
    <div className="productos-usuario-container-general">
      <h3>MIS PRODUCTOS</h3>
      <hr />
      <Button variant="primary" onClick={openModalAgregarProducto} style={{ borderRadius: '36px', padding: '10px 20px' }}>
        Añadir Producto
      </Button>

      <div className="contenedor-categorias">
        <h4>CATEGORIAS</h4>
        <div className="productos-fila-filtros">
        <div className="productos-categorias" onClick={() => peticionServidor()}>
            <BsClipboardData  />
            <p className="texto-categoria">Todos</p>
          </div>

          <div className="productos-categorias" onClick={() => peticionServidor('Adornos Hogar')}>
            <LuLampCeiling  />
            <p className="texto-categoria">Hogar</p>
          </div>

          <div className="productos-categorias" onClick={() => peticionServidor('Manualidades')}>
            <HiGift />
            <p className="texto-categoria">Manualidades</p>
          </div>

          <div className="productos-categorias" onClick={() => peticionServidor('Pinturas')}>
            <GiWoodFrame  />
            <p className="texto-categoria">Pinturas</p>
          </div>
        </div>
      </div>

      <div className="contenedor-productos">
        {/* <h4>PRODUCTOS DE LA TIENDA</h4> */}
        <div className="productos-visualizar-productos">
          {listaProductos.length === 0 ? (
            <p>No se han encontrado productos disponibles.</p>
          ) : (
            listaProductos.map((item) => (
              <ProductoPreview
                key={item.id}
                id={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                precio={item.precio}
                categoria={item.categoria}
                url_imagen= {import.meta.env.VITE_SERVER_ROUTE + '/productos/uploads/images/' + item.url_imagen}
                codigo_usuario={item.codigo_usuario}
                abrirModalEditarProducto = {openModalAgregarProducto}
              />
            ))
          )}
        </div>
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

      {/* ---------------------------------Ventana Modal Agregar Producto--------------------------------- */}
      <Modal isOpen={isOpenModalAgregarProducto} closeModal={closeModalAgregarProducto}>
        <h4>Nuevo Producto:</h4>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
          <ProductoAgregar idProduct = {productoSeleccionado.id} nombreProduct = {productoSeleccionado.nombre}  descripcionProduct ={productoSeleccionado.descripcion}  precioProduct = {productoSeleccionado.precio}  imagenProduct = {productoSeleccionado.url_imagen} previewUrlProduct = {productoSeleccionado.url_imagen } evento = "Editar"  closeModalAgregarProducto= {closeModalAgregarProducto}/>
        </div>
      </Modal>

    </div>
  );
};

export default ProductosUsuario;
