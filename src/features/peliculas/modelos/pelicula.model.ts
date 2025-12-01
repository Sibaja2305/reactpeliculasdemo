
import type Cine from "../../cines/modelo/Cine.model";
import type Genero from "../../generos/modelos/Genero.model";
import type ActorPelicula from "./ActorPelicula";

export default interface Pelicula {
    id: number;
    titulo: string;
    fechaLanzamiento: string;
    trailer: string; 
    poster: string;
    generos?: Genero[];
    cines?: Cine[];
    actores?: ActorPelicula[];
    votoUsuario:number;
    promedioVoto: number;
}