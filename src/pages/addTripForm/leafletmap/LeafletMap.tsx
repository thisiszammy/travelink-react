import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LeafletMouseEvent, latLng, map } from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReactDOMServer from 'react-dom/server';
import './leafletmap.css'

interface LatLng {
  lat: number;
  lng: number;
}

interface LeafletMapProps {
    setLatLng: (latLng: LatLng) => void;
  }

interface LocationMarkerProps {
  setLatLng: (latLng: LatLng) => void;
}

const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<LocationOnIcon className='custom-icon '/>),
    className: 'leaflet-div-icon custom-icon-container',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });

  const LocationMarker: React.FC<LocationMarkerProps> = ({ setLatLng }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
  
    useMapEvents({
      click(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        setPosition(event.latlng);
        setLatLng({ lat, lng });
      },
    });
    //@ts-ignore
    return position === null ? null : <Marker position={position} icon={customIcon}></Marker>;
  };

const LeafletMap: React.FC<LeafletMapProps> = ({setLatLng}) => {
    const [position, setPosition] = useState<LatLng | null>(null);

  return (
    <div className='w-full h-full'>
        <MapContainer
              //@ts-ignore
              center={[10.317802696580461, 123.89195662399294]}
              zoom={13}
              >
                <TileLayer
                //@ts-ignore
                  attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <LocationMarker setLatLng={setLatLng}/>
        </MapContainer>
    </div>
  )
}

export default LeafletMap
