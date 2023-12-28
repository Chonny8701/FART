import Cookies from "js-cookie";
import authService from '../helpers/authService';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../scss/components/Header.scss'
import logo from '../images/Logo1.webp'
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Header = ({ nombreUsuario }) =>{
  // Verifica si existe la cookie de autenticación
  const isAuthenticated = Cookies.get("access_token") ? true : false;

  return (
    // Incluir la clase header-navbar para darle estilos a la barra de navegacion
    <Navbar expand="lg" className=" bg-body-tertiary header-navbar">
      <Container fluid className='d-flex justify-content-between align-items-center container'>
        <Navbar.Brand href="/"><img src={logo} id="header-logo" className="img-fluid rounded-start logo-image" alt="Imagen del plato" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/eventos">Eventos</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            {isAuthenticated ? (
              <NavDropdown title={nombreUsuario} id="basic-nav-dropdown">
                <NavDropdown.Item href="/usuario/cuenta">Mi Cuenta</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={authService.handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/usuario">Usuario</Nav.Link>
            )}
            <Nav.Link href="/cesta"><AiOutlineShoppingCart href="/eventos" className="header-cart-icon" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
