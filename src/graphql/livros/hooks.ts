import { ILivro, ILivroEAutor } from "../../interfaces/ILivro"
import { OBTER_LANCAMENTOS, OBTER_LIVROS, OBTER_LIVRO_POR_SLUG, OBTER_MAIS_VENDIDOS } from "./queries"
import { ICategoria } from "../../interfaces/ICategoria"
import { useQuery, useReactiveVar } from "@apollo/client"
import { filtroLivrosVar, livroVar, livrosVar } from "./state"

// solução para GraphQL COM variável reativa
export const useLivros = () => {
    // obtenho os filtros da variável reativa
    const filtro = useReactiveVar(filtroLivrosVar)

    return useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
        variables: {
            categoriaId: filtro.categoria?.id,
            titulo: filtro.titulo
        },
        // atualizando a variável reativa com o resultado da query
        onCompleted(data) {
            if (data.livros) livrosVar(data.livros);
        }
    })
}

// solução para GraphQL sem variável reativa
// export const useLivros = (categoria: ICategoria) => {
//     // tipando o campo "livros" retornado pelo "data" do useQuery
//     return useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
//         variables: {
//             categoriaId: categoria.id
//         }
//     })
// }

export const useLancamentos = () => {
    return useQuery<{ destaques: { lancamentos: ILivro[] } }>(OBTER_LANCAMENTOS)
}

export const useMaisVendidos = () => {
    return useQuery<{ destaques: { maisVendidos: ILivro[] } }>(OBTER_MAIS_VENDIDOS)
}

export const useLivroPorSlug = (slug: string) => {
    return useQuery<{ livro: ILivroEAutor }>(OBTER_LIVRO_POR_SLUG, {
        variables: {
            slug
        },
        onCompleted(data) {
            if (data.livro) livroVar(data.livro)
        }
    })
}