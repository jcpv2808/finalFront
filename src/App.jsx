import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './main/login'
import CrearCuenta from './main/CrearCuenta'
import MantPlatillos from './pages/platillos/MantPlatillos'
import PaginaProtegida from './common/paginaProtegida'
import TopNav from './common/TopNav'
import SideNav from './common/SideNav'
import EditarPlatillo from './pages/platillos/EditarPlatillo'
import CrearPlatillo from './pages/platillos/CrearPlatillo'
import MantClientes from './pages/clientes/MantClientes'
import MantOrdenes from './pages/ordenes/MantOrdenes'
import MantCategorias from './pages/categorias/MantCategorias'
import MantMeseros from './pages/meseros/MantMeseros'
import CrearCategoria from './pages/categorias/CrearCategoria'
import EditarCategoria from './pages/categorias/editarCategoria'
import CrearCliente from './pages/clientes/CrearCliente'
import EditarCliente from './pages/clientes/EditarCliente'
import CrearMesero from './pages/meseros/CrearMesero'
import EditarMesero from './pages/meseros/EditarMesero'
import CrearOrden from './pages/ordenes/CrearOrden'
import EditarOrden from './pages/ordenes/EditarOrden'
import Chat from './main/Chat.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/crearCuenta' element={<CrearCuenta />}></Route>
        {/* Platillos */}
        <Route path='/mantPlatillos' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <MantPlatillos />
            <Chat></Chat>

          </PaginaProtegida>
        }></Route>
        <Route path='/crearPlatillo' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearPlatillo />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarPlatillo/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarPlatillo />
          </PaginaProtegida>
        }></Route>

        {/* clientes */}
        <Route path='/mantClientes' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <MantClientes />
            <Chat></Chat>

          </PaginaProtegida>
        }></Route>
        <Route path='/crearCliente' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearCliente />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarCliente/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarCliente />
          </PaginaProtegida>
        }></Route>

        {/* ordenes */}
        <Route path='/mantOrdenes' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <MantOrdenes />
            <Chat></Chat>

          </PaginaProtegida>
        }></Route>
        <Route path='/crearOrden' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearOrden />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarOrden/:idMesa' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarOrden />
          </PaginaProtegida>
        }></Route>

        {/* categorias */}
        <Route path='/mantCategorias' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <MantCategorias />
            <Chat></Chat>

          </PaginaProtegida>
        }></Route>
        <Route path='/crearCategoria' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearCategoria />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarCategoria/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarCategoria />
          </PaginaProtegida>
        }></Route>

        {/* meseros */}
        <Route path='/mantMeseros' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <MantMeseros />
            <Chat></Chat>

          </PaginaProtegida>
        }></Route>
        <Route path='/crearMesero' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearMesero/>
          </PaginaProtegida>
        }></Route>
        <Route path='/editarMesero/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarMesero/>
          </PaginaProtegida>
        }></Route>
        <Route path='/chat' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Chat/>
          </PaginaProtegida>
        }></Route>
      </Routes>
    </Router>
  )
}

export default App
