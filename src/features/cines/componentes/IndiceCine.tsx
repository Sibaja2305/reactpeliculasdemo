
import IndiceEntidades from "../../../components/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntididades";
import type Cine from "../modelo/Cine.model";

export default function IndiceCines() {
 
  const entidadesHook = useEntidades<Cine>("/cines");

  
  return (
    <>
      <IndiceEntidades<Cine>
        titulo="Cines" nombreEntidad="Cine" url="/cines" urlCrear="/cines/crear"
        {...entidadesHook}
      >
        {(cines, botones) => <>
        <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col" className="text-end">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {cines?.map((cine) => (
                  <tr key={cine.id}>
                    <td>{cine.nombre}</td>
                    <td className="text-end">
                     {botones(`/cines/editar/${cine.id}`, cine.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
        </>}
      </IndiceEntidades>
    </>
  );
}

