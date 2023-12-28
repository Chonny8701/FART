import Cookies from "js-cookie"; // Importa la librería Cookies

const handleSignUp = async (formData) => {
  try {
    // Enviar la solicitud POST al servidor
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/usuarios/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convierte el objeto a una cadena JSON
    });

    // Obtener datos del servidor en formato JSON
    const data = await res.json();

    // El registro falló, manejar errores aquí
    if (!res.ok) {
      const errorMessage = data.error || 'Error en el registro';
      return { error: errorMessage }; // Devuelve el mensaje de error como objeto

    // El registro finalizó exitosamente
    } else {
      console.log('Registro exitoso');
      return { message: data.message || 'Usuario agregado correctamente' }; // Devuelve un objeto indicando el éxito
    }

  // El registro falló, manejar errores aquí
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: 'Error en la solicitud' }; // Manejo de errores generales
  }
};

const handleLogin = async (formData) => {
  try {
    // Enviar los datos al servidor en formato JSON
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE+'/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convertir el objeto a JSON
    });

    if (res.ok) {
      // El inicio de sesión fue exitoso, puedes redirigir o realizar otras acciones aquí
      console.log('Inicio de sesión exitoso');

      // Procesar la respuesta JSON para obtener los tokens y otros datos
      const data = await res.json();
      const { id, nombre, email, telefono, contraseña, cuenta_bancaria, access_token, refresh_token } = data;

      // Almacenar los tokens en las cookies
      Cookies.set('access_token', access_token, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('refresh_token', refresh_token, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('email_token', email, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('usuario', nombre, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('id', id, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('nombre', nombre, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('email', email, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('telefono', telefono, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('contraseña', contraseña, { path: '/', expires: 0.5 }); // 0.5 días de duración
      Cookies.set('cuenta_bancaria', cuenta_bancaria, { path: '/', expires: 0.5 }); // 0.5 días de duración

      // Hacer algo con el id y el email, por ejemplo, redirigir o mostrar un mensaje
      console.log('Inicio de sesión exitoso');
      console.log('ID:', id);
      console.log('Email:', email);

      // Devolver email del usuario logueado
      const datosUsuario = {
        "id": id,
        "nombre": nombre,
        "email": email,
        "telefono": telefono,
        "contraseña": contraseña,
        "cuenta_bancaria": cuenta_bancaria
      }
      return datosUsuario;

    } else {
      // El inicio de sesión falló, puedes manejar errores aquí
      console.error('Error en el inicio de sesión');
      return {"error": "Nombre de usuario y/o contraseña no válidos"}
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {"error": error}
  }
};

const handleLogout = () => {
  // Eliminar la cookie de autenticación
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("email_token");
  Cookies.remove("usuario");
  Cookies.remove("id");
  Cookies.remove("nombre");
  Cookies.remove("telefono");
  Cookies.remove("email");
  Cookies.remove("contraseña");
  Cookies.remove("cuenta_bancaria");
  // Redirigir al usuario a la página de inicio
  window.location.href = "/";
};

const checkAccessToken = async () => {
  try {
    // Realizar la solicitud POST al servidor con el access_token
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/usuarios/get_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      return {"error": respuestaServidor.error};
    }

    console.log(respuestaServidor.data);
    return respuestaServidor.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {"error": error}
  }
};

const actualizarInfoUsuarioDB = async (userName, userPhone, userEmail, newUserPassword, originalUserPassword, userCuentaBancaria) => {
  const data = {
    nombre: userName,
    telefono: userPhone,
    email: userEmail,
    nueva_contraseña: newUserPassword,
    original_contraseña: originalUserPassword,
    cuenta_bancaria: userCuentaBancaria,
  };

  try {
    // Enviar los datos al servidor en formato JSON
    const res = await fetch(import.meta.env.VITE_SERVER_ROUTE + '/usuarios/editar_usuario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
      },
      body: JSON.stringify(data), // Convertir el objeto a JSON
    });

    if (res.ok) {
      // La actualización fue exitosa, procesa la respuesta JSON
      console.log('Actualización exitosa');
      const userData = await res.json();
      return {"data": userData.data, "message": "Actualización exitosa"}

    } else {
      // La actualización falló, maneja el error adecuadamente
      console.error('Error en la actualización');
      const errorData = await res.json();
      return { "error": errorData.error || "Error en la actualización" };
    }
  } catch (error) {
    // Maneja errores adecuadamente
    console.error('Error en la solicitud:', error);
    return { "error": errorData.error || "Error en la solicitud al servidor" };
  }
};

const authService = {
  handleSignUp,
  handleLogin,
  handleLogout,
  checkAccessToken,
  actualizarInfoUsuarioDB,
};

export default authService;