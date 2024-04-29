import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ABApolloClient from './componentes/ABApolloClient';
import CarrinhoProvider from './context/carrinho';

// cliente para efetuar o data fetching
const queryClient = new QueryClient();

function App() {
  return (
    //  componente que disponibiliza o Apollo Client para seus componentes-filhos
    <ABApolloClient>
      {/* provedor do context de carrinho */}
      <CarrinhoProvider>
        {/* componente que disponibiliza o React Query para seus componentes-filhos */}
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CarrinhoProvider>
    </ABApolloClient>
  );
}

export default App;
