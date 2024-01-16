# Usa la imagen base de Python
FROM python:3.11

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY . .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto en el que se ejecutará la aplicación Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
