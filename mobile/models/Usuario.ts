import Endereco from "./Endereco";
import Pitacard from "./Pitacard";

export default interface Usuario {
    id: number;
    nickname: string;
    email: string;
    quantidadeMoedas: number;
    quantidadeDiamantes: number;
    enderecos: Endereco[];
    pitacards: Pitacard[];
}