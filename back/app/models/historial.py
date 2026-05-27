from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class Historial(Base):
    __tablename__ = "historico"

    id_historico = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, index=True)
    id_producto = Column(Integer, index=True)
    cantidad = Column(Integer, nullable=False)
    tipo_operacion = Column(String, nullable=False)
    fecha_operacion = Column(String, nullable=False)