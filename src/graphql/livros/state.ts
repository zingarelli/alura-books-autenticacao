import { makeVar } from "@apollo/client";
import { ILivro, ILivroEAutor } from "../../interfaces/ILivro";
import { ICategoria } from "../../interfaces/ICategoria";

interface FiltroLivros {
    categoria?: ICategoria,
    titulo?: string
}

// variável reativa para controlar o estado de um array de livros
export const livrosVar = makeVar<ILivro[]>([])

// variável reativa para poder filtrar livros por categoria ou título
export const filtroLivrosVar = makeVar<FiltroLivros>({})

export const livroVar = makeVar<ILivroEAutor | null>(null)

export const livroVarLoading = makeVar<boolean>(false)