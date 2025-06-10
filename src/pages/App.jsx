import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../context/auth/authProvides"
import Header from '../components/Header.jsx'
import AdminLayout from "./admin/AdminLayout"
import ProfesorLayout from "./profesor/ProfesorLayout"
import LoginPage from "./LoginPage"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path ='/' element ={ <LoginPage />} />

          <Route path ='/admin' element ={<AdminLayout />}>
            <Route path="ejercicios" element ={<h1>Administrar ejercicios</h1>} />
            <Route path="pases" element={<h1>Administrar pases</h1>}/>
            <Route path="profesores" element={<h1>Administrar profesores</h1>} />
          </Route>
          
          <Route path ='/profesor' element ={<ProfesorLayout />}>
            <Route index element={<h1> Pagina de clientes</h1>} />
            <Route path="clientes/:id/inscripciones" element ={<h1>Incripciones de cliente</h1>} />
            <Route path="clientes/:id/asistencias" element={<h1>Asistencias de Cliente</h1>}/>
            <Route path="clientes/:id/rutinas" element={<h1>Rutinas de cliente</h1>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
