rem usado para ambiente de dev
java -jar -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=6006 target\bellosalto-api-1.0.0-SNAPSHOT.jar --spring.profiles.active=oauth-security

rem usado para debugar a API com basic-security
rem java -jar -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=6006 target\bellosalto-api-1.0.0-SNAPSHOT.jar --spring.profiles.active=basic-security