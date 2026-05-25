ALTER TABLE historico
ADD CONSTRAINT fk_historico_producto
FOREIGN KEY (id_producto)
REFERENCES productos(id_producto);