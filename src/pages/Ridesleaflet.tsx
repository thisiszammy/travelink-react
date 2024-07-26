// src/components/pages/addTripForm/leafletmap/LeafletMap.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Override the default marker icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LeafletMapProps {
  onSelectLocation: (lat: number, lng: number, address: string) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onSelectLocation }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name;
            onSelectLocation(e.latlng.lat, e.latlng.lng, address);
          });
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You selected this location</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={[10.3157, 123.8854]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LeafletMap;
