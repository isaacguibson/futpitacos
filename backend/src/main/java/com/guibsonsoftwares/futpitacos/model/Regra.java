package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "regra", schema = "dbo")
public class Regra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tipo_regra", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private TipoRegraEnum idTipoRegra;

    @Column(name = "id_tipo_vantagem", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private TipoVantagemEnum idTipoVantagem;

    @Column(name = "valor", nullable = false)
    private Integer valor = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoRegraEnum getIdTipoRegra() {
        return idTipoRegra;
    }

    public void setIdTipoRegra(TipoRegraEnum idTipoRegra) {
        this.idTipoRegra = idTipoRegra;
    }

    public TipoVantagemEnum getIdTipoVantagem() {
        return idTipoVantagem;
    }

    public void setIdTipoVantagem(TipoVantagemEnum idTipoVantagem) {
        this.idTipoVantagem = idTipoVantagem;
    }

    public Integer getValor() {
        return valor;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }
}

