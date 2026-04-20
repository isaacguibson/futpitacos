import Endereco from "./Endereco";
import HistoricoPedido from "./HistoricoPedido";
import Usuario from "./Usuario";

export default interface Pedido {
    id: number;
    usuario: Usuario;
    Endereco: Endereco;
    historicoPedidos: HistoricoPedido[];
}