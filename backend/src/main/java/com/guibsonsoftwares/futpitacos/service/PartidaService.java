package com.guibsonsoftwares.futpitacos.service;

import com.guibsonsoftwares.futpitacos.model.Partida;
import com.guibsonsoftwares.futpitacos.model.StatusPartidaEnum;
import com.guibsonsoftwares.futpitacos.repository.PartidaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PartidaService {

    private final PartidaRepository partidaRepository;

    public PartidaService(PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public List<Partida> listarTodas() {
        return partidaRepository.findAll();
    }

    public Optional<Partida> buscarPorId(Long id) {
        return partidaRepository.findById(id);
    }

    public Partida buscarPorIdOuErro(Long id) {
        return partidaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Partida não encontrada para o id: " + id));
    }

    public List<Partida> listarPorStatus(StatusPartidaEnum status) {
        return partidaRepository.findByStatusPartida(status);
    }

    public List<Partida> listarPorCampeonato(Long idCampeonato) {
        return partidaRepository.findByCampeonatoId(idCampeonato);
    }

    public List<Partida> listarPorCampeonatoEStatus(Long idCampeonato, StatusPartidaEnum status) {
        return partidaRepository.findByCampeonatoIdAndStatusPartida(idCampeonato, status);
    }

    public List<Partida> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return partidaRepository.findByDataHoraBetween(inicio, fim);
    }

    public List<Partida> listarPorClube(Long idClube) {
        return partidaRepository.findByClube(idClube);
    }

    public List<Partida> listarProximasPartidasPorCampeonato(Long idCampeonato) {
        return partidaRepository.findProximasPartidasPorCampeonato(idCampeonato, LocalDateTime.now());
    }

    @Transactional
    public Partida salvar(Partida partida) {
        if (partida.getStatusPartida() == null) {
            partida.setStatusPartida(StatusPartidaEnum.AGUARDANDO_INICIO);
        }
        return partidaRepository.save(partida);
    }

    @Transactional
    public Partida atualizar(Long id, Partida dadosAtualizados) {
        Partida partida = buscarPorIdOuErro(id);
        partida.setClubeCasa(dadosAtualizados.getClubeCasa());
        partida.setClubeVisitante(dadosAtualizados.getClubeVisitante());
        partida.setDataHora(dadosAtualizados.getDataHora());
        partida.setGolsCasa(dadosAtualizados.getGolsCasa());
        partida.setGolsVisitante(dadosAtualizados.getGolsVisitante());
        partida.setStatusPartida(dadosAtualizados.getStatusPartida());
        partida.setCampeonato(dadosAtualizados.getCampeonato());
        partida.setInfos(dadosAtualizados.getInfos());
        return partidaRepository.save(partida);
    }

    @Transactional
    public Partida atualizarStatus(Long id, StatusPartidaEnum novoStatus) {
        Partida partida = buscarPorIdOuErro(id);
        partida.setStatusPartida(novoStatus);
        return partidaRepository.save(partida);
    }

    @Transactional
    public Partida registrarPlacar(Long id, Integer golsCasa, Integer golsVisitante) {
        Partida partida = buscarPorIdOuErro(id);
        partida.setGolsCasa(golsCasa);
        partida.setGolsVisitante(golsVisitante);
        return partidaRepository.save(partida);
    }

    @Transactional
    public void deletar(Long id) {
        Partida partida = buscarPorIdOuErro(id);
        partidaRepository.delete(partida);
    }
}

