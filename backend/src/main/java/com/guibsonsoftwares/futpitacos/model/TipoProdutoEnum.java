package com.guibsonsoftwares.futpitacos.model;

public enum TipoProdutoEnum {
    BAU_COMUM(1L, "BAU_COMUM", "Baú Comum"),
    BAU_RARO(2L, "BAU_RARO", "Baú Raro"),
    BAU_EPICO(3L, "BAU_EPICO", "Baú Épico"),
    PACOTE_DIAMANTES_BASICO(4L, "PACOTE_DIAMANTES_BASICO", "Pacote de Diamantes Básico"),
    PACOTE_DIAMANTES_INTERMEDIARIO(5L, "PACOTE_DIAMANTES_INTERMEDIARIO", "Pacote de Diamantes Intermediário"),
    PACOTE_DIAMANTES_AVANCADO(6L, "PACOTE_DIAMANTES_AVANCADO", "Pacote de Diamantes Avançado"),
    PACOTE_MOEDAS_BASICO(7L, "PACOTE_MOEDAS_BASICO", "Pacote de Moedas Básico"),
    PACOTE_MOEDAS_INTERMEDIARIO(8L, "PACOTE_MOEDAS_INTERMEDIARIO", "Pacotes de Moedas Intermediário"),
    PACOTE_MOEDAS_AVANCADO(9L, "PACOTE_MOEDAS_AVANCADO", "Pacote de Moedas Avançado");

    private final Long id;
    private final String nome;
    private final String label;

    TipoProdutoEnum(Long id, String nome, String label) {
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

    public static TipoProdutoEnum fromId(Long id) {
        for (TipoProdutoEnum tipo : values()) {
            if (tipo.id.equals(id)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("TipoProdutoEnum não encontrado para o id: " + id);
    }
}
