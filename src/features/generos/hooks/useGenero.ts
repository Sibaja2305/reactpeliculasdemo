import { useState, useEffect, useCallback } from "react";
import clienteAPI from "../../../api/clienteAxios";
import type Genero from "../modelos/Genero.model";

export function useGenero(){
    const [generos, setGeneros] = useState<Genero[]>();
      const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState(0);
      const [pagina, setPagina] = useState(1);
      const [recordsPorPagina, setRecordsPorPagina] = useState(5);
      const [cargando, setCargando] = useState(true);
      const cargarRegistro = useCallback(() => {
         setCargando(true);
        clienteAPI
          .get(`/generos`, {
            params: { pagina, recordsPorPagina },
          })
          .then((res) => {
            const cantidadTotalRegistros = parseInt(
              res.headers["cantidad-total-de-registros"]
            );
            setCantidadTotalRegistros(cantidadTotalRegistros);
            setGeneros(res.data);
             setCargando(false);
          });
      }, [pagina, recordsPorPagina]);
      useEffect(() => {
       cargarRegistro();
      }, [cargarRegistro]);
      return {cargando, pagina, recordsPorPagina, cantidadTotalRegistros, setPagina, setRecordsPorPagina, generos, cargarRegistro}
}