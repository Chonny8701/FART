import Button from "react-bootstrap/Button";

const Completion = (props) => {

  return (
    <div className="container d-flex flex-column gap-4 justify-content-center align-items-center">
      <h1 style={{textAlign: "center"}}>Gracias por vuestra aportación! 🎉</h1>
      <Button href="/" style={{maxWidth: "200px"}}>Volver a la pagina de inicio</Button>
    </div>)
}

export default Completion;
