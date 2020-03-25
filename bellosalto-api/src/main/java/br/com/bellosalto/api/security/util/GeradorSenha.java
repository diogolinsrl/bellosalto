package br.com.bellosalto.api.security.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeradorSenha {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		System.out.println(encoder.encode(""));
		System.out.println(encoder.encode(""));
		System.out.println(encoder.encode(""));
	}

}