import Cookies from "js-cookie"; // Importa la librería Cookies

// Funcion para peticion al servidor de todos los eventos de la DB
const get_all_events = async  () => {
  try {
    // Realizar la solicitud POST al servidor con el access_token
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/eventos/all');

    if (!res.ok) {
      const errorMessage = res.error || 'Error al acceder a los eventos de la base de datos';
      return { "error": errorMessage, "data": [] }; // Devuelve el mensaje de error como objeto
    }

    // Analizar la respuesta del servidor en formato JSON
    const respuestaServidor = await res.json();

    return {"data": respuestaServidor.data};

  } catch (error) {
    return {"error": error, "data": []}
  }
}

// Funcion para peticion al servidor de todos los eventos de un usuario
const get_all_events_from_user = async () => {
  try {
    // Realizar la solicitud POST al servidor con el access_token
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/eventos/usuario', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
    });

    // Analizar la respuesta del servidor en formato JSON
    const respuestaServidor = await res.json();

    // Manejo de errores en el análisis JSON
    if (!respuestaServidor.data) {
      return {"message": "No hay eventos que mostrar", "data": respuestaServidor.data};
    }

    // Si se obtiene un campo data en la respuesta
    console.log(respuestaServidor.data);
    return {"data":respuestaServidor.data};

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {"error": error, "data":[]}
  }
}

// Funcion para peticion al servidor de un evento especifico
const get_one_user_event = (user_id, event_id) => {

}

// Funcion para peticion al servidor de añadir un nuevo evento
const add_user_event = async (new_event) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/eventos/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: new_event ,
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El evento no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al agregar evento';
      return { "error": errorMessage }; // Devuelve el mensaje de error como objeto
    }

    // El evento fue agregado correctamente
    console.log('Evento agregado correctamente');
    return { "message": data.message }; // Devuelve un mensaje de evento agregado correctamente

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { "error": error }; // Manejo de errores generales
  }
}

const edit_user_event = async (edited_event) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/eventos/edit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: edited_event ,
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El producto no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al agregar evento';
      return { "error": errorMessage }; // Devuelve el mensaje de error como objeto

    // El producto fue agregado correctamente
    } else {
      console.log('Producto editado correctamente');
      return { "message": data.message }; // Devuelve un mensaje de producto agregado correctamente
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { "error": 'Error en la solicitud' }; // Manejo de errores generales
  }
}

const delete_user_event = async (event_id) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/eventos/delete/' + event_id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El producto no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al eliminar evento';
      return { "error": errorMessage }; // Devuelve el mensaje de error como objeto
    }

    // El producto fue eliminado correctamente
    console.log('Producto eliminardo correctamente');
    return { "message": data.message }; // Devuelve un mensaje de producto agregado correctamente

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { "error": 'Error en la solicitud' }; // Manejo de errores generales
  }
}

const eventosServices = {
  get_all_events,
  get_all_events_from_user,
  get_one_user_event,
  add_user_event,
  edit_user_event,
  delete_user_event,
};

export default eventosServices;