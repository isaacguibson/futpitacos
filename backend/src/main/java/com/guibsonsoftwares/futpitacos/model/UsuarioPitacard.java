package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_pitacard", schema = "dbo")
public class UsuarioPitacard {

    @EmbeddedId
    private UsuarioPitacardId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idPitacard")
    @JoinColumn(name = "id_pitacard", nullable = false)
    private Pitacard pitacard;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade = 0;

    public UsuarioPitacardId getId() {
        return id;
    }

    public void setId(UsuarioPitacardId id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Pitacard getPitacard() {
        return pitacard;
    }

    public void setPitacard(Pitacard pitacard) {
        this.pitacard = pitacard;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}

