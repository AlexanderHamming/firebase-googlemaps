import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

interface GoogleMappProps {
  selectedAddress: string;
  coordinates: { lat: number; lng: number } | null;
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
}

const GoogleMapp: React.FC<GoogleMappProps> = ({ coordinates, zoom, userLocation, selectedAddress }) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  if (!coordinates) {
    return <p>No valid coordinates found!</p>;
  }

  const directionsLink = userLocation ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${coordinates.lat},${coordinates.lng}` : `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapID = import.meta.env.VITE_GOOGLE_MAP_ID;

  if (!apiKey) {
    console.log("No API key");
    return null;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map mapId={mapID} center={coordinates} zoom={zoom} style={{ width: "100%", height: "70vh" }}>
        <AdvancedMarker position={coordinates} onClick={handleMarkerClick} />
        {isInfoWindowOpen && (
          // adress och kordinator sålänge
          <InfoWindow position={coordinates} onCloseClick={handleMarkerClick}>
            <div>
              <h2>{selectedAddress}</h2>
              <p>Lat: {coordinates.lat}</p>
              <p>Lng: {coordinates.lng}</p>
              {userLocation && (
                <a href={directionsLink} target="_blank" rel="noopener noreferrer">
                  See directions
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapp;
