import Clube from "@/models/Clube";
import Palpite from "@/models/Palpite";
import Partida from "@/models/Partida";
import Pitacard from "@/models/Pitacard";

export default class PartidasService {

    getPartidas() {
        const partidas = this.mockarPartidas();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(partidas);
            }, 3000);
        });
    }

    mockarPartidas() {
        const partidas = [];
        for (let i = 1; i <= 10; i++) {
            const partida = new Partida();
            partida.id = i;
            partida.clubeCasa = this.mockClube(`Clube Casa ${i}`);
            partida.clubeVisitante = this.mockClube(`Clube Visitante ${i}`);
            partida.dataHora = this.gerarDataComHoraOntemHojeAmanhaAleatoria();
            partida.golsCasa = Math.floor(Math.random() * 5);
            partida.golsVisitante = Math.floor(Math.random() * 5);
            partida.campeonato = 1;
            partida.status = Math.floor(Math.random() * 3) + 1; // 1, 2 ou 3
            partida.infos = `Informações da partida ${i}`;
            partida.palpite = this.mockPalpite();
            partidas.push(partida);
        }
        return partidas;
    }

    gerarDataComHoraOntemHojeAmanhaAleatoria() {
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);

        const dataAleatoria = new Date(ontem.getTime() + Math.random() * (amanha.getTime() - ontem.getTime()));
        dataAleatoria.setHours(Math.floor(Math.random() * 24));
        dataAleatoria.setMinutes(Math.floor(Math.random() * 60));
        return dataAleatoria;
    }

    mockClube(nome: string) {
        const clube = new Clube();
        clube.id = Math.floor(Math.random() * 100);
        clube.nome = nome;
        clube.cores = ["#FF0000", "#00FF00", "#0000FF"];
        return clube;
    }

    mockPalpite() {
        const temPalpite = Math.random() < 0.5; // 50% de chance de ter palpite
        if (!temPalpite) return undefined;
        const palpite = new Palpite();
        palpite.id = 1;
        palpite.golsCasa = 2;
        palpite.golsVisitante = 1;
        palpite.pitacards = this.gerarPitacardsAleatorios();
        return palpite;
    }

    gerarPitacardsAleatorios() {
        const raridades = [1, 2, 3]; // 1: Comum, 2: Rara, 3: Épica
        const pitacards: Pitacard[] = [];

        for(let i = 0; i < 3; i++) {
            const pitacard = new Pitacard();
            pitacard.id = Math.floor(Math.random() * 100);
            pitacard.tipoRaridade = raridades[Math.floor(Math.random() * raridades.length)];
            pitacards.push(pitacard);
        }
        
        return pitacards;
    }
}