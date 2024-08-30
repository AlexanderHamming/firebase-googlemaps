import { Marker, InfoWindow } from "@react-google-maps/api";
import markerIcon from "../assets/imgs/marker.png";
import userPlaceholerIcon from "../assets/imgs/userPlacerholder.png"

interface MapMarkerProps {
  coordinates: { lat: number; lng: number };
  selectedAddress: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ coordinates, selectedAddress }) => {
    console.log(userPlaceholerIcon); 
  return (
    <Marker
      position={coordinates}
      icon={{
        url: userPlaceholerIcon, 
      }}
          
      
    >
      <InfoWindow position={coordinates}>
        <div>
          <h2>{selectedAddress}</h2>
          <p>Lat: {coordinates.lat}</p>
          <p>Lng: {coordinates.lng}</p>
        </div>
      </InfoWindow>
    </Marker>
  );
};

export default MapMarker;
