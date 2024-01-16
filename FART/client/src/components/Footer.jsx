import React from 'react';
import '../scss/components/Footer.scss'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <p><b>Contacto:</b></p>
      <footer className="footer">
        <div className="footer-item">
          <FaMapMarkerAlt className="footer-icon" />
          <div className="footer-data">
            <p>Dirección:</p>
            <p><b>Francesc Macia 08402 Barcelona</b></p>
          </div>
        </div>
        <div className="footer-item">
          <FaEnvelope className="footer-icon" />
          <div className="footer-data">
            <p>Email:</p>
            <p><b>pirolsaens@yahoo.es</b></p>
          </div>
        </div>
        <div className="footer-item">
          <FaPhone className="footer-icon" />
          <div className="footer-data">
            <p>Teléfono:</p>
            <p><b>+34 698 245 390</b></p>
          </div>
        </div>
      </footer>
      <div className="follow-us">
          <p><b>Sígueme:</b></p>
          <div className="social-icons">
            <a href="https://twitter.com/home" target="_blank" rel="noopener noreferrer"><FaTwitter className="footer-icon" /></a>
            <a href="https://www.youtube.com/@josedanielrodriguezchong1116" target="_blank" rel="noopener noreferrer"><FaYoutube className="footer-icon" /></a>
            <a href="https://www.facebook.com/josedaniel.rodriguezchong" target="_blank" rel="noopener noreferrer"><FaFacebook className="footer-icon" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-icon" /></a>
          </div>
        </div>
      <div className="copyrights">
        <p><b>&copy; {currentYear} Todos los derechos reservados.</b></p>
      </div>
    </div>
  );
};

export default Footer;
