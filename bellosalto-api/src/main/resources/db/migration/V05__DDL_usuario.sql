ALTER TABLE usuario 
	ADD COLUMN cpf BIGINT(11) NOT NULL AFTER codigo,
	ADD COLUMN data_expiracao_senha DATE NOT NULL,
	ADD COLUMN tipo_usuario VARCHAR(20) NOT NULL;
