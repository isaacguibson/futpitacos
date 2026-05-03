package com.guibsonsoftwares.futpitacos.model;

public enum TipoRaridadeEnum {
    COMUM(1L, "COMUM", "Comum"),
    RARA(2L, "RARA", "Rara"),
    EPICA(3L, "EPICA", "Épica");

    private final Long id;
    private final String nome;
    private final String label;

    TipoRaridadeEnum(Long id, String nome, String label) {
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

    public static TipoRaridadeEnum fromId(Long id) {
        for (TipoRaridadeEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoRaridadeEnum não encontrado para o id: " + id);
    }
}

