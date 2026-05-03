package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "valor_caracteristica", schema = "dbo")
public class ValorCaracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tipo_caracteristica", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private TipoCaracteristicaEnum idTipoCaracteristica;

    @Column(name = "valor", nullable = false)
    private Integer valor = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoCaracteristicaEnum getIdTipoCaracteristica() {
        return idTipoCaracteristica;
    }

    public void setIdTipoCaracteristica(TipoCaracteristicaEnum idTipoCaracteristica) {
        this.idTipoCaracteristica = idTipoCaracteristica;
    }

    public Integer getValor() {
        return valor;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }
}

