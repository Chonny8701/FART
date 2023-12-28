from src.database.db_connector import db
from src.models.evento_model import Evento

def get_all_events():
    return Evento.query.all()

def get_event_by_id(event_id):
    return Evento.query.get(event_id)
  
def get_events_by_user(user_id):
    return Evento.query.filter_by(organizador=user_id)

def add_event(titulo, descripcion, organizador, ubicacion, fecha, telefono, email, url_imagen):
    evento = Evento(titulo=titulo, descripcion=descripcion, organizador=organizador, ubicacion= ubicacion, fecha=fecha, telefono=telefono, email=email, url_imagen=url_imagen)
    db.session.add(evento)
    db.session.commit()

def edit_event(id, titulo, descripcion, organizador, ubicacion, fecha, telefono, email, url_imagen):
    evento = Evento.query.get(id)
    if evento:
        evento.titulo = titulo
        evento.descripcion = descripcion
        evento.organizador = organizador
        evento.ubicacion = ubicacion
        evento.fecha = fecha
        evento.telefono = telefono
        evento.email = email
        evento.url_imagen = url_imagen
        db.session.commit()
    return evento

def delete_event(evento_id):
    evento = Evento.query.get(evento_id)
    if evento:
        db.session.delete(evento)
        db.session.commit()
    return evento
