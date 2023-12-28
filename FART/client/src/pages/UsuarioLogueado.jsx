import React, {useState} from 'react'
import Configuracion from '../components/Configuracion';
import EventosUsuario from '../components/EventosUsuario';
import ProductosUsuario from '../components/ProductosUsuario';
import '../scss/components/UsuarioLogueado.scss'
import Button from 'react-bootstrap/Button';
import { FiSettings } from 'react-icons/fi';
import {FaUserCircle} from 'react-icons/fa';
import {BsBoxSeam} from 'react-icons/Bs';
import {RiServiceFill} from 'react-icons/ri';
import {BiBuildingHouse} from 'react-icons/bi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from "js-cookie"; // Importa la librería Cookies

const UsuarioLogueado = ({actualizarUsuarioGeneral, nombre}) => {
  const [mostrar, setMostrar] = useState("Productos")

  const mostrarAjustes = () =>{
    setMostrar("Ajustes")
  }

  const mostrarEventos = () =>{
    setMostrar("Eventos")
  }

  const mostrarProductos = () =>{
    setMostrar("Productos")
  }

  const mostrarServicios = () =>{
    setMostrar("Servicios")
  }

  return ( 

      <Row  className='usuario-logueado-general'>
        <Col className='columna-lateral ancho-total'  style={{ padding: "0px"}}>

            <aside className='menu-lateral d-flex flex-column justify-content-center align-items-center gap-4'>
              <FaUserCircle
                size={80} // Ajusta el tamaño del ícono según tus necesidades
                className="rounded-circle text-primary"
              />
              <h5 style={{textAlign:"center"}}>{nombre}</h5>
              <div style={{width: "100%"}}>
                <Button className='button-menu d-flex justify-content-start align-items-center' onClick={mostrarAjustes}>
                  <FiSettings style={{marginRight: "10px"}}/> {/* Utiliza FiSettings como un componente independiente */}
                  <h5>Ajustes de perfil</h5>
                </Button>

                <Button className='button-menu d-flex justify-content-start align-items-center' onClick={mostrarEventos}>
                  <BiBuildingHouse style={{marginRight: "10px"}}/> {/* Utiliza FiSettings como un componente independiente */}
                  <h5>Mis Eventos</h5>
                </Button>

                <Button className='button-menu d-flex justify-content-start align-items-center' onClick={mostrarProductos}>
                  <BsBoxSeam style={{marginRight: "10px"}}/> {/* Utiliza FiSettings como un componente independiente */}
                  <h5>Mis Productos</h5>
                </Button>
                
                {/* <Button className='button-menu d-flex justify-content-start align-items-center' onClick={mostrarServicios}>
                  <RiServiceFill style={{marginRight: "10px"}}/>
                  Mis Servicios
                </Button> */}
              </div>

            </aside>

        </Col>

        <Col className='columna-main ancho-total'  >
          <main className='contenedor-contenido d-flex flex-column justify-content-center align-items-center'>
            {mostrar === 'Ajustes' ? (
              <Configuracion actualizarUsuarioGeneral={actualizarUsuarioGeneral}/>
            ) : mostrar === 'Eventos' ? (
                <EventosUsuario/>
            ) : mostrar === 'Productos' ? (
              <ProductosUsuario/>
            ) : mostrar === 'Servicios' ? (
              <p>Texto3</p>
            ) : (
              <p>Otro Texto</p>
            )}
          </main>
        </Col>
      </Row>
   );
}
 
export default UsuarioLogueado;