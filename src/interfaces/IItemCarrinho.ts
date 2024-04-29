import { ILivroEAutor } from "./ILivro";
import { IOpcaoCompra } from "./IOpcaoCompra";

export interface IItemCarrinho {
    livroId: number;
    quantidade: number;
    opcaoCompra: IOpcaoCompra;
    livro: ILivroEAutor
}