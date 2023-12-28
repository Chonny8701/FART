import React, { useState, useEffect } from 'react';

const Servicios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/consultas/productos')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {data.map(producto => (
          <li key={producto.id}>
            <strong>ID:</strong> {producto.id}<br />
            <strong>Nombre:</strong> {producto.nombre}<br />
            <strong>Descripción:</strong> {producto.descripcion}<br />
            <strong>Precio:</strong> {producto.precio}<br />
            <strong>Código de Usuario:</strong> {producto.codigo_usuario}<br />
            <strong>Código de Negocio:</strong> {producto.codigo_negocio}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Servicios;
