import CaracteristicaProduto from "./CaracteristicaProduto";

export default interface Produto {
    id: number;
    nome: string;
    imagem: string;
    descricao: string;
    valor: number;
    imagens: string[];
    caracteristicas: CaracteristicaProduto[];
}