import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapp = () => {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.log("no api key")
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>

      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapp;