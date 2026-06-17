from sqlalchemy import Column, Integer, String, Numeric
from app.database.connection import Base

class Producto(Base):
    __tablename__ = "productos"
    
    id_producto = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
    precio = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, nullable=False)
    id_estatus = Column(Integer, nullable=False)