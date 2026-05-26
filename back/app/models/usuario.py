from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    correo = Column(String, unique=True, index=True, nullable=False)
    contrasena = Column(String, nullable=False)
    id_rol = Column(Integer, nullable=False)
    id_estatus = Column(Integer, nullable=False)
    fecha_creacion = Column(String, nullable=False)