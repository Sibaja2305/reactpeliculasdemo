import FormularioAutenticacion from "./FormularioAuteticacion";

export default function Registro(){
    return (
        <>
        <h3>Registro</h3>
        <FormularioAutenticacion url='/usuarios/registrar'/>
        </>
    )
}