package br.com.bellosalto.api.repository.cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import br.com.bellosalto.api.model.Cliente;
import br.com.bellosalto.api.repository.filter.ClienteFilter;

public interface ClienteRepositoryQuery {

	public Page<Cliente> filtrar(ClienteFilter clienteFilter, Pageable pageable);
}
