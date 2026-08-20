package com.guibsonsoftwares.futpitacos.repository;

import com.guibsonsoftwares.futpitacos.model.Partida;
import com.guibsonsoftwares.futpitacos.model.StatusPartidaEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findByStatusPartida(StatusPartidaEnum statusPartida);

    List<Partida> findByCampeonatoId(Long idCampeonato);

    List<Partida> findByCampeonatoIdAndStatusPartida(Long idCampeonato, StatusPartidaEnum statusPartida);

    List<Partida> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);

    List<Partida> findByClubeCasaIdOrClubeVisitanteId(Long idClubeCasa, Long idClubeVisitante);

    @Query("SELECT p FROM Partida p WHERE p.clubeCasa.id = :idClube OR p.clubeVisitante.id = :idClube")
    List<Partida> findByClube(@Param("idClube") Long idClube);

    @Query("SELECT p FROM Partida p WHERE p.campeonato.id = :idCampeonato AND p.dataHora >= :agora ORDER BY p.dataHora ASC")
    List<Partida> findProximasPartidasPorCampeonato(@Param("idCampeonato") Long idCampeonato,
                                                    @Param("agora") LocalDateTime agora);
}

