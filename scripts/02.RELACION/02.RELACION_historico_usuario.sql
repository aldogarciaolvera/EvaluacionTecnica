ALTER TABLE evaluacion_tecnica.historico
ADD CONSTRAINT fk_historico_usuario
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);