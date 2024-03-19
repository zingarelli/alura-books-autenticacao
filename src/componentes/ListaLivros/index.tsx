import { useQuery } from "@tanstack/react-query";
import { ICategoria } from "../../interfaces/ICategoria";
import { obterProdutosDaCategoria } from "../../http";
import MiniCard from "../MiniCard";
import "./ListaLivros.css"
import Loader from "../Loader";

interface ListaLivrosProps {
    categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
    const { data: produtos, isLoading } = useQuery(
        ['buscaLivrosPorCategoria', categoria],
        () => obterProdutosDaCategoria(categoria)
    )

    if (isLoading) return <Loader />

    return <section className="livros">
        {produtos?.map(livro => <MiniCard livro={livro} key={livro.id} />)}
    </section>
}

export default ListaLivros;