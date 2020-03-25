package br.com.bellosalto.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("bellosalto")
public class BelloSaltoApiProperty {

	private String originPermitida = "http://localhost:8000";
	
	private final Seguranca seguranca = new Seguranca();

	public static class Seguranca {
		private boolean enableHttps = false;

		public boolean isEnableHttps() {
			return enableHttps;
		}

		public void setEnableHttps(boolean enableHttps) {
			this.enableHttps = enableHttps;
		}
	}

	public Seguranca getSeguranca() {
		return seguranca;
	}

	public String getOriginPermitida() {
		return originPermitida;
	}

	public void setOriginPermitida(String originPermitida) {
		this.originPermitida = originPermitida;
	}
}
