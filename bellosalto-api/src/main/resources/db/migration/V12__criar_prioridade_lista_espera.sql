CREATE TABLE prioridade_lista_espera (
	prioridade VARCHAR(30) PRIMARY KEY,
	valor INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO prioridade_lista_espera (prioridade, valor) values ('IMEDIATA', 100);
INSERT INTO prioridade_lista_espera (prioridade, valor) values ('ALUNA', 200);
INSERT INTO prioridade_lista_espera (prioridade, valor) values ('SOCIA', 300);
INSERT INTO prioridade_lista_espera (prioridade, valor) values ('IRMA', 400);
INSERT INTO prioridade_lista_espera (prioridade, valor) values ('NORMAL', 900);

COMMIT;

ALTER TABLE aluno_lista_espera ADD CONSTRAINT fk_prioridade FOREIGN KEY (prioridade) REFERENCES prioridade_lista_espera(prioridade);