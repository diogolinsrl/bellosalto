package br.com.bellosalto.api.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import br.com.bellosalto.api.model.Usuario;

public class UsuarioSistema extends User {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3754710205904179534L;

	private Usuario usuario;

	public UsuarioSistema(Usuario usuario, Collection<? extends GrantedAuthority> authorities) {
		super(usuario.getCpf().toString(), usuario.getSenha(), authorities);
		this.usuario = usuario;
	}

	public Usuario getUsuario() {
		return usuario;
	}
}
