import { BrowserRouter } from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext"
import { Router } from './Routes/router'


export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}