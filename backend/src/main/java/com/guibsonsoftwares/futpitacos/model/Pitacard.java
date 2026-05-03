package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pitacard", schema = "dbo")
public class Pitacard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 255)
    private String nome;

    @Column(name = "descricao", nullable = false, length = 1000)
    private String descricao;

    @Column(name = "id_tipo_raridade", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private TipoRaridadeEnum idTipoRaridade;

    @Column(name = "imagem", nullable = false, length = 1000)
    private String imagem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoRaridadeEnum getIdTipoRaridade() {
        return idTipoRaridade;
    }

    public void setIdTipoRaridade(TipoRaridadeEnum idTipoRaridade) {
        this.idTipoRaridade = idTipoRaridade;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}

