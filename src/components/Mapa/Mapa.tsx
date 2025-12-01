
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import type Coordenadas from "./Coordenadas.model";
import { useState } from "react";

export default function Mapa(props: MapaProps) {
    const [coordenadas, setCoordenadas] = useState<Coordenadas[] | undefined>(props.coordenadas);

    return (
        <MapContainer center={[8.654032268166977, -82.94030167663566] } zoom={14} style={{ height: "400px" }} 
        scrollWheelZoom={true} >
             <TileLayer attribution='React Peliculas'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             {props.editable ? <ClickMapa setPunto={coordenada => {
                setCoordenadas([coordenada])
                if (props.lugarSeleccionado) {
                    props.lugarSeleccionado(coordenada);
                }
             } } />: undefined}
            {coordenadas?.map(coordenada => <Marker key={coordenada.lat + coordenada.lng}
            position={[coordenada.lat, coordenada.lng]}>
                    {coordenada.mensaje ? <Popup>{coordenada.mensaje}</Popup>: undefined}

            </Marker>)}
        </MapContainer>
    );
}

interface MapaProps {
    lugarSeleccionado?: (coordenadas: Coordenadas) => void;
    coordenadas?: Coordenadas[];
    editable: boolean;
}
function ClickMapa(props:ClickMapaProps) {
    useMapEvent('click', e =>{
        props.setPunto({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            
        });
    })
    return null;
}

interface ClickMapaProps {
setPunto: (coordenadas: Coordenadas) => void;

}