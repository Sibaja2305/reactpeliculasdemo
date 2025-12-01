
import { useEntidades } from "../../../hooks/useEntididades";
import type Genero from "../modelos/Genero.model";
import IndiceEntidades from "../../../components/IndiceEntidades";

export default function IndiceGenero() {
 
  const entidadesHook = useEntidades<Genero>("/generos");

  
  return (
    <>
      <IndiceEntidades<Genero>
        titulo="Generos" nombreEntidad="Genero" url="/generos" urlCrear="/generos/crear"
        {...entidadesHook}
      >
        {(generos, botones) => <>
        <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col" className="text-end">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {generos?.map((genero) => (
                  <tr key={genero.id}>
                    <td>{genero.nombre}</td>
                    <td className="text-end">
                     {botones(`/generos/editar/${genero.id}`, genero.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
        </>}
      </IndiceEntidades>
    </>
  );
}
