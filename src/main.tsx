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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
