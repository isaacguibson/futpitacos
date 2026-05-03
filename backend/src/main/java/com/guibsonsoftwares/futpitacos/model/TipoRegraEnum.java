package com.guibsonsoftwares.futpitacos.model;

public enum TipoRegraEnum {
    SOMA(1L, "SOMA", "Soma"),
    MULTIPLICACAO(2L, "MULTIPLICACAO", "Multiplicação");

    private final Long id;
    private final String nome;
    private final String label;

    TipoRegraEnum(Long id, String nome, String label) {
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

    public static TipoRegraEnum fromId(Long id) {
        for (TipoRegraEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoRegraEnum não encontrado para o id: " + id);
    }
}

