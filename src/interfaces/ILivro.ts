import { IAutor } from "./IAutor"
import { IOpcaoCompra } from "./IOpcaoCompra"
import { ITag } from "./ITag"

export interface ILivroEAutor {
    id: number
    titulo: string
    descricao: string
    imagemCapa: string
    autor: IAutor
    opcoesCompra: IOpcaoCompra[]
    sobre: string
    tags: ITag[]
}

// nova interface (dados da API)
export interface ILivro {
    id: number
    categoria: number
    titulo: string // antigo nome
    slug: string
    descricao: string
    isbn: string
    numeroPaginas: number
    publicacao: string
    imagemCapa: string // antigo imagem
    autor: number
    opcoesCompra: IOpcaoCompra[]
    sobre: string
}

// antiga interface (hard-coded)
// export interface ILivro {
//     nome: string
//     descricao: string
//     autor: string
//     imagem: string
//     preco: number
// }