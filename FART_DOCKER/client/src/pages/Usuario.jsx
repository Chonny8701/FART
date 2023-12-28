import React, {useState} from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import DatosUsuario from '../components/DatosUsuario';
import '../scss/components/Usuario.scss'
const Usuario = ({resetIsAuthenticated, setearIsAuthenticated, actualizarUsuarioGeneral}) => {
  const [login_signup_user, set_login_signup_user] = useState(0);
  const [estadoUsuario, setEstadoUsuario] = useState (0); //0-Login 1-SignUp 2-UsuarioIdentificado

  // Función para cambiar y mostrar el login - signup -usuario
  const mostrarContenido = (value) => {
    set_login_signup_user(value);
  };

  return (
    <div className="contenedor-cuenta">
      {login_signup_user === 0 ? <Login mostrarContenido = {mostrarContenido} actualizarUsuarioGeneral = {actualizarUsuarioGeneral} resetIsAuthenticated = {resetIsAuthenticated} setearIsAuthenticated={setearIsAuthenticated}/> : null }
      {login_signup_user === 1 ? <Signup mostrarContenido = {mostrarContenido}/> : null}
    </div>
   );
}
 
export default Usuario;