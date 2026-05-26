USE evaluacion_tecnica;

CREATE TABLE historico (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_producto INT,
    cantidad INT NOT NULL,
    tipo_operacion ENUM('ENTRADA', 'SALIDA') NOT NULL,
    fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);