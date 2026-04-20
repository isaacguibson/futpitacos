# Futpitacos API

REST API para o projeto Futpitacos.

## 🚀 Tecnologias

- Java 21
- Spring Boot 4.0.3
- Maven
- Docker

## 📋 Pré-requisitos

### Execução Local
- Java 21+
- Maven 3.6+

### Execução com Docker
- Docker
- Docker Compose

## 🔧 Como Executar

### Opção 1: Executar Localmente

```bash
# Compilar o projeto
./mvnw clean install

# Executar a aplicação
./mvnw spring-boot:run
```

A API estará disponível em: http://localhost:8080

### Opção 2: Executar com Docker (Recomendado)

#### Usando docker-compose

```bash
# Iniciar a aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar a aplicação
docker-compose down
```

#### Usando o script auxiliar

```bash
# Iniciar
./docker.sh start

# Ver logs
./docker.sh logs

# Parar
./docker.sh stop

# Ver status
./docker.sh status

# Reconstruir e reiniciar
./docker.sh rebuild
```

## 🔍 Endpoints Disponíveis

### Health Check
```
GET /api/health
```

Retorna: `API is running!`

## 📦 Build

### Maven

```bash
# Build local
./mvnw clean package

# Executar testes
./mvnw test

# Build sem testes
./mvnw clean package -DskipTests
```

### Docker

```bash
# Build da imagem
docker-compose build

# Build sem cache
docker-compose build --no-cache
```

## 📚 Documentação Adicional

- [DOCKER.md](DOCKER.md) - Instruções detalhadas sobre Docker
- [HELP.md](HELP.md) - Documentação de referência do Spring Boot

## 🛠️ Estrutura do Projeto

```
futpitacos/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/guibsonsoftwares/futpitacos/
│   │   │       ├── FutpitacosApplication.java
│   │   │       └── controller/
│   │   │           └── HealthController.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-docker.properties
│   └── test/
├── Dockerfile
├── docker-compose.yml
├── docker.sh
└── pom.xml
```

## 🐳 Detalhes Docker

- **Porta:** 8090
- **Perfil Spring:** docker
- **Timezone:** America/Sao_Paulo
- **Memory:** 256MB min, 512MB max
- **Health Check:** Verifica `/api/health` a cada 30s

## 📝 Notas

- A aplicação usa multi-stage build para otimizar o tamanho da imagem
- O health check garante que a aplicação está funcionando corretamente
- Logs são configurados para o timezone de São Paulo

