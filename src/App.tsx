import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// cliente para efetuar o data fetching
const queryClient = new QueryClient();

function App() {
  return (
    // componente que disponibiliza o React Query para seus componentes-filhos
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
