CREATE TABLE cliente (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	outros_emails VARCHAR(300),
	cpf BIGINT(11) NOT NULL,
	rg BIGINT(15) NOT NULL,
	orgao_expedidor VARCHAR(10) NOT NULL,
	data_nascimento DATE NOT NULL,
	numero_socio VARCHAR(10),
	cep VARCHAR(9) NOT NULL,
	logradouro VARCHAR(50) NOT NULL,
	numero VARCHAR(15) NOT NULL,
	complemento VARCHAR(30),
	bairro VARCHAR(20) NOT NULL,
	cidade VARCHAR(30) NOT NULL,
	estado VARCHAR(2) NOT NULL,
	telefone_principal VARCHAR(20) NOT NULL,
	outros_telefones VARCHAR(60),
	data_cadastro DATE NOT NULL,
	situacao VARCHAR(20) NOT NULL
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




