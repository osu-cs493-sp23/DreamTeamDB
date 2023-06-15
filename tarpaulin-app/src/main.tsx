import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import theme from './styling/theme.ts'
import { UserProvider } from './context/UserContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
