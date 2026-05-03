package com.guibsonsoftwares.futpitacos.model;

public enum StatusPartidaEnum {

    AGUARDANDO_INICIO(1L, "AGUARDANDO_INICIO", "Aguardando Início"),
    INICIADA(2L, "INICIADA", "Iniciada"),
    FINALIZADA(3L, "FINALIZADA", "Finalizada");

    private final Long id;
    private final String nome;
    private final String label;

    StatusPartidaEnum(Long id, String nome, String label) {
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

    public static StatusPartidaEnum fromId(Long id) {
        for (StatusPartidaEnum status : values()) {
            if (status.id.equals(id)) {
                return status;
            }
        }
        throw new IllegalArgumentException("StatusPartidaEnum não encontrado para o id: " + id);
    }
}

