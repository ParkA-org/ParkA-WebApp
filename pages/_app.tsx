import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apolloClient"
import type { AppProps } from "next/app"
import { UserProvider } from "context/UserContext"
import "@reach/combobox/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}
