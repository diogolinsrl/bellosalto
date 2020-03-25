package br.com.bellosalto.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bellosalto.api.model.Cliente;
import br.com.bellosalto.api.repository.cliente.ClienteRepositoryQuery;

public interface ClienteRepository extends JpaRepository<Cliente, Long>, ClienteRepositoryQuery {

}
