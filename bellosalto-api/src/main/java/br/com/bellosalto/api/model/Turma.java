package br.com.bellosalto.api.model;

import java.math.BigDecimal;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "turma")
public class Turma extends AbstractEntidade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull
	@Size(min = 3, max = 60)
	private String nome;

	@NotNull
	@Enumerated(EnumType.STRING)
	private DiasSemana diasSemana;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private Turno turno;

	@JsonFormat(pattern = "HH:mm")
	@NotNull
	private LocalTime horaInicio;

	@JsonFormat(pattern = "HH:mm")
	@NotNull
	private LocalTime horaFim;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Nivel nivel;

	@NotNull
	private String professor;

	@NotNull
	private Integer idadeMinima;

	@NotNull
	private BigDecimal matriculaIntegral;

	@NotNull
	private BigDecimal mensalidadeIntegral;

	@NotNull
	private BigDecimal mensalidadeComDesconto;
	
	@NotNull
	private BigDecimal matriculaIntegralSocio;

	@NotNull
	private BigDecimal mensalidadeIntegralSocio;

	@NotNull
	private BigDecimal mensalidadeComDescontoSocio;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
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
		Turma other = (Turma) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Turno getTurno() {
		return turno;
	}

	public void setTurno(Turno turno) {
		this.turno = turno;
	}

	public LocalTime getHoraInicio() {
		return horaInicio;
	}

	public void setHoraInicio(LocalTime horaInicio) {
		this.horaInicio = horaInicio;
	}

	public LocalTime getHoraFim() {
		return horaFim;
	}

	public void setHoraFim(LocalTime horaFim) {
		this.horaFim = horaFim;
	}

	public Nivel getNivel() {
		return nivel;
	}

	public void setNivel(Nivel nivel) {
		this.nivel = nivel;
	}

	public String getProfessor() {
		return professor;
	}

	public void setProfessor(String professor) {
		this.professor = professor;
	}

	public Integer getIdadeMinima() {
		return idadeMinima;
	}

	public void setIdadeMinima(Integer idadeMinima) {
		this.idadeMinima = idadeMinima;
	}

	public DiasSemana getDiasSemana() {
		return diasSemana;
	}

	public void setDiasSemana(DiasSemana diasSemana) {
		this.diasSemana = diasSemana;
	}

	public BigDecimal getMatriculaIntegral() {
		return matriculaIntegral;
	}

	public void setMatriculaIntegral(BigDecimal matriculaIntegral) {
		this.matriculaIntegral = matriculaIntegral;
	}

	public BigDecimal getMensalidadeIntegral() {
		return mensalidadeIntegral;
	}

	public void setMensalidadeIntegral(BigDecimal mensalidadeIntegral) {
		this.mensalidadeIntegral = mensalidadeIntegral;
	}

	public BigDecimal getMensalidadeComDesconto() {
		return mensalidadeComDesconto;
	}

	public void setMensalidadeComDesconto(BigDecimal mensalidadeComDesconto) {
		this.mensalidadeComDesconto = mensalidadeComDesconto;
	}

	public BigDecimal getMatriculaIntegralSocio() {
		return matriculaIntegralSocio;
	}

	public void setMatriculaIntegralSocio(BigDecimal matriculaIntegralSocio) {
		this.matriculaIntegralSocio = matriculaIntegralSocio;
	}

	public BigDecimal getMensalidadeIntegralSocio() {
		return mensalidadeIntegralSocio;
	}

	public void setMensalidadeIntegralSocio(BigDecimal mensalidadeIntegralSocio) {
		this.mensalidadeIntegralSocio = mensalidadeIntegralSocio;
	}

	public BigDecimal getMensalidadeComDescontoSocio() {
		return mensalidadeComDescontoSocio;
	}

	public void setMensalidadeComDescontoSocio(BigDecimal mensalidadeComDescontoSocio) {
		this.mensalidadeComDescontoSocio = mensalidadeComDescontoSocio;
	}

}
