import { NavLink, Outlet } from "react-router-dom"
import './MinhaConta.css'

const MinhaConta = () => {
    return (<>
        <h1 className="minha-conta__titulo">Minha conta</h1>
        <div className="minha-conta__container">
        <aside className="minha-conta__menu">
            <ul>
                <li><NavLink to='/minha-conta/pedidos'>Pedidos</NavLink></li>
                <li><NavLink to='/minha-conta/trocas'>Trocas</NavLink></li>
                <li><NavLink to='/minha-conta/cupons'>Cupons</NavLink></li>
                <li><NavLink to='/minha-conta/dados'>Seus dados</NavLink></li>
            </ul>
        </aside>
        <Outlet />
        </div>
    </>)
}

export default MinhaConta