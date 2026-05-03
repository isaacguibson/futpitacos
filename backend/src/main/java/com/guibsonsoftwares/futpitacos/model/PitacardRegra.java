package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pitacard_regra", schema = "dbo")
public class PitacardRegra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pitacard", nullable = false)
    private Pitacard pitacard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_regra", nullable = false)
    private Regra regra;

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

    public Regra getRegra() {
        return regra;
    }

    public void setRegra(Regra regra) {
        this.regra = regra;
    }
}

