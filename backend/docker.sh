#!/bin/bash

# Script de gerenciamento Docker para Futpitacos

set -e

case "$1" in
  start)
    echo "🚀 Iniciando Futpitacos API..."
    docker-compose up -d
    echo "✅ API iniciada! Acesse: http://localhost:8080/api/health"
    ;;
  stop)
    echo "🛑 Parando Futpitacos API..."
    docker-compose down
    echo "✅ API parada!"
    ;;
  restart)
    echo "🔄 Reiniciando Futpitacos API..."
    docker-compose restart
    echo "✅ API reiniciada!"
    ;;
  logs)
    echo "📋 Mostrando logs..."
    docker-compose logs -f
    ;;
  build)
    echo "🔨 Reconstruindo imagem..."
    docker-compose build --no-cache
    echo "✅ Imagem reconstruída!"
    ;;
  rebuild)
    echo "🔨 Reconstruindo e iniciando..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ API reconstruída e iniciada!"
    ;;
  status)
    echo "📊 Status dos containers..."
    docker-compose ps
    ;;
  clean)
    echo "🧹 Limpando containers e volumes..."
    docker-compose down -v
    echo "✅ Limpeza concluída!"
    ;;
  *)
    echo "Uso: $0 {start|stop|restart|logs|build|rebuild|status|clean}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start    - Inicia a aplicação em segundo plano"
    echo "  stop     - Para a aplicação"
    echo "  restart  - Reinicia a aplicação"
    echo "  logs     - Mostra os logs em tempo real"
    echo "  build    - Reconstrói a imagem Docker"
    echo "  rebuild  - Reconstrói e inicia a aplicação"
    echo "  status   - Mostra o status dos containers"
    echo "  clean    - Remove containers e volumes"
    exit 1
    ;;
esac

