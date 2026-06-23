import { Routes } from "./Routes"
import { AuthProvider } from "./contexts/AuthContext"

export function App(){
  return(
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}