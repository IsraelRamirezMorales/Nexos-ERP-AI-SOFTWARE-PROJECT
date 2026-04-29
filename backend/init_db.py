from db.session import engine
from db.base import Base
# Import all models here so they are registered with Base
from modules.auth.models import Empresa, Usuario
from modules.catalog.models import Categoria, Producto
from modules.clients.models import Cliente
from modules.sales.models import Venta, DetalleVenta

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    init_db()
