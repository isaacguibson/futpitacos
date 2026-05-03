package com.guibsonsoftwares.futpitacos.model;

public enum TipoMoedaEnum {
    PITACOIN(1L, "PITACOIN", "Pitacoin"),
    DIAMANTE(2L, "DIAMANTE", "Diamante"),
    REAL(3L, "REAL", "Real");

    private final Long id;
    private final String nome;
    private final String label;

    TipoMoedaEnum(Long id, String nome, String label) {
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

    public static TipoMoedaEnum fromId(Long id) {
        for (TipoMoedaEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoMoedaEnum não encontrado para o id: " + id);
    }
}
