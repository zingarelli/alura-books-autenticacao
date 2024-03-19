import { AbCampoTexto } from "ds-alurabooks"
import { useState } from "react"
import Banner from "../../componentes/Banner"
import LivrosDestaque from "../../componentes/LivrosDestaque"
import Newsletter from "../../componentes/Newsletter"
import TagsCategorias from "../../componentes/TagsCategorias"
import Titulo from "../../componentes/Titulo"

import './Home.css'
import { useQuery } from "@tanstack/react-query"
import { obterLancamentos, obterMaisVendidos } from "../../http"
import Loader from "../../componentes/Loader"

const Home = () => {
    const [busca, setBusca] = useState("")
    const { data: lancamentos, isLoading: carregandoLancamentos } = useQuery(
        ['lancamentos'],
        obterLancamentos
    )
    const { data: maisVendidos, isLoading: carregandoMaisVendidos } = useQuery(
        ['maisVendidos'],
        obterMaisVendidos
    )

    return (<section className="home">
        <Banner subtitulo="Encontre em nossa estante o que precisa para seu desenvolvimento!" titulo="Já sabe por onde começar?">
            <form className="buscar">
                <AbCampoTexto
                    placeholder="Qual será sua próxima leitura?"
                    value={busca}
                    onChange={setBusca}
                    darkmode={true}
                    placeholderAlign="center"
                />
            </form>
        </Banner>
        <Titulo texto="ÚLTIMOS LANÇAMENTOS" />
        {carregandoLancamentos
            ? <Loader />
            : <LivrosDestaque livros={lancamentos ?? []} />}
        <Titulo texto="MAIS VENDIDOS" />
        {carregandoMaisVendidos 
            ? <Loader />
            : <LivrosDestaque livros={maisVendidos ?? []} />}        
        <TagsCategorias />
        <Newsletter />
    </section>)
}

export default Home