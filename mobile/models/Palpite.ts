import Endereco from "./Endereco";
import Partida from "./Partida";
import Pitacard from "./Pitacard";

export default interface Palpite {
    id: number;
    partida: Partida;
    golsCasa: number;
    golsVisitante: number;
    pitacards: Pitacard[];
}