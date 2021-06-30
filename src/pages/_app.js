import Head from 'next/head'
import { ChakraProvider } from "@chakra-ui/react"

import '../pages/global.css'

function App ({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="shortcut icon" href="/assets/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
