import React from 'react'
import { Link } from 'react-router-dom'

function SideNav() {
  return (
    <aside className="navigation">
        <nav>
          <ul className="nav luna-nav">
            <li className="nav-category">
              Main
            </li>
            <li>
              <a href="#monitoring" data-toggle="collapse" aria-expanded="false">
                Mantenimientos<span className="sub-nav-icon"> <i className="stroke-arrow"></i> </span>
              </a>
              <ul id="monitoring" className="nav nav-second collapse">
                <li><Link to="/mantPlatillos"> Platillos</Link></li>
                <li><Link to="/mantClientes"> Clientes</Link></li>
                <li><Link to="/mantOrdenes"> Ordenes</Link></li>
                <li><Link to="/mantCategorias"> Categorias</Link></li>
                <li><Link to="/mantMeseros"> Meseros</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
  )
}

export default SideNav