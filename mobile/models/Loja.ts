import ProdutoVirtual from "./ProdutoVirtual";

export default interface Loja {
    id: number;
    nome: string;
    produtos: ProdutoVirtual[];
}