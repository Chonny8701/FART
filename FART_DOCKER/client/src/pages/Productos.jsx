import React, {useState, useEffect} from "react";
import Producto from "../components/Producto";
import "../scss/components/Productos.scss";
import { v4 as uuidv4 } from 'uuid';
import { BsClipboardData} from "react-icons/bs";
import {LuLampCeiling} from "react-icons/lu";
import {HiGift} from "react-icons/hi";
import {GiWoodFrame} from "react-icons/gi";
import productosService from '../helpers/productosServices'

const Productos = () => {
  const [listaProductos, setListaProductos] = useState ([])
  const [mensajeError, setMensajeError] = useState([])

  const peticionServidor = async (categoria) =>{
    try{
      if (!categoria){
        const res = await productosService.get_all_products()
        setListaProductos(res.data)
        setMensajeError(res.error.name + " " + res.error.message)
        console.log(listaProductos)
      } else {
        const res = await productosService.get_all_products(categoria)
        setListaProductos(res.data)
        setMensajeError(res.error.name + " " + res.error.message)
        console.log(listaProductos)
      }

    } catch (error){
      console.log(error)
    }
  }

  useEffect (()=>{
    peticionServidor()
  }, [])

  return (
    <div className="productos-container-general">

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
            <div className="d-flex flex-column align-items-center">
              <p>No se han encontrado productos disponibles.</p>
              <br></br>
              <p>{mensajeError}</p>
            </div>
          ) : (
            listaProductos.map((item) => (
              <Producto
                key={uuidv4()}
                imageSrc= {import.meta.env.VITE_SERVER_ROUTE + '/productos/uploads/images/' + item.url_imagen}
                nombre={item.nombre}
                descripcion={item.descripcion}
                precio={item.precio}
                url_imagen = {item.url_imagen}
                tipo={item.tipo}
              />
            ))
          )}
        </div>
      </div>

      {/* <div className="productos-fila-pasar">
          <button><BsChevronLeft /> Anterior</button>
          <button>Siguiente <BsChevronRight /></button>
      </div> */}

    </div>
  );
};

export default Productos;
