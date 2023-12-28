from src.routes.index_routes import index_blueprint
from src.routes.consultas_tb_usuarios_routes import consultasTBUsuarios_blueprint
from src.routes.consultas_tb_productos_routes import consultasTBProductos_blueprint
from src.routes.consultas_tb_eventos_routes import consultasTBEventos_blueprint
from src.routes.consultas_tb_cesta_routes import consultasTBCesta_blueprint
from src.routes.consultas_stripe_routes import consultas_Stripe_blueprint

def init_routes(app):
  app.register_blueprint(index_blueprint)
  app.register_blueprint(consultasTBUsuarios_blueprint, url_prefix='/api/usuarios')
  app.register_blueprint(consultasTBProductos_blueprint, url_prefix='/api/productos')
  app.register_blueprint(consultasTBEventos_blueprint, url_prefix='/api/eventos')
  app.register_blueprint(consultasTBCesta_blueprint, url_prefix='/api/cesta')
  app.register_blueprint(consultas_Stripe_blueprint, url_prefix='/api/stripe')
