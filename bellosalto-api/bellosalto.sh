java -jar -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=6006 target/bellosalto-api-1.0.0-SNAPSHOT.jar --bellosalto.originPermitida=http://localhost:4200 --spring.profiles.active=oauth-security