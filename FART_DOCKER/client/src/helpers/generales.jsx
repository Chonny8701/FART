class MiErrorPersonalizado extends Error {
  constructor(message) {
    super(message);
    this.name = "MiErrorPersonalizado";
  }
}

const resumirTexto = (texto) => {
  // Verificar si el texto es más largo que 50 caracteres
  if (texto.length > 100) {
    // Si es más largo, acortarlo a 50 caracteres y agregar "..."
    const textoRecortado = texto.slice(0, 100) + '...';
    return textoRecortado;

  } else {
    // Si no es más largo, mostrar el texto completo
    return texto;
  }
};

const enviarProductoACesta = async (producto) => {
  try {
    // Comprobar que si existe un access_token en las cookies (Usuario Logueado)
    if (Cookies.get('access_token')){

      // Hacer petición al servidor para comprobar access_token sea valido
      const productos = await cestaService.get_all_products();
      console.log("Status: "+productos.status)

      // Si la respuesta es error 401 es que el usuario no esta logueado o el token esta caducado
      if (productos.status ==  "401"){
        const productosCookies = Cookies.get("cesta_usuario");
        setListaProductos(productosCookies);
        authService.handleLogout();

      // Si el usuario está logueado, obtener cesta de DB
      } else if ( productos.status == "200" || productos.status == "201"){
        setListaProductos(productos.data);
      }

    // Si el usuario no esta logueado usar cesta de las cookies
    } else {
      setListaProductos(Cookies.get("cesta_usuario") || []);
      console.log(Cookies.get("cesta_usuario"))
    }

  } catch (error) {
    console.log(error);
    const productosCookies = Cookies.get("cesta_usuario") || [];
    setListaProductos(productosCookies);
  }
}


export { MiErrorPersonalizado, resumirTexto, enviarProductoACesta};