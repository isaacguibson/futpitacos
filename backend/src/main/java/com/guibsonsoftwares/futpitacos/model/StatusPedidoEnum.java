package com.guibsonsoftwares.futpitacos.model;

public enum StatusPedidoEnum {
    PREPARANDO_PEDIDO(1L, "PREPARANDO_PEDIDO", "Preparando Pedido"),
    ENVIADO(2L, "ENVIADO", "Enviado"),
    ENTREGUE(3L, "ENTREGUE", "Entregue");

    private final Long id;
    private final String nome;
    private final String label;

    StatusPedidoEnum(Long id, String nome, String label) {
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

    public static StatusPedidoEnum fromId(Long id) {
        for (StatusPedidoEnum status : values()) {
            if (status.id.equals(id)) {
                return status;
            }
        }
        throw new IllegalArgumentException("StatusPedidoEnum não encontrado para o id: " + id);
    }
}

