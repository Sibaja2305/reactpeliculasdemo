import type ActorPelicula from "./ActorPelicula";

export default interface PeliculaCreacion {
    id?: number;
    titulo: string;
    fechaLanzamiento:string;
    trailer?: string;
    poster?: File | string;
    generosIds?: number[];
    cinesIds?: number[];
    actores?: ActorPelicula[];
}