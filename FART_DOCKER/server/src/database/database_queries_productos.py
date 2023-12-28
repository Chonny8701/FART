from src.database.db_connector import db
from src.models.producto_model import Producto

def get_all_productos(categoria=None):
  # Buscar por categoria y retornar resultado de la busqueda
  if categoria is not None:
    return Producto.query.filter_by(categoria=categoria)
  
  # Si no se pasó el parámetro categoria retornar todos los productos
  return Producto.query.all()

def get_producto_by_id(producto_id):
    return Producto.query.get(producto_id)
  
def get_productos_by_user(user_id, categoria=None):
  # Buscar por codigo_usuario y categoria y retornar resultado de la busqueda
  if categoria is not None:
    return Producto.query.filter_by(codigo_usuario=user_id, categoria=categoria)
  
  # Buscar por codigo_usuario porque no se pasó como parametro una categoria
  return Producto.query.filter_by(codigo_usuario=user_id)

def add_producto(nombre, descripcion, precio, categoria, url_imagen, codigo_usuario):
    producto = Producto(nombre=nombre, descripcion=descripcion, precio=precio, categoria=categoria, url_imagen= url_imagen,codigo_usuario=codigo_usuario)
    db.session.add(producto)
    db.session.commit()

def edit_producto(id, nombre, descripcion, precio, categoria, url_imagen, codigo_usuario):
    producto = Producto.query.get(id)
    if producto:
        producto.nombre = nombre
        producto.descripcion = descripcion
        producto.precio = precio
        producto.categoria = categoria
        producto.url_imagen = url_imagen
        producto.codigo_usuario = codigo_usuario
        db.session.commit()
    return producto

def delete_producto(producto_id):
    producto = Producto.query.get(producto_id)
    if producto:
        db.session.delete(producto)
        db.session.commit()
    return producto
