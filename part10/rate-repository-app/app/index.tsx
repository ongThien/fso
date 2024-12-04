import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "@/app/src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

export default function Index() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}
