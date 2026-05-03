package com.guibsonsoftwares.futpitacos.model;

public enum TipoCaracteristicaEnum {
    TAMANHO(1L, "TAMANHO", "Tamanho"),
    COR(2L, "COR", "Cor");

    private final Long id;
    private final String nome;
    private final String label;

    TipoCaracteristicaEnum(Long id, String nome, String label) {
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

    public static TipoCaracteristicaEnum fromId(Long id) {
        for (TipoCaracteristicaEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoCaracteristicaEnum não encontrado para o id: " + id);
    }
}
