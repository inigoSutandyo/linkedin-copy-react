import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'
import './styles/sizing.scss'
import './styles/color.scss'
import './styles/spacing.scss'
import './styles/display.scss'
import './styles/flex.scss'
import { store } from './app/store' 
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode>,
)
