import Cookies from "js-cookie"; // Importa la librería Cookies

const get_all_products = async (categoria) => {
  try {
    // Construir la URL de la solicitud GET
    let url = import.meta.env.VITE_SERVER_ROUTE + '/productos/all';
    
    // Si se proporciona una categoría, añadirla a la URL
    if (categoria) {
      url += `?categoria=${categoria}`;
    }

    // Realizar la solicitud GET al servidor
    const res = await fetch(url);

    if (!res.ok) {
      console.log(res.error);
    }

    // Analizar la respuesta del servidor en formato JSON
    const respuestaServidor = await res.json();

    // Manejo de errores en el análisis JSON
    if (!respuestaServidor.data) {
      console.error('La respuesta del servidor no contiene datos válidos.');
      return {"error": respuestaServidor.error, "data":[]};
    }

    console.log(respuestaServidor.data);
    return {"data": respuestaServidor.data};

  } catch (error) {
    return {"error": error, "data":[]};
  }
}

const get_all_products_from_user = async (categoria) => {
  try {
    // Construir la URL de la solicitud GET
    let url = import.meta.env.VITE_SERVER_ROUTE + '/productos/usuario';

    // Si se proporciona una categoría, añadirla a la URL
    if (categoria) {
      url += `?categoria=${categoria}`;
    }

    // Realizar la solicitud POST al servidor con el access_token
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
    });

    if (!res.ok) {
      // Array con los nombres de las cookies que deseas eliminar
      const cookiesToDelete = ['access_token', 'refresh_token', 'email_token', 'usuario'];

      // Recorre el array y elimina cada cookie
      cookiesToDelete.forEach(cookieName => {
        Cookies.remove(cookieName);
      });

      window.location.href = 'http://localhost:5173/usuario';
      return;
    }

    // Analizar la respuesta del servidor en formato JSON
    const respuestaServidor = await res.json();

    // Manejo de errores en el análisis JSON
    if (!respuestaServidor.data) {
      console.error('La respuesta del servidor no contiene datos válidos.');
      return {"error": respuestaServidor.error, "data":[]};
    }

    // Si se obtiene un campo data en la respuesta
    console.log(respuestaServidor.data);
    return {"data": respuestaServidor.data};

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {"error": error, "data":[]}
  }
}

const get_one_user_product = (user_id, product_id) => {

}

const add_user_product = async (new_product) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/productos/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: new_product ,
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El producto no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al agregar producto';
      return { error: errorMessage }; // Devuelve el mensaje de error como objeto

    // El producto fue agregado correctamente
    } else {
      console.log('Producto agregado correctamente');
      return { message: data.message }; // Devuelve un mensaje de producto agregado correctamente
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: 'Error en la solicitud' }; // Manejo de errores generales
  }
}

const edit_user_product = async (edited_product) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/productos/edit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: edited_product ,
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El producto no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al agregar producto';
      return { error: errorMessage }; // Devuelve el mensaje de error como objeto

    // El producto fue agregado correctamente
    } else {
      console.log('Producto editado correctamente');
      return { message: data.message }; // Devuelve un mensaje de producto agregado correctamente
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: 'Error en la solicitud' }; // Manejo de errores generales
  }
}

const delete_user_product = async (product_id) => {
  try{
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/productos/delete/' + product_id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El producto no fue agregado correctamente
    if (!res.ok) {
      const errorMessage = data.error || 'Error al eliminar producto';
      return { error: errorMessage }; // Devuelve el mensaje de error como objeto

    // El producto fue eliminado correctamente
    } else {
      console.log('Producto eliminardo correctamente');
      return { message: data.message }; // Devuelve un mensaje de producto agregado correctamente
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: 'Error en la solicitud' }; // Manejo de errores generales
  }
}

const productosServices = {
  get_all_products,
  get_all_products_from_user,
  get_one_user_product,
  add_user_product,
  edit_user_product,
  delete_user_product,
};

export default productosServices;