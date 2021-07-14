import Head from 'next/head'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from '@chakra-ui/react'

import '../pages/global.css'

const theme = extendTheme({
  colors: {
    text: {
      primary: "#475F7B",
    }
  },
})

function App ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
