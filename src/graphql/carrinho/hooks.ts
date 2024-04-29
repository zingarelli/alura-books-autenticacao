import { useMutation, useQuery } from "@apollo/client"
import { ADICIONAR_ITEM, OBTER_CARRINHO, REMOVER_ITEM } from "./queries"
import { ICarrinho } from "../../interfaces/ICarrinho"

export const useCarrinho = () => {
    return useQuery<{ carrinho: ICarrinho }>(OBTER_CARRINHO)
}

export const useAdicionarItem = () => {
    // useMutation retorna uma tupla, cujo primeiro item é a função que executa a mutation
    // e o segundo item é um objeto com os resultados da execução da mutation
    return useMutation(ADICIONAR_ITEM, {
        // faço novamente a query de obter carrinho toda vez que a função de mutation for 
        // chamada, de modo a atualizar o carrinho
        refetchQueries: [OBTER_CARRINHO]
    });
}

export const useRemoverItem = () => {
    return useMutation(REMOVER_ITEM, {
        refetchQueries: [
            OBTER_CARRINHO
        ]
    })
}