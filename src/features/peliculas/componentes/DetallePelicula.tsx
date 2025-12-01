import { useEffect, useState } from "react";
import { useParams } from "react-router";
import clienteAPI from "../../../api/clienteAxios";
import type Pelicula from "../modelos/pelicula.model";
import Cargando from "../../../components/Cargando";
import Mapa from "../../../components/Mapa/Mapa";
import type Coordenadas from "../../../components/Mapa/Coordenadas.model";
import Rating from "../../../components/Rating/Rating";
import type RatingCreacion from "../../../components/Rating/RatingCreacion.model";
import Swal from "sweetalert2";


export default function DetallePelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState<Pelicula>();
  useEffect(() => {
    clienteAPI
      .get<Pelicula>(`/peliculas/${id}`)
      .then((res) => setPelicula(res.data));
  }, [id]);
  if (!pelicula) {
    return <Cargando />;
  }
  const fecha = new Date(pelicula.fechaLanzamiento);
  const año = fecha.getFullYear();
  const fechaFormateada = fecha.toLocaleDateString();
  function obtenerUrlEnBebida(url: string): string | undefined {
    const objUrl = new URL(url);
    const videoId = objUrl.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
  }
  function transformarCoordenadas(): Coordenadas[] {
    return pelicula!.cines!.map(c => {
        const coordenadas: Coordenadas = {lat: c.latitud, lng: c.longitud, mensaje: c.nombre};
        return coordenadas;
    })
  }
  function manejarVoto(voto: number) {
    const data: RatingCreacion = {
      peliculaId: Number(id), 
      puntuacion: voto
    };

    clienteAPI.post('/rating', data)
      .then(() => Swal.fire({ icon: 'success', title: 'Voto recibido' }));
  }
  return (
    <>
      <div className="container my-4">
        <div className="mb-3">
          <h2>
            {pelicula.titulo} <small className="text-muted">({año})</small>
          </h2>
          {pelicula.generos && pelicula.generos.length > 0 && (
            <div className="mb-2">
              {pelicula.generos.map((genero) => (
                <span key={genero.id} className="badge bg-primary me-2">
                  {genero.nombre}
                </span>
              ))}
            </div>
          )}
          <p className="text-muted">Estreno: {fechaFormateada} 
            | Puntación promedio: {pelicula.promedioVoto} | Mi Rating <Rating maximoValor={5} 
            valorSeleccionado={pelicula.votoUsuario} onChange={(voto) => {manejarVoto(voto)}}/>


          </p>
        </div>
        <div className="d-flex">
          <span className="d-inline-block me-2">
            <img
              src={pelicula.poster}
              style={{ width: "225px", height: "315px" }}
            ></img>
          </span>
          <div>
            <iframe
              width="565"
              height="315"
              src={obtenerUrlEnBebida(pelicula.trailer)}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {pelicula.actores && pelicula.actores.length > 0 && (
          <div>
            <h4>Actores</h4>
            <div className="row">
              {pelicula.actores.map((actor) => (
                <div key={actor.id} className="col-md-4 d-flex mb-3">
                  <img
                    src={actor.foto}
                    className="rounded me-3"
                    alt={actor.nombre}
                    style={{ height: "100px", width: '80px' }}
                  />
                  <div className="card-body">
                    <strong>{actor.nombre}</strong>
                    <br />
                    <span className="text-muted">{actor.personaje}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {pelicula.cines && pelicula.cines.length > 0 && (
            <div className="w-100">
                <h2>Mostrandose en los siguientes cines</h2>
                <Mapa coordenadas={transformarCoordenadas()} editable={false} />
            </div>
        )}
      </div>
    </>
  );
}
