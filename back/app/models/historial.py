from sqlalchemy import Column, Integer, String
from database.connection import Base

class Historial(Base):
    __tablename__ = "historico"

    id_historico: int = Column(Integer, primary_key=True, index=True)
    id_usuario: int = Column(Integer, index=True)
    id_producto: int = Column(Integer, index=True)
    cantidad: int = Column(Integer, nullable=False)
    tipo_operacion: str = Column(String, nullable=False)