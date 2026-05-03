package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "palpite", schema = "dbo")
public class Palpite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_partida", nullable = false)
    private Partida partida;

    @Column(name = "id_status_palpite", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private StatusPalpiteEnum idStatusPalpite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "gols_casa", nullable = false)
    private Integer golsCasa = 0;

    @Column(name = "gols_visitante", nullable = false)
    private Integer golsVisitante = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Partida getPartida() {
        return partida;
    }

    public void setPartida(Partida partida) {
        this.partida = partida;
    }

    public StatusPalpiteEnum getIdStatusPalpite() {
        return idStatusPalpite;
    }

    public void setIdStatusPalpite(StatusPalpiteEnum idStatusPalpite) {
        this.idStatusPalpite = idStatusPalpite;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getGolsCasa() {
        return golsCasa;
    }

    public void setGolsCasa(Integer golsCasa) {
        this.golsCasa = golsCasa;
    }

    public Integer getGolsVisitante() {
        return golsVisitante;
    }

    public void setGolsVisitante(Integer golsVisitante) {
        this.golsVisitante = golsVisitante;
    }
}

