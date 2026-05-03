-- Cria o usuário futpitacos caso não exista
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'futpitacos') THEN
      CREATE USER futpitacos WITH PASSWORD 'futpitacos123';
   END IF;
END
$$;

-- Concede todas as permissões no banco
GRANT ALL PRIVILEGES ON DATABASE futpitacos TO futpitacos;

-- Concede permissões no schema public
GRANT ALL ON SCHEMA public TO futpitacos;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO futpitacos;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO futpitacos;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO futpitacos;

-- Garante permissões em objetos futuros
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO futpitacos;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO futpitacos;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO futpitacos;

