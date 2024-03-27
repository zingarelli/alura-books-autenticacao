// import { useQuery } from "@tanstack/react-query";
import { ICategoria } from "../../interfaces/ICategoria";
import { obterProdutosDaCategoria } from "../../http";
import MiniCard from "../MiniCard";
import "./ListaLivros.css"
import Loader from "../Loader";
import { AbBotao, AbCampoTexto } from "ds-alurabooks";
import { useEffect, useState } from "react";
import { useLivros } from "../../graphql/livros/hooks";
import { useReactiveVar } from "@apollo/client";
import { filtroLivrosVar, livrosVar } from "../../graphql/livros/state";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoDaBusca, setTextoDaBusca] = useState('');

  useEffect(() => {
    // atualiza variável reativa com a categoria recebida via props
    filtroLivrosVar({
      ...filtroLivrosVar(), // mantenho o que já existe na variável
      categoria // e atualizo a propriedade "categoria"
    })
  }, [])

  // solução com GraphQL e variável reativa
  // chamo o hook somente para que a variável reativa seja atualizada pelo hook
  // fazendo a query por livro e adicionando os filtros definidos
  // Internamente, useLivros usa filtraLivrosVar na query e atualiza livrosVar com o resultado
  useLivros()

  // usando uma variável reativa chamada livrosVar
  // toda vez que livrosVar mudar, o componente é re-renderizado
  const livros = useReactiveVar(livrosVar)

  // o filtro por título será ativado quando houver pelo menos 3 caracteres digitados na busca
  useEffect(() => {
    filtroLivrosVar({
      ...filtroLivrosVar(), // valor atual no filtro
      titulo: textoDaBusca.length >= 3 ? textoDaBusca : '' // atualizando a propriedade "titulo"
    })
  }, [textoDaBusca])

  // solução com o React Query (que também tem um useQuery, então precisa ajustar o import)
  // const { data: produtos, isLoading } = useQuery(
  //     ['buscaLivrosPorCategoria', categoria],
  //     () => obterProdutosDaCategoria(categoria)
  // )
  // if (isLoading) return <Loader />

  // solução com GraphQL (encapsulado em um hook customizado)
  // necessário ir no código do hook e comentar a solução usando variável reativa
  // const { data, refetch } = useLivros(categoria)

  // const buscarLivros = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (textoDaBusca) {
  //     refetch({
  //       categoriaId: categoria.id,
  //       titulo: textoDaBusca
  //     })
  //   }
  // }

  return <section>
    {/* Solução com GraphQL e variável reativa */}
    <form className="buscaPorTitulo">
      <AbCampoTexto
        value={textoDaBusca}
        onChange={setTextoDaBusca}
        placeholder="Digite o título do livro"
      />
    </form>

    {/* Solução com GraphQL e hook customizado */}
    {/* <form className="buscaPorTitulo" onSubmit={buscarLivros}>
      <AbCampoTexto
        value={textoDaBusca}
        onChange={setTextoDaBusca}
        placeholder="Digite o título do livro"
      />
      <div className="buscaPorTitulo__botao">
        <AbBotao texto="Buscar" />
      </div>
    </form> */}

    <div className="livros">
      {/* com o React Query */}
      {/* {produtos?.map(livro => <MiniCard livro={livro} key={livro.id} />)} */}

      {/* com GraphQL e hook customizado */}
      {/* {data?.livros.map(livro => <MiniCard livro={livro} key={livro.id} />)} */}

      {/* com GraphQL e variável reativa */}
      {livros.map(livro => <MiniCard livro={livro} key={livro.id} />)}
    </div>

  </section>
}

export default ListaLivros;