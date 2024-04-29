import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAdicionarItem, useCarrinho, useRemoverItem } from "../../graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
    carrinho?: ICarrinho;
    adicionarItemCarrinho: (item: IItemCarrinho) => void;
    removerItemCarrinho: (item: IItemCarrinho) => void;
    carregando: boolean; // informa se alguma query ainda está em execução
}

interface CarrinhoProviderProps {
    children: ReactElement;
}

// criação do contexto
export const CarrinhoContext = createContext<ICarrinhoContext>({
    carregando: false,
    // essas funções serão implementadas por quem usar o contexto
    adicionarItemCarrinho: () => null,
    removerItemCarrinho: () => null
});

// hook customizado para consumir o contexto
export const useCarrinhoContext = () => useContext<ICarrinhoContext>(CarrinhoContext);

// provedor do contexto para seus elementos filhos
const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
    const { data, loading: loadingCarrinho } = useCarrinho();

    // O primeiro elemento da tupla retornada pelo useMutate é a função que executa a mutação.
    // Podemos dar o nome que quisermos a esse elemento. O segundo elemento é um objeto com os 
    // resultados da execução da mutation. Dentre eles, temos a propriedade booleana loading,
    // que é true se a query ainda estão em execução.
    const [adicionaItem, { loading: loadingAdicionar }] = useAdicionarItem();
    const [removeItem] = useRemoverItem();

    // implementação das funções exigidas pelo context
    const adicionarItemCarrinho = (item: IItemCarrinho) => {
        adicionaItem({
            variables: {
                item: {
                    livroId: item.livroId,
                    opcaoCompraId: item.opcaoCompra.id,
                    quantidade: item.quantidade
                }
            }
        })
    }

    const removerItemCarrinho = (item: IItemCarrinho) => {
        // na documentação para essa base no GraphQL, a mutation de remover item tem 
        // como obrigatório passar um livroId e uma opcaoCompraId
        removeItem({
            variables: {
                item: {
                    livroId: item.livroId,
                    opcaoCompraId: item.opcaoCompra.id
                }
            }
        })
    }

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho: data?.carrinho,
                adicionarItemCarrinho,
                removerItemCarrinho,
                carregando: loadingCarrinho || loadingAdicionar
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}

export default CarrinhoProvider