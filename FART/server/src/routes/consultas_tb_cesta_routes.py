from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.database.database_queries_cesta import (
  get_user_basket,
  add_product_to_basket,
  delete_product_from_basket,
)

consultasTBCesta_blueprint = Blueprint('consultasTBCesta', __name__)

# Devolver todos los producto de un usuario especifico
@consultasTBCesta_blueprint.route('/usuario', methods=['GET'])
@jwt_required()
def obtener_productos_cesta_usuario():
  try:
    productos = None
    productos_serializados = []
    user_id = get_jwt_identity()

    # Hacer consulta a la base de datos filtrando por user_id
    productos = get_user_basket(user_id)

    # Convertir informacion de una lista de objetos SQLAlchemy a una lista de diccionarios
    for producto in productos:
        producto_dict = {
            'id': producto.id,
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'cantidad': producto.cantidad,
            'url_imagen': producto.url_imagen,
            'id_usuario': producto.id_usuario,
        }
        productos_serializados.append(producto_dict)
    
    return jsonify({"data": productos_serializados}), 200
  
  except Exception as e:
    return jsonify({'error': 'Error accediendo a los productos'}), 404
  
# Añadir un nuevo producto
@consultasTBCesta_blueprint.route('/add', methods=['POST'])
@jwt_required()
def agregar_producto_cesta():
    try:
      # Obtener datos enviados por el cliente
      data = request.form
      nombre = data.get('nombre')
      descripcion = data.get('descripcion')
      precio = data.get('precio')
      cantidad = data.get('cantidad')
      url_imagen = data.get('url_imagen')
      id_usuario = get_jwt_identity()
      
      # Guardar producto en la base de datos
      add_product_to_basket(nombre, descripcion, precio, cantidad, url_imagen, id_usuario)

      return jsonify({"message": "Producto agregado correctamente"}), 200
    
    except Exception as e:
      # Manejo de errores si es necesario
      return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500
    
@consultasTBCesta_blueprint.route('/delete/<producto_id>', methods=['DELETE'])
def eliminar_producto(producto_id):
    print("ID de producto a eliminar: "+producto_id)
    producto = delete_product_from_basket(producto_id)
    if producto:
        return jsonify({'message': 'Producto eliminado'})
    return jsonify({'error': 'Producto a eliminar no se ha encontrado en la base de datos'}), 404