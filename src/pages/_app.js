import Head from 'next/head'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from '../store'

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
