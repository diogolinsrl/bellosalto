CREATE TABLE aluno_lista_espera (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	prioridade INT NOT NULL,
	nome VARCHAR(50) NOT NULL,
	data_nascimento DATE NULL,
	data_entrada DATETIME NOT NULL,
	data_saida DATE NULL,
	data_a_partir_de DATE NULL,
	responsavel VARCHAR(50) NULL,
	telefone VARCHAR(20) NULL,
	email VARCHAR(50) NULL,
	observacoes VARCHAR(300),
	situacao VARCHAR(20) NOT NULL,
	nivel VARCHAR(20) NOT NULL,
	turnos VARCHAR(35) NOT NULL,
	dias VARCHAR(35) NOT NULL	
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




