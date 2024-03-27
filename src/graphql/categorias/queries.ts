import { gql } from "@apollo/client";

export const OBTER_CATEGORIAS = gql`
  query ObterCategorias {
    categorias {
      id
      nome
      slug
    }
  }
`