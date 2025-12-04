import { AsyncTypeahead } from "react-bootstrap-typeahead";
import type ActorPelicula from "../modelos/ActorPelicula";
import { useState } from "react";
import clienteAPI from "../../../api/clienteAxios";

export default function TypeaheadActores(props: TypeaheadActoresProps) {
  const [actores, setActores] = useState<ActorPelicula[]>([]);
  const [cargando, setCargando] = useState(false);

  function manejarBusqueda(query: string) {
    setCargando(true);

    clienteAPI
      .get<ActorPelicula[]>(`/actores/${query}`)
      .then((res) => {
        setActores(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }

  const [elementoArrastrado, setElementoArrastrado] = useState<
    ActorPelicula | undefined
  >(undefined);

  const manejarDragStar = (actor: ActorPelicula) => {
    setElementoArrastrado(actor);
  };

  const manejarDragOver = (actor: ActorPelicula) => {
    if (!elementoArrastrado) return;
    if (actor.id === elementoArrastrado.id) return;

    const copia = [...props.actores];

    const indiceDesde = copia.findIndex((x) => x.id === elementoArrastrado.id);
    const indiceHasta = copia.findIndex((x) => x.id === actor.id);

    if (indiceDesde !== -1 && indiceHasta !== -1) {
      [copia[indiceDesde], copia[indiceHasta]] = [
        copia[indiceHasta],
        copia[indiceDesde],
      ];

      props.onAdd(copia);
    }
  };

  return (
    <>
      <label>Actores</label>

      <AsyncTypeahead
        id="typeahead-actores"
        isLoading={cargando}
        minLength={2}
        flip
        onSearch={manejarBusqueda}
        options={actores}
        labelKey="nombre"
        filterBy={["nombre"]}
        placeholder="Escriba el nombre del actor..."
        selected={[]}
        onChange={(selected) => {
          const actor = selected[0] as ActorPelicula | undefined;

          if (!actor) return;

          const existe = props.actores.some((x) => x.id === actor.id);

          if (!existe) {
            actor.personaje = "";
            props.onAdd([...props.actores, actor]);
          }
        }}
        renderMenuItemChildren={(opcion) => {
          const actor = opcion as ActorPelicula;
          return (
            <>
              <img
                alt="imagen actor"
                src={actor.foto}
                style={{ height: "64px", marginRight: "10px", width: "64px" }}
              />
              <span>{actor.nombre}</span>
            </>
          );
        }}
      />

      {/* LISTA DE ACTORES SELECCIONADOS */}
      <ul className="list-group mt-3">
        {props.actores.map((actor) => (
          <li
            key={actor.id}
            draggable
            onDragStart={() => manejarDragStar(actor)}
            onDragOver={() => manejarDragOver(actor)}
            className="list-group-item d-flex align-items-center"
          >
            {/* FOTO */}
            <div style={{ width: "70px" }}>
              <img style={{ height: "60px" }} src={actor.foto} alt="foto" />
            </div>

            {/* NOMBRE */}
            <div style={{ width: "150px", marginLeft: "1rem" }}>
              {actor.nombre}
            </div>

            {/* PERSONAJE */}
            <div className="flex-grow-1 mx-3">
              <input
                type="text"
                className="form-control"
                placeholder="Personaje"
                value={actor.personaje}
                onChange={(e) =>
                  props.onCambioPersonaje(actor.id, e.currentTarget.value)
                }
              />
            </div>

            {/* ELIMINAR */}
            <span
              role="button"
              className="badge text-bg-secondary"
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface TypeaheadActoresProps {
  actores: ActorPelicula[];
  onAdd(actores: ActorPelicula[]): void;
  onCambioPersonaje(id: number, personaje: string): void;
  onRemove(actor: ActorPelicula): void;
}
