-- Cria o schema dbo
CREATE SCHEMA IF NOT EXISTS dbo;

-- Concede permissões no schema dbo ao usuário futpitacos
GRANT ALL ON SCHEMA dbo TO futpitacos;
ALTER DEFAULT PRIVILEGES IN SCHEMA dbo GRANT ALL ON TABLES TO futpitacos;
ALTER DEFAULT PRIVILEGES IN SCHEMA dbo GRANT ALL ON SEQUENCES TO futpitacos;

CREATE TABLE IF NOT EXISTS dbo.clube (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,
    cores VARCHAR(255) NOT NULL,

    CONSTRAINT pk_clube PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.campeonato (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,

    CONSTRAINT pk_campeonato PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.usuario (
    id    BIGSERIAL    NOT NULL,
    nickname  VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255) NOT NULL,
    quantidade_moedas INTEGER NOT NULL DEFAULT 0,
    quantidade_diamantes INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_usuario PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.endereco (
    id    BIGSERIAL    NOT NULL,
    logradouro  VARCHAR(1000) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,

    CONSTRAINT pk_endereco PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.produto (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    imagem VARCHAR(1000) NOT NULL,
    porcentagem_desconto INTEGER NOT NULL DEFAULT 0,
    valor INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_produto PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.loja (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,

    CONSTRAINT pk_loja PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.imagem_produto (
    id         BIGSERIAL     NOT NULL,
    id_produto BIGINT        NOT NULL,
    imagem     VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_imagem_produto PRIMARY KEY (id),
    CONSTRAINT fk_imagem_produto_produto FOREIGN KEY (id_produto) REFERENCES dbo.produto (id)
);

CREATE TABLE IF NOT EXISTS dbo.endereco_usuario (
    id         BIGSERIAL     NOT NULL,
    id_endereco BIGINT        NOT NULL,
    id_usuario BIGINT        NOT NULL,

    CONSTRAINT pk_endereco_usuario PRIMARY KEY (id),
    CONSTRAINT fk_endereco_usuario_endereco FOREIGN KEY (id_endereco) REFERENCES dbo.endereco (id),
    CONSTRAINT fk_endereco_usuario_usuario FOREIGN KEY (id_usuario) REFERENCES dbo.usuario (id)
);

CREATE TABLE IF NOT EXISTS dbo.partida (
    id    BIGSERIAL    NOT NULL,
    id_clube_casa   BIGINT    NOT NULL,
    id_clube_visitante   BIGINT    NOT NULL,
    gols_casa INTEGER NOT NULL DEFAULT 0,
    gols_visitante INTEGER NOT NULL DEFAULT 0,
    data_hora TIMESTAMP NOT NULL,
    id_status_partida VARCHAR(255) NOT NULL,
    id_campeonato BIGINT NOT NULL,
    infos VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_partida PRIMARY KEY (id),
    CONSTRAINT fk_partida_clube_casa FOREIGN KEY (id_clube_casa) REFERENCES dbo.clube (id),
    CONSTRAINT fk_partida_clube_visitante FOREIGN KEY (id_clube_visitante) REFERENCES dbo.clube (id),
    CONSTRAINT fk_partida_campeonato FOREIGN KEY (id_campeonato) REFERENCES dbo.campeonato (id)
);

CREATE TABLE IF NOT EXISTS dbo.produto_virtual (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,
    id_tipo_moeda VARCHAR(255) NOT NULL,
    id_tipo_produto VARCHAR(255) NOT NULL,
    id_loja BIGINT NOT NULL,
    imagem     VARCHAR(1000) NOT NULL,
    porcentagem_desconto INTEGER NOT NULL DEFAULT 0,
    valor INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_produto_virtual PRIMARY KEY (id),
    CONSTRAINT fk_produto_virtual_loja FOREIGN KEY (id_loja) REFERENCES dbo.loja (id)
);

CREATE TABLE IF NOT EXISTS dbo.valor_caracteristica (
    id    BIGSERIAL    NOT NULL,
    id_tipo_caracteristica VARCHAR(255) NOT NULL,
    valor INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_valor_caracteristica PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dbo.valor_caracteristica_produto (
    id    BIGSERIAL    NOT NULL,
    id_valor_caracteristica BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,

    CONSTRAINT pk_valor_caracteristica_produto PRIMARY KEY (id),
    CONSTRAINT fk_valor_caracteristica_produto_valor_caracteristica FOREIGN KEY (id_valor_caracteristica) REFERENCES dbo.valor_caracteristica (id),
    CONSTRAINT fk_valor_caracteristica_produto_produto FOREIGN KEY (id_produto) REFERENCES dbo.produto (id)
);

CREATE TABLE IF NOT EXISTS dbo.pedido (
    id    BIGSERIAL    NOT NULL,
    id_usuario BIGINT NOT NULL,
    id_endereco BIGINT NOT NULL,
    codigo_rastreamento VARCHAR(255) NOT NULL,
    link_rastreamento VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_pedido PRIMARY KEY (id),
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES dbo.usuario (id),
    CONSTRAINT fk_pedido_endereco FOREIGN KEY (id_endereco) REFERENCES dbo.endereco (id)
);

CREATE TABLE IF NOT EXISTS dbo.historico_pedido (
    id    BIGSERIAL    NOT NULL,
    id_pedido BIGINT NOT NULL,
    id_status_pedido VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP NOT NULL,

    CONSTRAINT pk_historico_pedido PRIMARY KEY (id),
    CONSTRAINT fk_historico_pedido_pedido FOREIGN KEY (id_pedido) REFERENCES dbo.pedido (id),
    CONSTRAINT fk_historico_pedido_status_pedido FOREIGN KEY (id_status_pedido) REFERENCES dbo.status_pedido (id)
);

CREATE TABLE IF NOT EXISTS dbo.pedido_produto (
    id    BIGSERIAL    NOT NULL,
    id_pedido BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,

    CONSTRAINT pk_pedido_produto PRIMARY KEY (id),
    CONSTRAINT fk_pedido_produto_pedido FOREIGN KEY (id_pedido) REFERENCES dbo.pedido (id),
    CONSTRAINT fk_pedido_produto_produto FOREIGN KEY (id_produto) REFERENCES dbo.produto (id)
);

CREATE TABLE IF NOT EXISTS dbo.palpite (
    id    BIGSERIAL    NOT NULL,
    id_partida BIGINT NOT NULL,
    id_status_palpite BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    gols_casa INTEGER NOT NULL DEFAULT 0,
    gols_visitante INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_palpite PRIMARY KEY (id),
    CONSTRAINT fk_palpite_partida FOREIGN KEY (id_partida) REFERENCES dbo.partida (id),
    CONSTRAINT fk_palpite_status_palpite FOREIGN KEY (id_status_palpite) REFERENCES dbo.status_palpite (id),
    CONSTRAINT fk_palpite_usuario FOREIGN KEY (id_usuario) REFERENCES dbo.usuario (id)
);

CREATE TABLE IF NOT EXISTS dbo.pitacard (
    id    BIGSERIAL    NOT NULL,
    nome  VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    id_tipo_raridade BIGINT NOT NULL,
    imagem VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_pitacard PRIMARY KEY (id),
    CONSTRAINT fk_pitacard_tipo_raridade FOREIGN KEY (id_tipo_raridade) REFERENCES dbo.tipo_raridade (id)
);

CREATE TABLE IF NOT EXISTS dbo.regra (
    id    BIGSERIAL    NOT NULL,
    id_tipo_regra BIGINT NOT NULL,
    id_tipo_vantagem BIGINT NOT NULL,
    valor INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_regra PRIMARY KEY (id),
    CONSTRAINT fk_regra_tipo_regra FOREIGN KEY (id_tipo_regra) REFERENCES dbo.tipo_regra (id),
    CONSTRAINT fk_regra_tipo_vantagem FOREIGN KEY (id_tipo_vantagem) REFERENCES dbo.tipo_vantagem (id)
);

CREATE TABLE IF NOT EXISTS dbo.pitacard_regra (
    id    BIGSERIAL    NOT NULL,
    id_pitacard BIGINT NOT NULL,
    id_regra BIGINT NOT NULL,

    CONSTRAINT pk_pitacard_regra PRIMARY KEY (id),
    CONSTRAINT fk_pitacard_regra_pitacard FOREIGN KEY (id_pitacard) REFERENCES dbo.pitacard (id),
    CONSTRAINT fk_pitacard_regra_regra FOREIGN KEY (id_regra) REFERENCES dbo.regra (id)
);

CREATE TABLE IF NOT EXISTS dbo.pitacard_palpite (
    id    BIGSERIAL    NOT NULL,
    id_pitacard BIGINT NOT NULL,
    id_palpite BIGINT NOT NULL,

    CONSTRAINT pk_pitacard_palpite PRIMARY KEY (id),
    CONSTRAINT fk_pitacard_palpite_pitacard FOREIGN KEY (id_pitacard) REFERENCES dbo.pitacard (id),
    CONSTRAINT fk_pitacard_palpite_palpite FOREIGN KEY (id_palpite) REFERENCES dbo.palpite (id)
);

CREATE TABLE IF NOT EXISTS dbo.usuario_pitacard (
    id_usuario  BIGINT  NOT NULL,
    id_pitacard BIGINT  NOT NULL,
    quantidade  INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT pk_usuario_pitacard PRIMARY KEY (id_usuario, id_pitacard),
    CONSTRAINT fk_usuario_pitacard_usuario FOREIGN KEY (id_usuario) REFERENCES dbo.usuario (id),
    CONSTRAINT fk_usuario_pitacard_pitacard FOREIGN KEY (id_pitacard) REFERENCES dbo.pitacard (id)
);