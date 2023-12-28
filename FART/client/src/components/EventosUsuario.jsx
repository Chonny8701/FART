import React, {useEffect, useState} from "react";
import eventosServices from "../helpers/eventosServices";
import EventoAgregar from "../components/EventoAgregar"
import EventoPreview from "../components/EventoPreview";
import Modal from '../components/Modal'
import ModalLoading from '../components/ModalLoading'
import Button from "react-bootstrap/Button";
import '../scss/components/EventosUsuario.scss'

const EventosUsuario = () => {
  const [listaEventos, setListaEventos] = useState ([])
  const [eventoSeleccionado, setEventoSeleccionado] = useState ({})

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

  // Ventana modal para agregar un nuevo evento
  const [isOpenModalAgregarEvento , setIsOpenModalAgregarEvento] = useState(false);
  const openModalAgregarEvento = () => { setIsOpenModalAgregarEvento(true); };
  const closeModalAgregarEvento = () => { setIsOpenModalAgregarEvento(false); };

  // Peticion al servidor para obtener todos los eventos de un usuario
  const peticionServidor = async () =>{
    try{
      // Mostrar ventana modal de loading en lo que se procesa la peticion
      openLoadingModal();

      // Llamar funcion que realiza peticion http para obtener los eventos del usuario
      const res = await eventosServices.get_all_events_from_user()
      setListaEventos(res.data)

      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

    } catch (error){
      // Configurar mensaje de finalizacion cuando hubo errores
      setHeaderServerMessage("Error al acceder a los eventos del usuario");
      setServerMessage(error)

      // Cerrar ventana modal de Loading ...
      closeLoadingModal()

      // Abrir ventana modal de Mensaje
      openModalMessage()
    }
  }

  useEffect(() => {
    // Peticion al servidor para obtener todos los eventos de un usuario
    peticionServidor()
  }, []);

  return (
    <div className="eventos-usuario-container-general">
      <h3>MIS EVENTOS</h3>
      <hr />
      <Button variant="primary" onClick={openModalAgregarEvento} style={{ borderRadius: '36px', padding: '10px 20px' }}>
        Añadir Evento
      </Button>

      <div className="contenedor-eventos container-fluid">
        {/* <h4>PRODUCTOS DE LA TIENDA</h4> */}
        <div className="d-flex flex-column eventos-visualizar-eventos justify-content-center align-items-center">
          {listaEventos.length === 0 ? (
            <p>No se han encontrado eventos disponibles.</p>
          ) : (
            listaEventos.map((item) => (
              <EventoPreview
                key={item.id}
                id={item.id}
                titulo={item.titulo}
                descripcion={item.descripcion}
                organizador={item.organizador}
                ubicacion={item.ubicacion}
                fecha={item.fecha}
                telefono={item.telefono}
                email={item.email}
                url_imagen= {import.meta.env.VITE_SERVER_ROUTE + '/eventos/uploads/images/' + item.url_imagen}
                abrirModalEditarEvento = {openModalAgregarEvento}
              />
            ))
          )}
        </div>
      </div>

      {/* <div className="eventos-fila-pasar">
          <button><BsChevronLeft /> Anterior</button>
          <button>Siguiente <BsChevronRight /></button>
      </div> */}



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

      {/* ---------------------------------Ventana Modal Agregar Evento--------------------------------- */}
      <Modal isOpen={isOpenModalAgregarEvento} closeModal={closeModalAgregarEvento}>
        <h4>Nuevo Evento:</h4>
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
          <EventoAgregar idEvento = {eventoSeleccionado.id} tituloEvento = {eventoSeleccionado.titulo}  descripcionEvento ={eventoSeleccionado.descripcion} organizadorEvento ={eventoSeleccionado.organizador} ubicacionEvento ={eventoSeleccionado.ubicacion} fechaEvento ={eventoSeleccionado.fecha} imagenProduct = {eventoSeleccionado.url_imagen} previewUrlProduct = {eventoSeleccionado.url_imagen } closeModalAgregarEvento= {closeModalAgregarEvento}/>
        </div>
      </Modal>

    </div>
  );
};

export default EventosUsuario;
