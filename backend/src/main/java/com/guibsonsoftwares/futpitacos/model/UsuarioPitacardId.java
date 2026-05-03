package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UsuarioPitacardId implements Serializable {

    private Long idUsuario;
    private Long idPitacard;

    public UsuarioPitacardId() {}

    public UsuarioPitacardId(Long idUsuario, Long idPitacard) {
        this.idUsuario = idUsuario;
        this.idPitacard = idPitacard;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdPitacard() {
        return idPitacard;
    }

    public void setIdPitacard(Long idPitacard) {
        this.idPitacard = idPitacard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsuarioPitacardId)) return false;
        UsuarioPitacardId that = (UsuarioPitacardId) o;
        return Objects.equals(idUsuario, that.idUsuario) && Objects.equals(idPitacard, that.idPitacard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, idPitacard);
    }
}

