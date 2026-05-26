ALTER TABLE evaluacion_tecnica.productos
ADD CONSTRAINT fk_producto_estatus
FOREIGN KEY (id_estatus)
REFERENCES catalogo_estatus(id_catalogo_estatus);