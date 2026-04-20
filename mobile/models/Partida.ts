import Endereco from "./Endereco";
import Palpite from "./Palpite";
import Pitacard from "./Pitacard";

export default interface Partida {
    id: number;
    clubeCasa: string;
    clubeVisitante: string;
    dataHora: Date;
    golsCasa: number;
    golsVisitante: number;
    palpite: Palpite | null;
    campeonato: number;
    status: number;
    infos: string;
}