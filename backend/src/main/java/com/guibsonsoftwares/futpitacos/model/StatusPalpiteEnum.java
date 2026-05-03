package com.guibsonsoftwares.futpitacos.model;

public enum StatusPalpiteEnum {
    PALPITADO(1L, "PALPITADO", "Palpitado"),
    ACERTOU_EM_CHEIO(2L, "ACERTOU_EM_CHEIO", "Acertou em cheio"),
    ACERTO_PARCIAL(3L, "ACERTO_PARCIAL", "Acerto parcial"),
    ERROU(4L, "ERROU", "Errou");

    private final Long id;
    private final String nome;
    private final String label;

    StatusPalpiteEnum(Long id, String nome, String label) {
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

    public static StatusPalpiteEnum fromId(Long id) {
        for (StatusPalpiteEnum status : values()) {
            if (status.id.equals(id)) {
                return status;
            }
        }
        throw new IllegalArgumentException("StatusPalpiteEnum não encontrado para o id: " + id);
    }
}

