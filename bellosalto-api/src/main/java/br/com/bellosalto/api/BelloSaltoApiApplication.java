package br.com.bellosalto.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.com.bellosalto.api.config.property.BelloSaltoApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(BelloSaltoApiProperty.class)
public class BelloSaltoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BelloSaltoApiApplication.class, args);
	}

}

