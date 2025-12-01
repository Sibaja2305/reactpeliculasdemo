import { BrowserRouter } from "react-router";
import "./App.css";

import Menu from "./components/Menu";
import AppRoute from "./AppRoutes";
import AutenticacionContext from "./features/Seguridad/utilidades/AutentificacionContext";
import { useEffect, useState } from "react";
import type Claim from "./features/Seguridad/modelos/Claim";
import { obtenerClaims } from "./features/Seguridad/utilidades/ManejadorJWT";

function App() {
  const [claims, setClaims] = useState<Claim[]>([]);
 useEffect(() =>{
  setClaims(obtenerClaims())
 }, [])
  function actualizar(claims: Claim[]){
    setClaims(claims);
  }
  return (
    <>
      <BrowserRouter>
      <AutenticacionContext.Provider value={{claims, actualizar}}>
        <Menu />
        <div className="container mb-4">
          <AppRoute />
        </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
