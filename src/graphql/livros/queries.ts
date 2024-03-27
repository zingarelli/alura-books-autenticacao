import { gql } from "@apollo/client";

export const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id
      imagemCapa
      slug
      titulo
      opcoesCompra {
        preco
        id
      }
    }
  }
`

// TODO: OBTER_LANCAMENTOS e OBTER_MAIS_VENDIDOS poderiam ser unidos em uma única query OBTER_DESTAQUES
export const OBTER_LANCAMENTOS = gql`
  query ObterLancamentos {
    destaques {
      lancamentos {
        id
        titulo
        imagemCapa
        descricao
        autorId
        opcoesCompra {
          preco
        }
      }
    }
  }
`

export const OBTER_MAIS_VENDIDOS = gql`
  query ObterMaisVendidos {
    destaques {
      maisVendidos {
        id
        titulo
        imagemCapa
        descricao
        autorId
        opcoesCompra {
          preco
        }
      }
    }
  }
`

export const OBTER_LIVRO_POR_SLUG = gql`
  query ObterLivroPorSlug($slug: String!) {
    livro(slug: $slug) {
      id
      imagemCapa
      titulo
      descricao
      sobre
      tags {
        id
        nome
      }
      opcoesCompra {
        id
        titulo
        formatos
        preco
      }
      autor {
        nome
        sobre
      }
    }
  }
`