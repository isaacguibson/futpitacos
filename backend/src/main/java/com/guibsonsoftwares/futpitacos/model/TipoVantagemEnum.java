package com.guibsonsoftwares.futpitacos.model;

public enum TipoVantagemEnum {
    MOEDA(1L, "MOEDA", "Moeda"),
    DIAMANTE(2L, "DIAMANTE", "Diamante");

    private final Long id;
    private final String nome;
    private final String label;

    TipoVantagemEnum(Long id, String nome, String label) {
        this.id = id;
        this.nome = nome;
        this.label = label;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getLabel() {
        return label;
    }

    public static TipoVantagemEnum fromId(Long id) {
        for (TipoVantagemEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoVantagemEnum não encontrado para o id: " + id);
    }
}

