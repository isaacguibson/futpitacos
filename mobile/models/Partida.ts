import Clube from "./Clube";
import Endereco from "./Endereco";
import Palpite from "./Palpite";
import Pitacard from "./Pitacard";

export default class Partida {
    id: number | undefined;
    clubeCasa: Clube | undefined;
    clubeVisitante: Clube | undefined;
    dataHora: Date | undefined;
    golsCasa: number | undefined;
    golsVisitante: number | undefined;
    palpite: Palpite | undefined;
    campeonato: number | undefined;
    status: number | undefined;
    infos: string | undefined;
}