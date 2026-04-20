# Estágio de build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copiar arquivos do Maven
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Baixar dependências
RUN mvn dependency:go-offline -B

# Copiar código fonte
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Estágio de execução
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup -g 1001 spring && adduser -D -u 1001 -G spring spring
USER spring:spring

# Copiar JAR do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expor porta 8080
EXPOSE 8080

# Variáveis de ambiente
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Comando de execução
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

