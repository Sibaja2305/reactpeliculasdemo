import { useNavigate } from "react-router";
import clienteAPI from "../api/clienteAxios";
import type { ReactNode } from "react";
import Boton from "./boton";
import Cargando from "./Cargando";
import confirmar from "../utilidades/Confirmar";
import ListadoGenerico from "./ListadoGenerico";
import Paginacion from "./Paginacion";

export default function IndiceEntidades<T>(props: IndiceEntidadesProps<T>) {
  const navigate = useNavigate();
  const botones = (urlEditar: string, id: number) => (
    <>
      <Boton
        onClick={() => navigate(urlEditar)}
        classname="btn btn-sm btn-outline-primary me-2"
      >
        <i className="bi bi-pencil me-1"></i>Editar
      </Boton>
      <Boton
        onClick={() => confirmar(() => borrar(id))}
        classname="btn btn-sm btn-outline-danger"
      >
        <i className="bi bi-trash me-1"></i>Borrar
      </Boton>
    </>
  );
  const borrar = async (id: number) => {
    try {
      await clienteAPI.delete(`${props.url}/${id}`);
      if (props.pagina === 1) {
        props.cargarRegistro();
      } else {
        props.setPagina(1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>{props.titulo}</h1>
      {props.urlCrear ?  <div>
        <Boton onClick={() => navigate(props.urlCrear!)}>
          Crear {props.nombreEntidad}
        </Boton>
      </div> : undefined}
     
      {props.cargando ? (
        <Cargando />
      ) : (
        <div className="mt-4">
          <div className="mb-2">
            <Paginacion
              paginaActual={props.pagina}
              registrosPorPagina={props.recordsPorPagina}
              CantidadTotalRegistro={props.cantidadTotalRegistros}
              registroPorPaginaOpciones={[5, 10, 50]}
              onCambioPaginacion={(pagina, recordsPorPagina) => {
                props.setPagina(pagina);
                props.setRecordsPorPagina(recordsPorPagina);
              }}
            />
          </div>
          <ListadoGenerico listado={props.entidades}>
            <table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
                {props.children(props.entidades!, botones)}
            </table>
          </ListadoGenerico>
        </div>
      )}
    </>
  );
}
interface IndiceEntidadesProps<T> {
  url?: string;
  urlCrear?: string;
  titulo: string;
  nombreEntidad?: string;
  pagina: number;
  recordsPorPagina: number;
  cantidadTotalRegistros: number;
  setPagina: (pagina: number) => void;
  setRecordsPorPagina: (recordsPorPagina: number) => void;
  entidades?: T[];
  cargando: boolean;
  cargarRegistro: () => void;
  children(
    entidades: T[],
    botones: (urlEditar: string, id: number) => ReactNode
  ): ReactNode;
}
