CREATE TABLE usuario (
	codigo BIGINT(20) PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE permissao (
	codigo BIGINT(20) PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE usuario_permissao (
	codigo_usuario BIGINT(20) NOT NULL,
	codigo_permissao BIGINT(20) NOT NULL,
	PRIMARY KEY (codigo_usuario, codigo_permissao),
	FOREIGN KEY (codigo_usuario) REFERENCES usuario(codigo),
	FOREIGN KEY (codigo_permissao) REFERENCES permissao(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO usuario (codigo, nome, email, senha) values (1, 'Administrador', 'admin@bellosalto.com.br', '$2a$10$42pdSWFq2z7VHTGWy9QEhelGG0qM10akdMA92NBB2l7P9pbnKU8Ui');
INSERT INTO usuario (codigo, nome, email, senha) values (2, 'Perfil de Consulta', 'consulta@bellosalto.com.br', '$2a$10$42pdSWFq2z7VHTGWy9QEhelGG0qM10akdMA92NBB2l7P9pbnKU8Ui');

insert into permissao (codigo,descricao) values (101,'ROLE_MANTER_CLIENTE');
insert into permissao (codigo,descricao) values (102,'ROLE_CONSULTAR_CLIENTE');
insert into permissao (codigo,descricao) values (111,'ROLE_MANTER_TURMA');
insert into permissao (codigo,descricao) values (112,'ROLE_CONSULTAR_TURMA');
insert into permissao (codigo,descricao) values (121,'ROLE_MANTER_ALUNO');
insert into permissao (codigo,descricao) values (122,'ROLE_CONSULTAR_ALUNO');

INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '101');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '102');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '111');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '112');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '121');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('1', '122');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('2', '102');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('2', '112');
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) VALUES ('2', '122');