package br.com.bellosalto.api.repository.dto;

import br.com.bellosalto.api.model.Turma;

public class TurmaConsultadaDTO {

	private Turma turma;
	private Long qtAlunosMatriculados;

	public TurmaConsultadaDTO(Turma turma, Long qtAlunosMatriculados) {
		super();
		this.turma = turma;
		this.qtAlunosMatriculados = qtAlunosMatriculados;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}

	public Long getQtAlunosMatriculados() {
		return qtAlunosMatriculados;
	}

	public void setQtAlunosMatriculados(Long qtAlunosMatriculados) {
		this.qtAlunosMatriculados = qtAlunosMatriculados;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((turma == null) ? 0 : turma.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TurmaConsultadaDTO other = (TurmaConsultadaDTO) obj;
		if (turma == null) {
			if (other.turma != null)
				return false;
		} else if (!turma.equals(other.turma))
			return false;
		return true;
	}
}
