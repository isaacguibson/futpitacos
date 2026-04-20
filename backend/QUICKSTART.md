# Quick Start Guide - Futpitacos API

## 🚀 Início Rápido com Docker

### 1️⃣ Primeira Execução

```bash
docker-compose up --build
```

Aguarde até ver a mensagem: `Started FutpitacosApplication`

### 2️⃣ Testar a API

Abra o navegador ou use curl:

```bash
curl http://localhost:8080/api/health
```

Deve retornar: `API is running!`

### 3️⃣ Comandos Úteis

```bash
# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f futpitacos-api

# Parar
docker-compose down

# Reconstruir
docker-compose build --no-cache
docker-compose up -d
```

### 4️⃣ Usando o Script Auxiliar (Mais Fácil!)

```bash
# Iniciar
./docker.sh start

# Ver logs
./docker.sh logs

# Parar
./docker.sh stop

# Status
./docker.sh status

# Reconstruir tudo
./docker.sh rebuild
```

## 🛠️ Troubleshooting

### Porta 8090 já está em uso?

```bash
# Parar o que está rodando na porta 8090
lsof -ti:8090 | xargs kill -9

# Ou alterar a porta no docker-compose.yml
# Trocar "8090:8090" por "8091:8090" (sua_porta:porta_container)
```

### Container não inicia?

```bash
# Ver logs detalhados
docker-compose logs futpitacos-api

# Limpar tudo e recomeçar
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Aplicação lenta?

```bash
# Aumentar memória no Dockerfile
# Alterar: ENV JAVA_OPTS="-Xmx512m -Xms256m"
# Para:    ENV JAVA_OPTS="-Xmx1g -Xms512m"
```

## 📝 Próximos Passos

1. Criar mais endpoints REST
2. Adicionar banco de dados (PostgreSQL/MySQL)
3. Configurar persistência de dados
4. Adicionar autenticação JWT
5. Criar testes automatizados

