import { Route, Routes } from "react-router-dom"
import Home from "../paginas/Home"
import PaginaBase from "../paginas/PaginaBase"
import MinhaConta from "../paginas/MinhaConta"
import Pedidos from "../paginas/Pedidos"
import Categoria from "../paginas/Categoria"
import DetalheLivro from "../paginas/DetalheLivro"
import Carrinho from "../paginas/Carrinho"


const Rotas = () => {
    return (<Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/' element={<Home />} />
        <Route path='minha-sacola' element={<Carrinho />} />
        <Route path='minha-conta' element={<MinhaConta />}>
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
        <Route path='categorias/:slug' element={<Categoria />} />
        <Route path='livro/:slug' element={<DetalheLivro />} />
      </Route>
    </Routes>)
}

export default Rotas