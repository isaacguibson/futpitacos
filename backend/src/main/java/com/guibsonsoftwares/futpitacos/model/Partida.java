package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "partida", schema = "dbo")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_clube_casa", nullable = false)
    private Clube clubeCasa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_clube_visitante", nullable = false)
    private Clube clubeVisitante;

    @Column(name = "gols_casa", nullable = false)
    private Integer golsCasa = 0;

    @Column(name = "gols_visitante", nullable = false)
    private Integer golsVisitante = 0;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(name = "id_status_partida", nullable = false, length = 255)
    private StatusPartidaEnum statusPartida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_campeonato", nullable = false)
    private Campeonato campeonato;

    @Column(name = "infos", nullable = false, length = 1000)
    private String infos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Clube getClubeCasa() {
        return clubeCasa;
    }

    public void setClubeCasa(Clube clubeCasa) {
        this.clubeCasa = clubeCasa;
    }

    public Clube getClubeVisitante() {
        return clubeVisitante;
    }

    public void setClubeVisitante(Clube clubeVisitante) {
        this.clubeVisitante = clubeVisitante;
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

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusPartidaEnum getStatusPartida() {
        return statusPartida;
    }

    public void setStatusPartida(StatusPartidaEnum statusPartida) {
        this.statusPartida = statusPartida;
    }

    public Campeonato getCampeonato() {
        return campeonato;
    }

    public void setCampeonato(Campeonato campeonato) {
        this.campeonato = campeonato;
    }

    public String getInfos() {
        return infos;
    }

    public void setInfos(String infos) {
        this.infos = infos;
    }
}

