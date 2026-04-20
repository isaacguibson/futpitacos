import CaracteristicaProduto from "./CaracteristicaProduto";

export default interface ProdutoVirtual {
    id: number;
    nome: string;
    tipoMoeda: string;
    tipoProduto: string;
    imagem: string;
}