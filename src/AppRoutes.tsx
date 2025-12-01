import { Routes, Route } from "react-router";
import IndiceGenero from "./features/generos/componentes/IndiceGenero";
import LandigPage from "./features/home/componentes/LandigPage";
import CrearGenero from "./features/generos/componentes/CrearGeneros";
import EditarGenero from "./features/generos/componentes/EditarGenero";
import IndiceActores from "./features/actores/componentes/IndiceActores";
import CrearActor from "./features/actores/componentes/CrearActor";
import EditarActor from "./features/actores/componentes/EditarActor";
import CrearPelicula from "./features/peliculas/componentes/CrearPelicula";
import EditarPelicula from "./features/peliculas/componentes/EditarPelicula";
import IndiceCines from "./features/cines/componentes/IndiceCine";
import CrearCine from "./features/cines/componentes/CrearCine";
import EditarCine from "./features/cines/componentes/EditarCine";
import RutaNoEncontrada from "./components/RutaNoEncontrada";
import FiltrarPeliculas from "./features/peliculas/componentes/FiltrarPeliculas";
import DetallePelicula from "./features/peliculas/componentes/DetallePelicula";
import RutaProtegida from "./features/Seguridad/componentes/RutaProtegida";
import Registro from "./features/Seguridad/componentes/Registro";
import Login from "./features/Seguridad/componentes/Login";
import IndiceUsuario from "./features/Seguridad/componentes/IndiceUsuario";

export default function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandigPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
     
        <Route element={<RutaProtegida claims={["esadmin"]} />}>
          <Route path="/generos" element={<IndiceGenero />} />
          <Route path="/generos/crear" element={<CrearGenero />} />
          <Route path="/generos/editar/:id" element={<EditarGenero />} />

          <Route path="/actores" element={<IndiceActores />} />
          <Route path="/actores/crear" element={<CrearActor />} />
          <Route path="/actores/editar/:id" element={<EditarActor />} />

          <Route path="/cines" element={<IndiceCines />} />
          <Route path="/cines/crear" element={<CrearCine />} />
          <Route path="/cines/editar/:id" element={<EditarCine />} />

          <Route path="/pelicula/crear" element={<CrearPelicula />} />
          <Route path="/pelicula/editar/:id" element={<EditarPelicula />} />
             <Route path="/usuarios" element={<IndiceUsuario />} />
        </Route>

        <Route path="/pelicula/filtrar" element={<FiltrarPeliculas />} />
        <Route path="/peliculas/:id" element={<DetallePelicula />} />

        <Route path="*" element={<RutaNoEncontrada />} />
      </Routes>
    </>
  );
}
