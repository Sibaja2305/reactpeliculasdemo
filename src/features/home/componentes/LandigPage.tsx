import { useEffect, useState } from "react";
import ListadoPeliculas from "../../peliculas/componentes/ListadoPeliculas";
import type LandingPageDTO from "../modelos/LandigPage.ts";
import clienteAPI from "../../../api/clienteAxios";
import AlertaContext from "../../../utilidades/AlertContext";

export default function LandigPage() {
  const [peliculas, setPeliculas] = useState<LandingPageDTO>({});

  useEffect(() => {
    cargarDatos();
  }, []);
  function cargarDatos() {
    clienteAPI
      .get<LandingPageDTO>("/peliculas/landing")
      .then((res) => setPeliculas(res.data));
  }

  return (
    <>
      <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>En cines</h3>
        <ListadoPeliculas peliculas={peliculas.enCines} />
        <h3>Proximamente</h3>
        <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
      </AlertaContext.Provider>
    </>
  );
}
