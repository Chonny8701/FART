from flask import Blueprint, jsonify, request, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.services.general_services import guardar_imagen,eliminar_imagen, MiErrorPersonalizado
from src.database.database_queries_productos import (
    get_all_productos,
    get_productos_by_user,
    get_producto_by_id,
    add_producto,
    edit_producto,
    delete_producto,
)

consultasTBProductos_blueprint = Blueprint('consultasTBProductos', __name__)

# Devolver todos los productos de la base de datos
@consultasTBProductos_blueprint.route('/all', methods=['GET'])
def obtener_productos():
  try:
    productos = None
    productos_serializados = []
    
    # Obtener el parámetro "categoria" de la URL
    categoria = request.args.get('categoria')
    
    if categoria is not None:
      # Hacer consulta a la base de datos filtrando por categoria
      productos = get_all_productos(categoria)
    else:
      # Hacer consulta a la base de datos si no se proporcionó una categoria
      productos = get_all_productos()
      
    # Convertir informacion de una lista de objetos SQLAlchemy a una lista de diccionarios
    for producto in productos:
        producto_dict = {
            'id': producto.id,
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'categoria': producto.categoria,
            'url_imagen': producto.url_imagen,
            'codigo_usuario': producto.codigo_usuario,
        }
        productos_serializados.append(producto_dict)
        
    return jsonify({"data": productos_serializados}), 200
  
  except Exception as e:
    # Manejo de errores si es necesario
    return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500

# Devolver todos los producto de un usuario especifico
@consultasTBProductos_blueprint.route('/usuario', methods=['GET'])
@jwt_required()
def obtener_productos_usuario():
  try:
    productos = None
    productos_serializados = []
    user_id = get_jwt_identity()

    # Obtener el parámetro "categoria" de la URL
    categoria = request.args.get('categoria')

    if categoria is not None:
      # Hacer consulta a la base de datos filtrando por user_id y categoria
      productos = get_productos_by_user(user_id, categoria)
    else:
      # Hacer consulta a la base de datos filtrando por user_id
      productos = get_productos_by_user(user_id)

    # Convertir informacion de una lista de objetos SQLAlchemy a una lista de diccionarios
    for producto in productos:
        producto_dict = {
            'id': producto.id,
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'categoria': producto.categoria,
            'url_imagen': producto.url_imagen,
            'codigo_usuario': producto.codigo_usuario,
        }
        productos_serializados.append(producto_dict)
    
    return jsonify({"data": productos_serializados}), 200
  
  except Exception as e:
    return jsonify({'error': 'Error accediendo a los productos'}), 404

# Añadir un nuevo producto
@consultasTBProductos_blueprint.route('/add', methods=['POST'])
@jwt_required()
def agregar_producto():
    try:
      # Obtener datos enviados por el cliente
      data = request.form
      nombre = data.get('nombre')
      descripcion = data.get('descripcion')
      precio = data.get('precio')
      categoria = data.get('categoria')
      imagen = request.files['imagen']      # Obtén el archivo de la solicitud
      codigo_usuario = get_jwt_identity()
      
      # Guardando imagen en el servidor, devuelve el nombre de la imagen guardada
      resultado = guardar_imagen(codigo_usuario, imagen)
      
      # En caso de error al guardar imagen lanzar una excepcion
      if not resultado["data"]:
        raise MiErrorPersonalizado(resultado["error"])
      
      # En caso de guardar la imagen correctamente se obtiene el nombre generado para guardar en DB
      nombre_imagen_servidor = resultado["data"]
      
      # Guardar producto en la base de datos
      add_producto(nombre, descripcion, precio, categoria, nombre_imagen_servidor,codigo_usuario)

      return jsonify({"message": "Producto agregado correctamente"}), 200
    
    except Exception as e:
      # Manejo de errores si es necesario
      return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500

# Editar un producto existente
@consultasTBProductos_blueprint.route('/edit', methods=['POST'])
@jwt_required()
def editar_producto():
    try:
      # Obtener datos enviados por el cliente
      data = request.form
      id = data.get('id')
      new_nombre = data.get('nombre')
      new_descripcion = data.get('descripcion')
      new_precio = data.get('precio')
      new_categoria = data.get('categoria')
      new_imagen = request.files['imagen']      # Obtén el archivo de la solicitud
      codigo_usuario = get_jwt_identity()
      
      # Obtener producto original de la base de datos para borrar la imagen original
      producto_original = get_producto_by_id(id)
      nombre_imagen_original = producto_original.url_imagen

      if not producto_original:
        raise MiErrorPersonalizado("Producto a editar no se ha encontrado en la base de datos.")      
      
      # Guardando imagen en el servidor devuelve el nombre de la imagen guardada
      resultado = guardar_imagen(codigo_usuario, new_imagen)
      
      # En caso de error al guardar imagen lanzar una excepcion
      if not resultado["data"]:
        raise MiErrorPersonalizado(resultado["error"])
      
      # En caso de guardar la imagen correctamente se obtiene el nombre generado para guardar en DB
      nombre_imagen_servidor = resultado["data"]
      
      # Guardar producto actualizado en la base de datos
      if not edit_producto(id, new_nombre, new_descripcion, new_precio, new_categoria, nombre_imagen_servidor,codigo_usuario):
        raise MiErrorPersonalizado("Error al actualizar la informacion del producto en la base de datos.")

      # Si se guardaron correctamente los nuevo datos del producto se procede a eliminar la foto anterior
      imagen_eliminada = eliminar_imagen(nombre_imagen_original)
      if not imagen_eliminada:
        raise MiErrorPersonalizado("Error al eliminar la imagen original del producto en el servidor.")
      
      return jsonify({"message": "Producto editado correctamente"}), 200
    
    except MiErrorPersonalizado as error_personalizado:
      return jsonify({"error": str(error_personalizado)}), 500
    
    except Exception as e:
      # Manejo de errores si es necesario
      return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500

# Eliminar un producto existente
@consultasTBProductos_blueprint.route('/delete/<producto_id>', methods=['DELETE'])
def eliminar_producto(producto_id):
  try:
    
    # Peticion para eliminar el producto de la base de datos
    producto = delete_producto(producto_id)
    
    # Si devuelve un producto es que se eliminó correctamente
    if producto:
      # Proceder a eliminar la imagen de ese producto del servidor
      imagen_eliminada = eliminar_imagen(producto.url_imagen)
      
      # Si no se pudo eliminar la imagen lanzar una excepcion
      if not imagen_eliminada:
        raise MiErrorPersonalizado("Error al eliminar la imagen original del producto en el servidor.")
      
      return jsonify({"data": {}}), 200

    return jsonify({'error': 'Producto a eliminar no se ha encontrado en la base de datos'}), 404
  
  except Exception as e:
    return jsonify({'error': e}), 404

# Enviar imagenes guardadas en el servidor
@consultasTBProductos_blueprint.route('/uploads/images/<nombre_imagen>')
def servir_imagen(nombre_imagen):
  return send_from_directory('src/uploads/images', nombre_imagen) # Direccion ruta imagenes en el servidor




# # Devolver todos los productos de la base de datos
# @consultasTBProductos_blueprint.route('/eliminar-imagen', methods=['GET'])
# def delete_image():
#   print("Intentando eliminar imagen")
#   try:
#     nombre_imagen = '8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231011192051.png'
#     resultado = eliminar_imagen(nombre_imagen)
#     if resultado:
#       return jsonify({"message": "Imagen eliminada"}), 200
    
#     return jsonify({"error": "Error al eliminar imagen" }), 500
  
#   except Exception as e:
#     # Manejo de errores si es necesario
#     return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500
  
  
  
  
  
  