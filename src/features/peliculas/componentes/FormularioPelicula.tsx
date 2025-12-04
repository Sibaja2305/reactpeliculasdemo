import { useForm, type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimeraLetraMayuscula } from "../../../validaciones/Validaciones";
import SeleccionarImagen from "../../../components/SeleccionarImagen";
import Boton from "../../../components/boton";
import { NavLink } from "react-router";
import SelectorMultiple from "../../../components/SelectorMultiple/SelectorMultiple";
import type Genero from "../../generos/modelos/Genero.model";
import type SelectoMultipleModel from "../../../components/SelectorMultiple/SelectorMultiple.model";
import { useState } from "react";
import type Cine from "../../cines/modelo/Cine.model";
import TypeaheadActores from "./TypeaheadActores";
import type ActorPelicula from "../modelos/ActorPelicula";
import MostrarErrores from "../../../components/MostrarErrores";
export default function FormularioPelicula(props: FormularioPeliculaProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PeliculaCreacion>({
    resolver: yupResolver(reglasDeValidacion),
    mode: "onChange",
    defaultValues: props.modelo ?? { titulo: "" },
  });

  const imagenActualURL: string | undefined = props.modelo?.poster
    ? (props.modelo.poster as string)
    : undefined;

  const mapear = (
    arreglo: { id: number; nombre: string }[]
  ): SelectoMultipleModel[] => {
    return arreglo.map((valor) => {
      return { llave: valor.id, descripcion: valor.nombre };
    });
  };

  const [generosSeleccionados, setGenerosSeleccionados] = useState(
    mapear(props.generosSeleccionados)
  );
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(
    mapear(props.generosNoSeleccionados)
  );

  const [cinesSeleccionados, setCinesSeleccionados] = useState(
    mapear(props.cinesSeleccionados)
  );
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(
    mapear(props.cinesNoSeleccionados)
  );

  const [actoresSeleccionados, setActoresSeleccionados] = useState(props.actoresSeleccionados);

  const onSubmit: SubmitHandler<PeliculaCreacion> = (datos) => {
    datos.generosIds = generosSeleccionados.map((valor) => valor.llave);
    datos.cinesIds = cinesSeleccionados.map((valor) => valor.llave);
    datos.actores = actoresSeleccionados;
    props.onSubmit(datos);
  };
  return (
    <>
    <MostrarErrores errores={props.errores} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            id="titulo"
            autoComplete="off"
            className="form-control"
            {...register("titulo")}
          />
          {errors.titulo && <p className="error">{errors.titulo.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="FechaLanzamiento">Fecha de lanzamiento</label>
          <input
            type="date"
            id="FechaLanzamiento"
            autoComplete="off"
            className="form-control"
            {...register("fechaLanzamiento")}
          />
          {errors.fechaLanzamiento && (
            <p className="error">{errors.fechaLanzamiento?.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="trailer">Trailer(You Tube)</label>
          <input
            type="text"
            id="Trailer"
            autoComplete="off"
            className="form-control"
            {...register("trailer")}
          />
        </div>
        <SeleccionarImagen
          label="Poster"
          imagenUrl={imagenActualURL}
          imagenSeleccionada={(poster) => {
            setValue("poster", poster);
          }}
        />
        <div className="form-group">
          <label htmlFor="generos">Generos:</label>
          <SelectorMultiple
            seleccionados={generosSeleccionados}
            noSeleccionados={generosNoSeleccionados}
            onChange={(seleccionados, noSeleccionados) => {
              setGenerosSeleccionados(seleccionados);
              setGenerosNoSeleccionados(noSeleccionados);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Cines">Cines:</label>
          <SelectorMultiple
            seleccionados={cinesSeleccionados}
            noSeleccionados={cinesNoSeleccionados}
            onChange={(seleccionados, noSeleccionados) => {
              setCinesSeleccionados(seleccionados);
              setCinesNoSeleccionados(noSeleccionados);
            }}
          />
        </div>
            <div className="form-group">
                <TypeaheadActores actores={actoresSeleccionados}  onAdd={actores => {
                    setActoresSeleccionados(actores);
                }} onRemove={actor => {
                    const actores = actoresSeleccionados.filter(x => x !== actor);
                    setActoresSeleccionados(actores);
                }}
                onCambioPersonaje={(id, personaje)=>{
                    const indice = actoresSeleccionados.findIndex(x => x.id === id);
                    const actores = [...actoresSeleccionados];
                    actores[indice].personaje = personaje;
                    setActoresSeleccionados(actores);
                }}
                />
            </div>
        <div className="mt-2">
          <Boton type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Boton>
          <NavLink to="/" className="btn btn-secondary ms-2">
            Cancelar
          </NavLink>
        </div>
      </form>
    </>
  );
}

interface FormularioPeliculaProps {
  modelo?: PeliculaCreacion;
  onSubmit: SubmitHandler<PeliculaCreacion>;
  generosSeleccionados: Genero[];
  generosNoSeleccionados: Genero[];
  cinesSeleccionados: Cine[];
  cinesNoSeleccionados: Cine[];
  actoresSeleccionados: ActorPelicula[];
  errores:string[];
}
const reglasDeValidacion = yup.object({
  titulo: yup
    .string()
    .required("El titulo es obligatorio")
    .test(PrimeraLetraMayuscula()),
  fechaLanzamiento: yup
    .string()
    .required("La fecha de lanzamiento es obligatoria"),
}).noUnknown(false);
