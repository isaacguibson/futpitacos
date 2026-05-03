package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_pedido", schema = "dbo")
public class HistoricoPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @Column(name = "id_status_pedido", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private StatusPedidoEnum idStatusPedido;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public StatusPedidoEnum getIdStatusPedido() {
        return idStatusPedido;
    }

    public void setIdStatusPedido(StatusPedidoEnum idStatusPedido) {
        this.idStatusPedido = idStatusPedido;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}

