import { useCallback, useEffect, useState } from "react";
import type Actor from "../modelos/Actor.model";
import clienteAPI from "../../../api/clienteAxios";

export function useActores(){
    const [actores, setActor] = useState<Actor[]>();
      const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
      const [pagina, setPagina] = useState(1);
      const [recordsPorPagina, setRecordsPorPagina] = useState(5);
      const [cargando, setCargando] = useState(true);
      const cargarRegistro = useCallback(() => {
         setCargando(true);
        clienteAPI
          .get<Actor[]>(`/actores`, {
            params: { pagina, recordsPorPagina },
          })
          .then((res) => {
            const cantidadTotalRegistros = parseInt(
              res.headers["cantidad-total-de-registros"]
            );
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setActor(res.data);
             setCargando(false);
          });
      }, [pagina, recordsPorPagina]);
      useEffect(() => {
       cargarRegistro();
      }, [cargarRegistro]);
      return {cargando, pagina, recordsPorPagina, cantidadTotalRegistros, setPagina, setRecordsPorPagina, actores: actores, cargarRegistro}
}