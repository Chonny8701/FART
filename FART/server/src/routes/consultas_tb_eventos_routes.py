from flask import Blueprint, jsonify, request, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from datetime import datetime
from datetime import datetime
from src.services.general_services import guardar_imagen, eliminar_imagen, MiErrorPersonalizado
from src.database.database_queries_eventos import (
    get_all_events,
    get_events_by_user,
    get_event_by_id,
    add_event,
    edit_event,
    delete_event,
)

consultasTBEventos_blueprint = Blueprint('consultasTBEventos', __name__)

# Devolver todos los eventos de la base de datos
@consultasTBEventos_blueprint.route('/all', methods=['GET'])
def obtener_todos_eventos():
  print("accediendo a todos los eventos")
  try:
    
    # Hacer consulta a la base de datos
    eventos = get_all_events()
    eventos_serializados = []
    
    # Convertir informacion de una lista de objetos SQLAlchemy a una lista de diccionarios
    for evento in eventos:
        evento_dict = {
            'id': evento.id,
            'titulo': evento.titulo,
            'descripcion': evento.descripcion,
            'organizador': evento.organizador,
            'ubicacion': evento.ubicacion,
            'fecha': evento.fecha,
            'telefono': evento.telefono,
            'email': evento.email,
            'url_imagen': evento.url_imagen
        }
        eventos_serializados.append(evento_dict)
        
    return jsonify({"data": eventos_serializados}), 200
  
  except Exception as e:
    # Manejo de errores si es necesario
    return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500


# Devolver todos los eventos de un usuario especifico
@consultasTBEventos_blueprint.route('/usuario', methods=['GET'])
@jwt_required()
def obtener_eventos_usuario():
  try:
    user_id = get_jwt_identity()
    eventos = get_events_by_user(user_id)
    eventos_serializados = []

    # Convertir informacion de una lista de objetos SQLAlchemy a una lista de diccionarios
    for evento in eventos:
        evento_dict = {
            'id': evento.id,
            'titulo': evento.titulo,
            'descripcion': evento.descripcion,
            'organizador': evento.organizador,
            'ubicacion': evento.ubicacion,
            'fecha': evento.fecha,
            'telefono': evento.telefono,
            'email':evento.email,
            'url_imagen': evento.url_imagen,
        }
        eventos_serializados.append(evento_dict)
    
    return jsonify({"data": eventos_serializados}), 200
  
  except Exception as e:
    print("recibiendo peticion")
    return jsonify({'error': f'Error accediendo a los eventos: {str(e)})'}), 404


# Añadir un nuevo evento
@consultasTBEventos_blueprint.route('/add', methods=['POST'])
@jwt_required()
def agregar_evento():
    try:
      # Obtener datos enviados por el cliente
      data = request.form
      titulo = data.get('titulo')
      descripcion = data.get('descripcion')
      organizador = get_jwt_identity()
      ubicacion = data.get('ubicacion')
      # Convertir la cadena de fecha en un objeto datetime.date
      fecha_str = data.get('fecha')
      fecha = datetime.strptime(fecha_str[:10], '%Y-%m-%d').date()
      telefono = data.get('telefono')
      email = data.get('email')   
      imagen = request.files['imagen']      # Obtén el archivo de la solicitud
      
      # Guardando imagen en el servidor, devuelve el nombre de la imagen guardada
      resultado = guardar_imagen(organizador, imagen)

      # En caso de error al guardar imagen lanzar una excepcion
      if not resultado["data"]:
        raise MiErrorPersonalizado(resultado["error"])

      # En caso de guardar la imagen correctamente se obtiene el nombre generado para guardar en DB
      nombre_imagen_servidor = resultado["data"]

      # Guardar evento en la base de datos
      add_event(titulo, descripcion, organizador, ubicacion, fecha, telefono, email, nombre_imagen_servidor)

      return jsonify({"message": "Evento agregado correctamente"}), 200
    
    except Exception as e:
      # Manejo de errores
      return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500


# Editar un evento existente
@consultasTBEventos_blueprint.route('/edit', methods=['POST'])
@jwt_required()
def editar_evento():
    try:
      # Obtener datos enviados por el cliente
      data = request.form
      id = data.get('id')
      new_titulo = data.get('titulo')
      new_descripcion = data.get('descripcion')
      organizador = get_jwt_identity()
      new_ubicacion = data.get('ubicacion')
      new_fecha = data.get('fecha')
      new_telefono = data.get('telefono')
      new_email = data.get('email')
      new_imagen = request.files['imagen']      # Obtén el archivo de la solicitud

      # Obtener evento original de la base de datos para borrar la imagen original
      evento_original = get_event_by_id(id)
      nombre_imagen_original = evento_original.url_imagen

      if not evento_original:
        raise MiErrorPersonalizado("Evento a editar no se ha encontrado en la base de datos.")      
      
      # Guardando imagen en el servidor devuelve el nombre de la imagen guardada
      resultado = guardar_imagen(organizador, new_imagen)
      
      # En caso de error al guardar imagen lanzar una excepcion
      if not resultado["data"]:
        raise MiErrorPersonalizado(resultado["error"])
      
      # En caso de guardar la imagen correctamente se obtiene el nombre generado para guardar en DB
      nombre_imagen_servidor = resultado["data"]
      
      # Guardar evento actualizado en la base de datos
      if not edit_event(id, new_titulo, new_descripcion, organizador, new_ubicacion, new_fecha, new_telefono, new_email, nombre_imagen_servidor):
        raise MiErrorPersonalizado("Error al actualizar la informacion del evento en la base de datos.")

      # Si se guardaron correctamente los nuevo datos del evento se procede a eliminar la foto anterior
      imagen_eliminada = eliminar_imagen(nombre_imagen_original)
      if not imagen_eliminada:
        raise MiErrorPersonalizado("Error al eliminar la imagen original del evento en el servidor.")
      
      return jsonify({"message": "Evento editado correctamente"}), 200
    
    except MiErrorPersonalizado as error_personalizado:
      return jsonify({"error": str(error_personalizado)}), 500
    
    except Exception as e:
      # Manejo de errores si es necesario
      return jsonify({"error": f"Error en la ruta privada: {str(e)}"}), 500


@consultasTBEventos_blueprint.route('/delete/<evento_id>', methods=['DELETE'])
def eliminar_evento(evento_id):
  try:
    
    # Peticion para eliminar el evento de la base de datos
    evento = delete_event(evento_id)
    
    # Si devuelve un evento es que se eliminó correctamente
    if evento:
      # Proceder a eliminar la imagen de ese producto del servidor
      imagen_eliminada = eliminar_imagen(evento.url_imagen)

      # Si no se pudo eliminar la imagen lanzar una excepcion
      if not imagen_eliminada:
        raise MiErrorPersonalizado("Error al eliminar la imagen original del producto en el servidor.")

      return jsonify({'message': 'Evento eliminado'}), 200
    
    return jsonify({'error': 'Evento a eliminar no se ha encontrado en la base de datos'}), 404

  except Exception as e:
    return jsonify({'error': e}), 404

@consultasTBEventos_blueprint.route('/uploads/images/<nombre_imagen>')
def servir_imagen(nombre_imagen):
  return send_from_directory('src/uploads/images', nombre_imagen) # Direccion ruta imagenes en el servidor


  
  
  
  
  
  