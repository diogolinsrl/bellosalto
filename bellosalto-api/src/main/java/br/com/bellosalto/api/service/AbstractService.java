package br.com.bellosalto.api.service;

import br.com.bellosalto.api.model.AbstractEntidade;
import br.com.bellosalto.api.service.exception.CodigoPreenchidoPOSTException;

public class AbstractService {

	public void validarCodigoPOST(AbstractEntidade entidade) {
		if (entidade.getCodigo() != null) {
			throw new CodigoPreenchidoPOSTException();
		}
	}
}
