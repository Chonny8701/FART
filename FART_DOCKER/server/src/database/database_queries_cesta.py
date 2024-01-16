from src.database.db_connector import db
from src.models.cesta_model import ProductoCesta

# Buscar por categoria y retornar resultado de la busqueda
def get_user_basket(id_usuario):
  return ProductoCesta.query.filter_by(id_usuario = id_usuario)

def add_product_to_basket(nombre, descripcion, precio, cantidad, url_imagen, id_usuario):
  producto = ProductoCesta(nombre=nombre, descripcion=descripcion, precio=precio, cantidad=cantidad, url_imagen= url_imagen,id_usuario=id_usuario)
  db.session.add(producto)
  db.session.commit()

def delete_product_from_basket(producto_id):
  producto = ProductoCesta.query.get(producto_id)
  if producto:
      db.session.delete(producto)
      db.session.commit()
  return producto