package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "valor_caracteristica_produto", schema = "dbo")
public class ValorCaracteristicaProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_valor_caracteristica", nullable = false)
    private ValorCaracteristica valorCaracteristica;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ValorCaracteristica getValorCaracteristica() {
        return valorCaracteristica;
    }

    public void setValorCaracteristica(ValorCaracteristica valorCaracteristica) {
        this.valorCaracteristica = valorCaracteristica;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}

