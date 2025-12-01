import Swal from "sweetalert2";
import clienteAPI from "../../../api/clienteAxios";
import Boton from "../../../components/boton";
import IndiceEntidades from "../../../components/IndiceEntidades";
import { useEntidades } from "../../../hooks/useEntididades";
import confirmar from "../../../utilidades/Confirmar";
import type EditarClaim from "../modelos/EditarClaim.model";
import type Usuarios from "../modelos/Usuario.model";

export default function IndiceUsuario(){
    const usuarioHook = useEntidades<Usuarios>('/usuarios/listadoUsuarios');
    async function hacerAdmin(email: string) {
        await editarAdmin('usuarios/hacerAdmin', email);
    }
    async function RemoveAdmin(email: string) {
        await editarAdmin('usuarios/removerAdmin', email);
    }
    async function editarAdmin(url: string, email: string) {
        const editarClaim: EditarClaim = {
            email
        };
        await clienteAPI.post(url, editarClaim);
        Swal.fire({title:'exitoso', text: 'Operacion realizada', icon: 'success'});
    }
    return (
        <IndiceEntidades<Usuarios> titulo="Usuarios" {...usuarioHook}>
                {(usuarios) =>
                <>
                <thead className="table-light">
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios?.map(usuario => <tr key={usuario.email}>
                        <td>{usuario.email}</td>
                        <td className="text-en">
                            <Boton onClick={() => confirmar(() => hacerAdmin(usuario.email), `¿Desea hacer admin a ${usuario.email}`, 'Si') }>Hacer admin</Boton>
                             <Boton classname="btn btn-danger ms-1 " onClick={() => confirmar(() => RemoveAdmin(usuario.email), `¿Desea quitar admin a ${usuario.email}`, 'Si') }>Remover admin</Boton>
                            </td>                
                    </tr>)}
                </tbody>
                </>}
        </IndiceEntidades>

    )
}