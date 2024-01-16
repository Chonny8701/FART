import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cookies from "js-cookie"; // Importa la librería Cookies
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Usuario from './pages/Usuario';
import UsuarioLogueado from './pages/UsuarioLogueado';
import Cesta from './pages/Cesta'
import Payment from './components/Stripe/Payment'
import Completion from './components/Stripe/Completion';
import Error404 from './pages/Error404';
import Footer from './components/Footer'
import './scss/components/App.scss'

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [id, setId] = useState (null)
  const [nombre, setNombre] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [email, setEmail] = useState(null);
  const [contraseña, setContraseña] = useState(null);
  const [cuentaBancaria, setCuentaBancaria] = useState(null);

  const resetIsAuthenticated = () =>{
    setIsAuthenticated(false)
    setId(null)
    setNombre(null)
    setEmail(null)
    setTelefono(null)
    setContraseña(null)
    setCuentaBancaria(null)
  }
  const setearIsAuthenticated = () =>{
    setIsAuthenticated(true)
  }

  const actualizarUsuarioGeneral = (usuario) => {
    const {id, nombre, telefono, email, contraseña, cuenta_bancaria} = usuario
    setId(id)
    setNombre(nombre);
    setTelefono(telefono);
    setEmail(email);
    setContraseña(contraseña)
    setCuentaBancaria(cuenta_bancaria)
  }

  useEffect(()=>{
    if (Cookies.get("access_token")){
      setId(Cookies.get("id"))
      setNombre(Cookies.get("nombre"));
      setTelefono(Cookies.get("telefono"));
      setEmail(Cookies.get("email"));
      setContraseña(Cookies.get("contraseña"))
      setCuentaBancaria(Cookies.get("cuenta_bancaria"))
    }
  })
  
  return (
    <div className="contenedor-general" style={{backgroundImage: 'url("./images/background.webp")'}}>
      <div className="wrapper">
        <Header nombreUsuario = {nombre}/>
        <div className='contenedor-main'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/eventos" element={<Eventos/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/servicios" element={<Servicios/>}/>
              <Route path="/usuario" element={<Usuario resetIsAuthenticated={resetIsAuthenticated} actualizarUsuarioGeneral = {actualizarUsuarioGeneral} setearIsAuthenticated={setearIsAuthenticated}/>}/>
              <Route path="/usuario/cuenta" element={<UsuarioLogueado actualizarUsuarioGeneral={actualizarUsuarioGeneral} nombre={nombre}/>}/>
              <Route path="/cesta" element={<Cesta/>}/>
              <Route path="/pago" element={<Payment/>}/>
              <Route path="/completion" element={<Completion/>}/>
              <Route path="*" element={<Error404/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default App
