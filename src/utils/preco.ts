import { IOpcaoCompra } from "../interfaces/IOpcaoCompra";

export const precoMaisBarato = (opcoes: IOpcaoCompra[]) => Math.min(...opcoes.map(opcao => opcao.preco))