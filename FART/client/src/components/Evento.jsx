
import { Card, Row, Col } from "react-bootstrap";
import "../scss/components/Evento.scss";

const Evento = (props) => {
  const {  id, titulo, descripcion, organizador, ubicacion, fecha, telefono, email, url_imagen} =props;
  // Parsea la fecha (convierte la fecha en string a tipo Date)
  const fechaParseada = new Date(fecha);

  // Obtiene el año, mes y día
  const año = fechaParseada.getFullYear();
  const mes = String(fechaParseada.getMonth() + 1).padStart(2, "0"); // Agrega un cero inicial si es necesario
  const dia = String(fechaParseada.getDate()).padStart(2, "0"); // Agrega un cero inicial si es necesario

  // Crea la cadena en formato "año-mes-día"
  const fechaFormateada = `${año}-${mes}-${dia}`;

  return (
    <div className="container">
      <Card>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card.Img src={url_imagen} className="evento-imagen" alt="Card Image" />
          </Col>
          <Col md={8}>
            <Card.Body className="evento-card-body">
              <Card.Title>{titulo}</Card.Title>
              <Card.Text>{descripcion}</Card.Text>
              <Card.Text>Ubicación: <b>{ubicacion}</b></Card.Text>
              <Card.Text>Fecha del Evento: <b>{fechaFormateada}</b></Card.Text>
              <Card.Text>Telefono de contacto: <b>{telefono}</b></Card.Text>
              <Card.Text>Email de contacto: <b>{email}</b></Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

    </div>
  );
};

export default Evento;
