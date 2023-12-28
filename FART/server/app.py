from flask import Flask
from flask_cors import CORS
from src.routes import init_routes
from src.database.db_connector import init_db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)

# Configura la aplicación y la base de datos
init_routes(app)
init_db(app)

# Configura CORS para permitir solicitudes desde cualquier origen (*)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
CORS(app)

#Uso de Bcrypt en toda la aplicacion
bcrypt = Bcrypt(app)

# Configura la secret_key desde la variable de entorno
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Inicializa el JWTManager
jwt = JWTManager(app)

# Punto de entrada principal
if __name__ == "__main__":
    #app.run(debug=True)
    app.run(debug=True, ssl_context='adhoc')  # Ejecutar en HTTP durante el desarrollo