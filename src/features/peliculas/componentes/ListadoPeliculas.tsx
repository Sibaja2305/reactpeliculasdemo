import type Pelicula from "../modelos/pelicula.model";
import PeliculaIndividual from "./Peliculaindividual";
import styles from "./ListadoPeliculas.module.css";
import ListadoGenerico from "../../../components/ListadoGenerico";
export default function ListadoPeliculas (props: ListadoPeliculasProps) {
   
        return  (
            <ListadoGenerico<Pelicula> listado={props.peliculas} listadoVacioUI='No hay peliculas para mostrar' >
        <div className={styles.div}>
            {props.peliculas?.map((pelicula) => (
                <PeliculaIndividual key={pelicula.id} pelicula={pelicula} />
            ))}
        </div>
        </ListadoGenerico>
    )
    
    
}

interface ListadoPeliculasProps {
    peliculas?: Pelicula[];
    };