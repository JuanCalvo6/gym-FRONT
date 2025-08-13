import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../context/auth/authProvider.jsx"
import Header from '../components/Header.jsx'
import AdminLayout from "./admin/AdminLayout"
import ProfesorLayout from "./profesor/ProfesorLayout"
import LoginPage from "./LoginPage"
import ProtectedRoute from "../components/ProtectedRoute.jsx"
import ClientesPage from "./profesor/ClientesPage.jsx"
import InscripcionesPage from "./cliente/InscripcionesPage.jsx"
import AsistenciasPage from "./cliente/AsistenciasPage.jsx"
import RutinasPage from "./cliente/RutinasPage.jsx"
import LineasDeRutina from "./cliente/LineasDeRutina.jsx"
import ProfesoresPage from "./admin/ProfesoresPage.jsx"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path ='/' element ={ <LoginPage />} />

          <Route path ='/admin' element ={
            <ProtectedRoute rol={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
            }>
            <Route path="profesores" element={<ProfesoresPage/>} />
            <Route path="pases" element={<h1>Administrar pases</h1>}/>
            <Route path="ejercicios" element ={<h1>Administrar ejercicios</h1>} />
          </Route>
          
          <Route path ='/profesor' element ={
            <ProtectedRoute rol={["prof"]}>
              <ProfesorLayout />
            </ProtectedRoute>
            }>
            <Route index element={ <ClientesPage /> } />
            <Route path="clientes/:id/inscripciones" element ={<InscripcionesPage />} />
            <Route path="clientes/:id/asistencias" element={<AsistenciasPage />}/>
            <Route path="clientes/:id/rutinas" element={<RutinasPage />} />
            <Route path="clientes/:id/rutinas/:idRutina/lineasDeRutina" element={<LineasDeRutina />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
