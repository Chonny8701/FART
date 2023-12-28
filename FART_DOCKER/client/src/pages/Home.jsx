import React from 'react';
import { Card, Row, Col} from "react-bootstrap";
import '../scss/components/Home.scss'

const Home = () => {
  return ( 
    <div className="contenedor-home container">
      <h4 style={{marginBottom: '50px'}}>Bienvenidos a Fábrica de Arte: Donde el Arte Crea su Hogar</h4>
      <p>En un rincón lleno de creatividad y pasión, te damos la bienvenida a Fábrica de Arte, un espacio vibrante y diverso que celebra la expresión artística en todas sus formas. Sumérgete en un mundo donde el arte toma vida, se mezcla con la imaginación y se convierte en una experiencia única para todos.</p>

    
    
      <Card className="transparent-card">
        <Row>
          <Col xl={8} lg={7} >
          <Card.Body className="home-card-body" >
            <Card.Title className="home-card-title">Quienes somos?</Card.Title>
            <Card.Text className="home-card-text">
              Fábrica de Arte es mucho más que un simple taller; es un santuario para artistas de diversas disciplinas que buscan un espacio para desarrollar y perfeccionar sus habilidades. Desde pintura y escultura hasta música y teatro, nuestro espacio reúne a creadores de todas las ramas bajo un mismo techo. Aquí, la magia de la colaboración florece, y cada rincón está impregnado de la energía creativa que impulsa a nuestros artistas a alcanzar nuevas alturas.
            </Card.Text>
          </Card.Body>

          </Col>
          <Col xl={4} lg={5} className="d-flex justify-content-center align-items-center">
            <Card.Img variant="start" src="./images/home1.webp" className="evento-imagen" alt="Imagen del evento" />
          </Col>
        </Row>
      </Card>

      <Card className="transparent-card">
        <Row>
        <Col xl={8} lg={7}>
            <Card.Body className="home-card-body" >
            <Card.Title className="home-card-title">Qué hacemos?</Card.Title>
            <Card.Text className="home-card-text" >En Fábrica de Arte, creemos en llevar el arte más allá de nuestros muros y acercarlo a todos. A través de la preparación y organización de eventos emocionantes y cautivadores, nos esforzamos por compartir el poder del arte con comunidades locales y más allá. Desde exposiciones y galerías hasta espectáculos en vivo y talleres interactivos, estamos comprometidos en llevar el arte a personas de todas las edades y trasfondos.</Card.Text>
            </Card.Body>
          </Col>
          <Col xl={4} lg={5} className="d-flex justify-content-center align-items-center">
            <Card.Img variant="start" src="./images/home2.webp" className="evento-imagen" alt="Imagen del evento" />
          </Col>
        </Row>
      </Card>
    
      <p className='parrafo-transparente'>Únete a nosotros en este emocionante viaje a través del mundo del arte. Ya seas un artista emergente o simplemente alguien que busca inspiración y belleza en la vida cotidiana, en Fábrica de Arte encontrarás un espacio donde la creatividad fluye sin límites y el arte se convierte en una forma de vida. ¡Explora, descubre y sé parte de nuestra comunidad artística en Fábrica de Arte!</p>
    
    </div>
   );
}
 
export default Home;