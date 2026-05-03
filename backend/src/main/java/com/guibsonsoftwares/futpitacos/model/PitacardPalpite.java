package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pitacard_palpite", schema = "dbo")
public class PitacardPalpite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pitacard", nullable = false)
    private Pitacard pitacard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_palpite", nullable = false)
    private Palpite palpite;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pitacard getPitacard() {
        return pitacard;
    }

    public void setPitacard(Pitacard pitacard) {
        this.pitacard = pitacard;
    }

    public Palpite getPalpite() {
        return palpite;
    }

    public void setPalpite(Palpite palpite) {
        this.palpite = palpite;
    }
}

