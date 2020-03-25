CREATE TABLE turma (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	dias_semana VARCHAR(10) NOT NULL,
	turno VARCHAR(10) NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_fim TIME NOT NULL,
	nivel VARCHAR(20) NOT NULL,
	professor VARCHAR(50) NOT NULL,
	idade_minima INT NOT NULL,
	idade_maxima INT NOT NULL,
	matricula_integral DECIMAL(10,2) NOT NULL,
	mensalidade_integral DECIMAL(10,2) NOT NULL,
	mensalidade_com_desconto DECIMAL(10,2) NOT NULL,
	matricula_integral_socio DECIMAL(10,2) NOT NULL,
	mensalidade_integral_socio DECIMAL(10,2) NOT NULL,
	mensalidade_com_desconto_socio DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

