import { type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../modelos/PeliculaCreacion.model";
import FormularioPelicula from "./FormularioPelicula";
import type Genero from "../../generos/modelos/Genero.model";
import type Cine from "../../cines/modelo/Cine.model";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type  PeliculasPostGet from "../modelos/PeliculasPostGet";
import Cargando from "../../../components/Cargando";
import convertirPeliculaCreacion from "../utilidades/convertirPeliculaCreacionAFormData";
import { useNavigate } from "react-router";
import { extraerErrores } from "../../../utilidades/extraerErrores";
import type { AxiosError } from "axios";

export default function CrearPelicula() {
  const navigate = useNavigate();
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<Cine[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState<string[]>([]);
  useEffect(()=>{
    clienteAPI.get<PeliculasPostGet>('/peliculas/postget').then(res => {
        setGenerosNoSeleccionados(res.data.generos);
        setCinesNoSeleccionados(res.data.cines);
        setCargando(false);
    });
  }, []);
  const onSubmit: SubmitHandler<PeliculaCreacion> = async (data) => {
    try{
      const formData = convertirPeliculaCreacion(data);
      const respuesta = await clienteAPI.postForm<PeliculaCreacion>('/peliculas', formData);
      navigate(`/peliculas/${respuesta.data.id}`);
    }catch(err){ 
      const errores = extraerErrores(err as AxiosError);
      setErrores(errores);
    }
  };

  
  return (
    <>
      <h3>Crear Pelicula </h3>
      {cargando ? <Cargando /> :<FormularioPelicula
      errores={errores}
        onSubmit={onSubmit}
        generosNoSeleccionados={generosNoSeleccionados}
        generosSeleccionados={[]}
        cinesNoSeleccionados={cinesNoSeleccionados}
        cinesSeleccionados={[]}
        actoresSeleccionados={[]}
      />}
      
    </>
  );
}
