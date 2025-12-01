import { useForm, type SubmitHandler } from "react-hook-form"
import type CredencialesUsuario from "../modelos/CredencialesUsuario"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import MostrarErrores from "../../../components/MostrarErrores";
import { useContext, useState } from "react";
import extraerErrores from "../utilidades/extraerErrores";
import type { AxiosError } from "axios";
import clienteAPI from "../../../api/clienteAxios";
import type RespuestaAutenticacion from "../modelos/RespuestaAutenticacion";
import { guardatTokenLocalStorage, obtenerClaims } from "../utilidades/ManejadorJWT";
import AutenticacionContext from "../utilidades/AutentificacionContext";
import { NavLink, useNavigate } from "react-router";
import Boton from "../../../components/boton";

export default function FormularioAutenticacion(props: FormularioAutenticacionProps){
    const [errores, setErrores] = useState<string[]>([]);
    const {actualizar} = useContext(AutenticacionContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting}
    } = useForm<CredencialesUsuario>({
        resolver: yupResolver(reglasDeValidacion),
        mode: 'onChange'
    })
    
    const onSubmit: SubmitHandler<CredencialesUsuario> = async (data) =>{
        try{
            const respuesta = await clienteAPI.post<RespuestaAutenticacion>(props.url, data);
            guardatTokenLocalStorage(respuesta.data);
            actualizar(obtenerClaims());
            navigate("/");
        }catch(err){
            const errores = extraerErrores(err as AxiosError)
            setErrores(errores);
        }
    }
    return (
        <>
        <MostrarErrores errores={errores}/>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" autoComplete="off" className="form-control" {...register('email')}/>
                {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">password</label>
                <input id="password" type="password" autoComplete="off" className="form-control" {...register('password')}/>
                {errors.password && <p className="password">{errors.password.message}</p>}
            </div>
            <div className="mt-2">
                <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Enviando ...' : 'Enviar'}</Boton>
                <NavLink to="/" className= "btn btn-secondary ms-2">Cancelar</NavLink>
            </div>
        </form>
        
        </>
    )
}
interface FormularioAutenticacionProps{
    url: string
}
const reglasDeValidacion = yup.object({
    email: yup.string().required('el email es obligatorio'),
    password: yup.string().required('El password es obligatorio')
})