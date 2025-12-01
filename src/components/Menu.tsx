import { NavLink } from "react-router";
import Autorizado from "../features/Seguridad/componentes/Autorizado";
import { useContext } from "react";
import AutenticacionContext from "../features/Seguridad/utilidades/AutentificacionContext";
import Boton from "./boton";
import { logout } from "../features/Seguridad/utilidades/ManejadorJWT";

export default function Menu() {
  const {actualizar, claims} = useContext(AutenticacionContext);
 function obtenerNombreUsuario(): string {
  const claimEmail = claims.find(
    x => x.nombre === 'email' || x.nombre === 'unique_name' || x.nombre === 'sub'
  );
  return claimEmail?.valor ?? '';
}
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to={'/'} className="navbar-brand">React Peliculas</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={'/pelicula/filtrar'} className="nav-link">Filtrar Peliculas</NavLink>
            </li>
            <Autorizado 
            claims={['esadmin']}
            autorizado={<>
              <li className="nav-item">
              <NavLink to={'/generos'} className="nav-link">Generos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/actores'} className="nav-link">Actores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/cines'} className="nav-link">Cine</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/pelicula/crear'} className="nav-link">Crear Pelicula</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/usuarios'} className="nav-link">Usuarios</NavLink>
            </li>
            </>}
            />
          
          </ul>
          <div className="d-flex">
              <Autorizado autorizado=
              {<>
              <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
              <Boton
              classname="nav-link btn btn-link ms-2"
              onClick={() => {
                logout();
                actualizar([]);
              }}>Log Out</Boton>
              </>}
              noAutorizado={
                <>
                <NavLink to="/registro" className="nav-link btn btn-link">Registro</NavLink>
                <NavLink to="/login" className="nav-link btn btn-link ms-2">login</NavLink>
                </>
              }
              />
          </div>
        </div>
      </div>
    </nav>
  );
}
