ALTER TABLE evaluacion_tecnica.usuarios
ADD CONSTRAINT fk_usuario_estatus
FOREIGN KEY (id_estatus)
REFERENCES catalogo_estatus(id_catalogo_estatus);