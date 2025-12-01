import type Genero from "../../generos/modelos/Genero.model";
import Boton from "../../../components/boton";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import clienteAPI from "../../../api/clienteAxios";

import ListadoPeliculas from "./ListadoPeliculas";
import type Pelicula from "../modelos/pelicula.model";
export default function FiltrarPeliculas() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>();

  useEffect(() =>{
    clienteAPI.get<Genero[]>(`/generos/todos`).then(res => setGeneros(res.data));
  },)

  async function buscarPeliculas(valores: FormType){
    try{
    const respuesta = await clienteAPI.get<Pelicula[]>('/peliculas/filtrar', {params: valores})
    setPeliculas( respuesta.data);
    }catch(err) {
        console.error(err);
    }
  
  }
    const valorInicial: FormType = {
        titulo: '',
        generoId: 0,
        proximosEstrenos: false,
        enCines: false
    };
    const {register, handleSubmit, reset, formState:{isSubmitting}} = useForm<FormType>({
        defaultValues: valorInicial
    });
  

 const onSubmit: SubmitHandler<FormType> = async (data) => {
 await buscarPeliculas(data);
};


  return (
    <>
      <h3>Filtro de peliculas</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row row-cols-lg-auto g-3 align-items-center">
        <div className="col-12">
          <input
            id="titulo"
            placeholder="Titulo de la pelicula"
            autoComplete="off"
            className="form-control"
            {...register("titulo")}
          />
        </div>
        <div className="col-12">
          <select className="form-select" id="generoId" {...register("generoId")}>
            <option value="0">--Seleccione un genero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>{genero.nombre}</option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="proximosEstrenos"
                {...register("proximosEstrenos")}
            ></input>
            <label htmlFor="proximosEstrenos">Proximos Estrenos</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="enCines"
                {...register("enCines")}
            ></input>
            <label htmlFor="enCines">En Cines</label>
          </div>
        </div>
        <div className="col-12">
          <Boton disabled={isSubmitting} type="submit">{isSubmitting ? 'Filtrando...' : 'Filtrar'}</Boton>
           <Boton onClick={()=> reset()} type="submit" classname="btn btn-danger ms-2" >Limpiar</Boton>
        </div>
      </form>
      <div className="mt-4">
            <ListadoPeliculas peliculas={peliculas} />
      </div>
    </>
  );
}

interface FormType {
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
}
