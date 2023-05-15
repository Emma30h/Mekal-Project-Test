import { Routes, Route } from 'react-router-dom'
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Alert } from "./components/Alert";
import { ProtectedRoutes } from "./components/ProtectRoutes";
import { Login } from "./components/Login";
import { AuthProvider } from "./context/AuthContext";

import "./app.css"

function App() {
  return (
   
    <AuthProvider>
      <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoutes>
                <Home/>
              </ProtectedRoutes>
            }
          />
          <Route path='/register' element={<Register/>}/>
          <Route path='/alert' element={<Alert/>}/>
          <Route path='/login' element={<Login/>}/>
      </Routes>  
    </AuthProvider>

  )
}

export default App
 