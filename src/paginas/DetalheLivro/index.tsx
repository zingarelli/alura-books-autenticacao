import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbTag } from "ds-alurabooks";
import { IOpcaoCompra } from "../../interfaces/IOpcaoCompra";
import { formataMoeda } from "../../utils/formatadores";
import "./DetalheLivro.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { obterAutorPorId, obterLivroPorSlug } from "../../http";
import Loader from "../../componentes/Loader";
import { ILivro } from "../../interfaces/ILivro";
import { AxiosError } from "axios";
import { IAutor } from "../../interfaces/IAutor";
import { useState } from "react";
import { useLivroPorSlug } from "../../graphql/livros/hooks";
import { livroVar } from "../../graphql/livros/state";
import { useReactiveVar } from "@apollo/client";
import { useCarrinhoContext } from "../../context/carrinho";

// convert em um objeto no formato esperado pelo <AbGrupoOpcoes>
const transformaEmGrupoOpcao = (opcao: IOpcaoCompra) => {
    return {
        id: opcao.id,
        titulo: opcao.titulo,
        corpo: formataMoeda.format(opcao.preco),
        rodape: opcao.formatos?.join(', ') || '',
    }
}

const transformaOpcoes = (grupoOpcoes: IOpcaoCompra[]) => {
    return grupoOpcoes.map(opcao => transformaEmGrupoOpcao(opcao))
}

const DetalheLivro = () => {
    const { slug } = useParams();
    const [quantidade, setQuantidade] = useState(0);
    const [opcao, setOpcao] = useState<AbGrupoOpcao>();

    // função que adiciona o item ao carrinho de compras
    const { adicionarItemCarrinho } = useCarrinhoContext();

    const { loading, error } = useLivroPorSlug(slug || '')
    const livro = useReactiveVar(livroVar)

    if (loading) return <Loader />

    if (livro === null) return <h2 className="erroLivro">Livro não encontrado</h2>

    if (error) {
        console.log('Erro no componente DetalheLivro:');
        console.log(error);
        return <h2 className="erroLivro">Que vergonha! Alguma coisa deu errado!</h2>
    }

    const aoAdicionarItemCarrinho = () => {
        const opcaoSelecionada = livro.opcoesCompra.find(item => item.id === opcao?.id)
        if (!opcaoSelecionada) {
            alert('Por favor, selecione uma opcao de compra!');
            return;
        }
        if (quantidade === 0){
            alert('Por favor, selecione a quantidade!');
            return;
        }
        adicionarItemCarrinho({
            livroId: livro.id,
            livro,
            opcaoCompra: opcaoSelecionada,
            quantidade
        })
        alert('Livro adicionado ao carrinho!');
    }

    // Solução com React Query
    // // o 1º generics do useQuery é para tipar o sucesso da 
    // // Promise (data) e o 2º é para tipar o caso de erro (error)
    // const { data: livro, isLoading, error: erroLivro } = useQuery<ILivro | null, AxiosError>(
    //     ['buscarLivroPorSlug', slug],
    //     () => obterLivroPorSlug(slug || '')
    // );

    // const idAutor = livro?.autor;

    // const { data: autor, error: erroAutor } = useQuery<IAutor, AxiosError>(
    //     ['buscarAutorPorId', idAutor],
    //     () => obterAutorPorId(idAutor || '')
    // );

    // if (erroAutor) {
    //     console.log(`Erro ao consultar autor: ${erroAutor.message}`);
    // }

    // if (erroLivro) {
    //     console.log('Erro no componente DetalheLivro:');
    //     console.log(erroLivro.message);
    //     return <h2 className="erroLivro">Que vergonha! Alguma coisa deu errado!</h2>
    // }

    // if (livro === null) return <h2 className="erroLivro">Livro não encontrado</h2>

    // if (isLoading || !livro) return <Loader />

    return (<>
        {livro && <article className="detalhesLivro__wrapper">
            <section className="detalhesLivro__main">
                <img src={livro.imagemCapa} alt={`capa do livro ${livro.titulo}`} />
                <div className="detalhesLivro__detalhes">
                    <h2 className="detalhes__titulo">{livro.titulo}</h2>
                    <h3 className="detalhes__subtitulo">{livro.descricao}</h3>
                    {/* TODO: buscar autor na API */}
                    <p className="detalhes__autor">Por: {livro.autor.nome}</p>
                    {/* <p className="detalhes__autor">Por: {autor?.nome}</p> */}
                    <p className="detalhes__formato"><strong>Selecione o formato do seu livro</strong></p>
                    <div className="detalhes__opcoes">
                        <AbGrupoOpcoes 
                            opcoes={transformaOpcoes(livro.opcoesCompra)} 
                            onChange={setOpcao}
                            valorPadrao={opcao}
                        />
                    </div>
                    <p className="detalhes__observacao">*Você terá acesso às futuras atualizações do livro.</p>
                    <div className="detalhes__quantidade">
                        <AbInputQuantidade onChange={setQuantidade} value={quantidade} />
                    </div>
                    <AbBotao texto="Comprar" onClick={aoAdicionarItemCarrinho} />
                </div>
            </section>
            <section className="detalhesLivro__section">
                <h2 className="detalhesLivro__subtitulo">Sobre o autor</h2>
                {/* <p>{autor?.sobre}</p> */}
                <p>{livro.autor.sobre}</p>
            </section>
            <section className="detalhesLivro__section">
                <h2 className="detalhesLivro__subtitulo">Sobre o livro</h2>
                <p>{livro.sobre}</p>
            </section>
            <div className="detalhesLivro__tags">
                {livro.tags?.map(tag => <AbTag key={tag.id} texto={tag.nome} contexto="secundario" />)}
            </div>
        </article>
        }
    </>)
}

export default DetalheLivro;