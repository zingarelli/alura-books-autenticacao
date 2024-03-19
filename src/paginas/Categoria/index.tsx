import TituloPrincipal from "../../componentes/TituloPrincipal"
import { useParams } from "react-router-dom";
import { obterCategoriaPorSlug } from "../../http";
import Loader from "../../componentes/Loader";
import { useQuery } from "@tanstack/react-query";
import ListaLivros from "../../componentes/ListaLivros";

const Categoria = () => {
    const { slug } = useParams();

    // data fetching com React Query
    // no destructuring, estou pegando a propriedade "data" e renomeando ela para "categoria"
    const { data: categoria, isLoading } = useQuery(
        // queryKey é um array com um nome único para essa query; o segundo elemento 
        // pode ser usado para passar uma variável que seja dependente da query (que 
        // nem no useEffect), assim a função é executada novamente caso essa variável mude
        ['categoriaPorSlug', slug],
        // função que retorna uma promise com os dados ou um erro
        () => obterCategoriaPorSlug(slug || '')
    )

    if (isLoading) return <Loader />

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''} />
            {/* tenho ctz de que categoria não estará undefined após o isLoading se tornar falso */}
            <ListaLivros categoria={categoria!} />
        </section>
    )
}

export default Categoria