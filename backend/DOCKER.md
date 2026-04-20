# Futpitacos API - Docker

## 🐳 Como executar com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Comandos

#### Construir e iniciar a aplicação
```bash
docker-compose up --build
```

#### Iniciar em segundo plano (detached)
```bash
docker-compose up -d
```

#### Parar a aplicação
```bash
docker-compose down
```

#### Ver logs
```bash
docker-compose logs -f
```

#### Reconstruir a imagem
```bash
docker-compose build --no-cache
```

### Acessar a API

Após iniciar, a API estará disponível em:
- **URL:** http://localhost:8080
- **Health Check:** http://localhost:8080/api/health

### Estrutura Docker

- **Dockerfile**: Multi-stage build para otimizar tamanho da imagem
  - Estágio 1: Build da aplicação com Maven
  - Estágio 2: Runtime com JRE apenas
  
- **docker-compose.yml**: Orquestração dos serviços
  - Configuração de portas
  - Health check automático
  - Restart automático
  - Network isolada

- **.dockerignore**: Otimização do contexto de build

### Notas
- A aplicação roda na porta 8090
- Perfil Spring ativo: `docker`
- Timezone: America/Sao_Paulo
- Memory limits: 256MB min, 512MB max

