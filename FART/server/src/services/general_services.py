import uuid
import os
from datetime import datetime

class MiErrorPersonalizado(Exception):
  def __init__(self, mensaje):
    super().__init__(mensaje)

def generar_id():
  unique_id = str(uuid.uuid4())  # Genera un UUID (Universally Unique Identifier) aleatorio
  return unique_id

# Funcion que recibe el codigo_usuario y una imagen y la guarda en el servidor
def guardar_imagen (codigo_usuario, nueva_imagen):

  # Obtener nombre de la imagen
  nombre_imagen = nueva_imagen.filename
  
  # Funcion que devuelve True si el fichero tiene una extension de imagen y False de lo contrario
  def es_imagen_valida(nombre_archivo):
    extensiones_permitidas = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".svg"}

    # Obtener la extensión del archivo
    _, extension = os.path.splitext(nombre_archivo)

    # Convierte la extensión a minúsculas (por si acaso)
    extension = extension.lower()

    # Comprueba si la extensión está en la lista de extensiones permitidas
    return extension in extensiones_permitidas
  
  # Funcion que devuelve la extension de un fichero
  def obtener_extension(nombre_archivo):
    # Obtener la extensión del archivo
    _, extension = os.path.splitext(nombre_archivo)
    # Eliminar el punto inicial (.) de la extensión
    return extension[1:]
  
  try:
    # Comprobar que el fichero es una imagen válida
    if not es_imagen_valida(nombre_imagen):
      raise MiErrorPersonalizado("Formato de la imagen no válido")
    
    # Obtener la fecha y hora actual
    ahora = datetime.now()

    # Crear una cadena de formato para la fecha y hora
    fecha_actual = "{:04d}{:02d}{:02d}{:02d}{:02d}{:02d}".format(
      ahora.year, ahora.month, ahora.day,
      ahora.hour, ahora.minute, ahora.second
    )
    
    # Nombre de la imagen con el formato (id_usuario - fecha_actual - extension imagen)
    nombre_imagen_servidor = "{}_{}.{}".format(codigo_usuario, fecha_actual, obtener_extension(nombre_imagen))
  
    # Carpeta donde se guardarán las imágenes en el servidor
    directorio_destino = 'src/uploads/images'

    # Verifica si la carpeta uploads existe, si no, créala
    if not os.path.exists(directorio_destino):
        os.makedirs(directorio_destino)

    # Ruta completa del archivo en el servidor
    ruta_completa = os.path.join(directorio_destino, nombre_imagen_servidor)
    
    # Guardar la nueva_imagen en la ruta especificada
    nueva_imagen.save(ruta_completa)
    
    return {"data": nombre_imagen_servidor}
    
  except MiErrorPersonalizado as error_personalizado:
    return  {"data": False, "error": error_personalizado}
  
  except Exception as error_generico:
    return {"data": False, "error": error_generico}
  

def eliminar_imagen(nombre_archivo):
    UPLOAD_FOLDER = 'src/uploads/images'  # Ruta donde se encuentra la imagen a eliminar
    ruta_archivo = UPLOAD_FOLDER + "/" + nombre_archivo

    print(f"Ruta de imagen a eliminar {ruta_archivo}")
    # # Reemplazar todas las barras invertidas '\' con barras diagonales '/'
    # ruta_archivo = ruta_archivo.replace("\\", "/")
    
    try:
        if os.path.exists(ruta_archivo):
            os.remove(ruta_archivo)
            return True
        else:
            return False
    except Exception as e:
        return False
      
