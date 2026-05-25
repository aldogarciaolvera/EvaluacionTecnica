ALTER TABLE usuarios
ADD CONSTRAINT fk_user_role
FOREIGN KEY (id_rol)
REFERENCES rol(id_rol);