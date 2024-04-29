import { gql } from "@apollo/client";

export const OBTER_CARRINHO = gql`
query ObterCarrinho{
  carrinho {
    total
    itens {
      livroId
      quantidade
      opcaoCompra { 
        id
        preco
      }
      livro {
        id
        imagemCapa
        titulo
        descricao        
        autor {
          nome
        }
      }
    }
  }
}
`

export const ADICIONAR_ITEM = gql`
mutation AdicionarItem($item: ItemCarrinhoInput!) {
  adicionarItem(item: $item)
}
`

export const REMOVER_ITEM = gql`
mutation RemoverItem($item: ItemCarrinhoInput!) {
  removerItem(item: $item)
}
`