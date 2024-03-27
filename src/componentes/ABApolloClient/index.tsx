import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { ReactElement } from "react"

type Props = {
    children: ReactElement;
}

const ABApolloClient = ({ children }: Props) => {
    const client = new ApolloClient({
        // endereço para o servidor GraphQL
        uri: 'http://localhost:9000/graphql', 
        // configuração necessária para informar onde o resultado
        // das queries será cacheado (armazenado). A classe InMemoryCache 
        // é a comumente utilizada
        cache: new InMemoryCache(), 
    })

    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}

export default ABApolloClient