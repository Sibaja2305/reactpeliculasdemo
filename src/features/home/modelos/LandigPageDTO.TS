import type Pelicula from "../../peliculas/modelos/pelicula.model";

export default interface LandingPage {
  enCines?: Pelicula[];
  proximosEstrenos?: Pelicula[];
}