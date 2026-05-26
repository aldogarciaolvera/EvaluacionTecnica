USE evaluacion_tecnica;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo varchar(50) NOT NULL ,
    contrasena varchar(25) NOT NULL,
    id_rol INT,
    id_estatus INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);