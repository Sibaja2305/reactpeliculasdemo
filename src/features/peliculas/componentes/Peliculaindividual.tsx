import { NavLink, useNavigate } from "react-router";
import Boton from "../../../components/boton";
import type Pelicula from "../modelos/pelicula.model";
import styles from "./Peliculaindividual.module.css";
import confirmar from "../../../utilidades/Confirmar";
import clienteAPI from "../../../api/clienteAxios";
import { useContext } from "react";
import AlertaContext from "../../../utilidades/AlertContext";
import Autorizado from "../../Seguridad/componentes/Autorizado";
export default function PeliculaIndividual(props: PeliculaIndividualProps) {
  const { pelicula } = props;
  const contruirLink = () => `/peliculas/${props.pelicula.id}`;
  const navigate = useNavigate();
  const alerta = useContext(AlertaContext);
  const borrar = async (id: number) => {
    try {
      await clienteAPI.delete(`/peliculas/${id}`);
      alerta();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.div}>
      <NavLink to={contruirLink()}>
        <img alt="Poster" src={pelicula.poster}></img>
      </NavLink>
      <p>
        <NavLink to={contruirLink()}>{pelicula.titulo}</NavLink>
      </p>
      <Autorizado
        claims={["esaadmin"]}
        autorizado={
          <>
            <div>
              <Boton
                onClick={() => navigate(`pelicula/editar/${props.pelicula.id}`)}
              >
                Editar
              </Boton>
              <Boton
                classname="btn btn-danger ms-4"
                onClick={() => confirmar(() => borrar(props.pelicula.id))}
              >
                Borrar
              </Boton>
            </div>
          </>
        }
      />
    </div>
  );
}

interface PeliculaIndividualProps {
  pelicula: Pelicula;
}
