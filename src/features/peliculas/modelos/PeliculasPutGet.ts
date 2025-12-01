
import type Cine from "../../cines/modelo/Cine.model";
import type Genero from "../../generos/modelos/Genero.model";
import type ActorPelicula from "./ActorPelicula";
import type Pelicula from "./pelicula.model";

export default interface PeliculasPutGet {
  pelicula: Pelicula;
  generosSeleccionados: Genero[];
  generosNoSeleccionados: Genero[];
  cineSeleccionados: Cine[];
  cineNoSeleccionados: Cine[];
  actores: ActorPelicula[];
}