from src.database.db_connector import db
import uuid

def get_uuid():
  return str(uuid.uuid4())

class Evento(db.Model):
  __tablename__ = 'TB_FART_Eventos'
  id = db.Column(db.String(36), primary_key=True, unique=True, nullable=False)
  titulo = db.Column(db.String(127), nullable=False)
  descripcion = db.Column(db.String(2047), nullable=False)
  organizador = db.Column(db.String(36), db.ForeignKey('TB_FART_Usuarios.id'), nullable=False)
  ubicacion = db.Column(db.String(255), nullable=False)
  fecha = db.Column(db.Date, nullable=False)
  telefono = db.Column(db.String(16), nullable=False)
  email = db.Column(db.String(45), nullable=False)
  url_imagen = db.Column(db.String(60), nullable=False)
  
  # # Define la relación con la tabla de usuarios (tb_fart_usuarios)
  # usuario = relationship('Usuario', back_populates='eventos')

  def __init__(self, titulo, descripcion,organizador, ubicacion, fecha, telefono, email, url_imagen):
    self.id = get_uuid()    
    self.titulo = titulo
    self.descripcion = descripcion
    self.organizador = organizador
    self.ubicacion = ubicacion
    self.fecha = fecha
    self.telefono = telefono
    self.email = email
    self.url_imagen = url_imagen