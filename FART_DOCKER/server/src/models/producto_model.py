from src.database.db_connector import db
import uuid

def get_uuid():
  return str(uuid.uuid4())

class Producto(db.Model):
  __tablename__ = 'tb_fart_productos'
  id = db.Column(db.String(36), primary_key=True, unique=True, nullable=False)
  nombre = db.Column(db.String(128), nullable=False)
  descripcion = db.Column(db.String(512), nullable=False)
  precio = db.Column(db.Float, nullable=False)
  categoria = db.Column(db.String(36), nullable=False)
  url_imagen = db.Column(db.String(256), nullable=False)
  codigo_usuario = db.Column(db.String(36), db.ForeignKey('tb_fart_usuarios.id'), nullable=False)

  def __init__(self, nombre, descripcion, precio, categoria, url_imagen, codigo_usuario):
    self.id = get_uuid()
    self.nombre = nombre
    self.descripcion = descripcion
    self.precio = precio
    self.categoria = categoria
    self.url_imagen = url_imagen
    self.codigo_usuario = codigo_usuario