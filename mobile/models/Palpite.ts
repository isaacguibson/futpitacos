import Endereco from "./Endereco";
import Partida from "./Partida";
import Pitacard from "./Pitacard";

export default class Palpite {
    id: number | undefined;
    partida: Partida | undefined;
    golsCasa: number | undefined;
    golsVisitante: number | undefined;
    pitacards: Pitacard[] | undefined;
}