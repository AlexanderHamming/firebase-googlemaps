import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MapMarker from "./MapMarker";

interface GoogleMappProps {
  selectedAddress: string;
  coordinates: { lat: number; lng: number } | null;
  zoom: number;
}

const GoogleMapp: React.FC<GoogleMappProps> = ({ selectedAddress, coordinates, zoom }) => {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.log("No API key");
    return null;
  }

  if (!coordinates) {
    return <p>No valid coordinates found!</p>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={zoom}>
        <MapMarker coordinates={coordinates} selectedAddress={selectedAddress} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapp;
