CREATE TABLE aluno (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	data_nascimento DATE NOT NULL,
	escola VARCHAR(50),
	bairro VARCHAR(20),
	observacoes_cuidados VARCHAR(200),
	autoriza_imagens_individuais BOOLEAN NOT NULL,
    codigo_cliente BIGINT(20) NOT NULL,
	codigo_turma BIGINT(20) NOT NULL,	
	FOREIGN KEY (codigo_cliente) REFERENCES cliente(codigo),
	FOREIGN KEY (codigo_turma) REFERENCES turma(codigo),
	data_matricula DATE NOT NULL,
	data_inativacao DATE,
	situacao VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


