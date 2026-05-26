ALTER TABLE evaluacion_tecnica.historico
ADD CONSTRAINT fk_historico_producto
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);