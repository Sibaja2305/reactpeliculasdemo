import { useState, type ChangeEvent } from "react";
import styles from "./SeleccionarImagen.module.css";
export default function SeleccionarImagen(props: SeleccionarImagenProps){
    const [imagenBase64, setImagenBase64] = useState("");
    const [imagenUrl, setImagenUrl] = useState(props.imagenUrl ? props.imagenUrl : "");

    const  manejarOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const archivo = e.currentTarget.files[0];
            aBase64(archivo).then(valor => setImagenBase64(valor)).catch(error => console.error("Error al convertir a base64:", error));
            props.imagenSeleccionada(archivo);
            setImagenUrl("");
        }
    }

    const aBase64 = (archivo: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
    return (
        <div className="form-group">
            <label htmlFor="imagen">{props.label}</label>
            <div>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="imagen"
                    onChange={manejarOnChange}
                />
            </div>
            {imagenBase64 ? <div>
                <div className={styles.div}>
                    <img src={imagenBase64} alt="Imagen seleccionada" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                </div>
            </div>: undefined}
            {imagenUrl ? <div>
                <div className={styles.div}>
                    <img src={imagenUrl} alt="Imagen actor" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                </div>
            </div>: undefined}
            
        </div>
    )
}

interface SeleccionarImagenProps {
 label: string;
 imagenUrl?: string;
 imagenSeleccionada: (file: File) => void;
}
