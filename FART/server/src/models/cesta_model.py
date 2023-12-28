from src.database.db_connector import db
import uuid

def get_uuid():
  return str(uuid.uuid4())

class ProductoCesta(db.Model):
    __tablename__ = 'tb_fart_cesta'

    id = db.Column(db.String(36), primary_key=True, unique=True, nullable=False)
    nombre = db.Column(db.String(128), nullable=False)
    descripcion = db.Column(db.String(512), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    url_imagen = db.Column(db.String(256), nullable=False)
    id_usuario = db.Column(db.String(36), db.ForeignKey('TB_FART_Usuarios.id'), nullable=False)

    # # Define relaciones, si es necesario
    # usuario = db.relationship('Usuario', back_populates='cesta')
    
    def __init__(self, nombre, descripcion, precio, cantidad, url_imagen, id_usuario):
      self.id = get_uuid()
      self.nombre = nombre
      self.descripcion = descripcion
      self.precio = precio
      self.cantidad = cantidad
      self.url_imagen = url_imagen
      self.id_usuario = id_usuario


