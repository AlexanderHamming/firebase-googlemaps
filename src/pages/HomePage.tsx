import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import GoogleMapp from "../components/GoogleMap";
import useGeocode from "../hooks/googleMapsHooks/useGeocode";
import { useBrowserGeolocation } from "../hooks/googleMapsHooks/useBrowserGeoLocation";

const HomePage = () => {
  const [selectedAddress, setSelectedAddress] = useState("Malmö");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [zoom, setZoom] = useState<number>(11);

  const { data: geocodeData } = useGeocode(selectedAddress);
  const { location, error: geolocationError } = useBrowserGeolocation();

  useEffect(() => {
    if (geocodeData && geocodeData.results && geocodeData.results[0]) {
      const location = geocodeData.results[0].geometry.location;
      setCoordinates({ lat: location.lat, lng: location.lng });

      const locationType = geocodeData.results[0].geometry.location_type;
      if (locationType === "ROOFTOP") {
        setZoom(15);
      } else {
        setZoom(11);
      }
    }
  }, [geocodeData]);

  const handleLocateUser = () => {
    if (location) {
      setCoordinates(location);
      setSelectedAddress("Your location");
      setZoom(15);
    } else if (geolocationError) {
      console.error("Error fetching user location:", geolocationError);
    }
  };
  return (
    
      <Container id="searchMapContainer">
        <SearchBar onSearch={setSelectedAddress} onLocateUser={handleLocateUser} />
        {/* <Image src="https://placehold.co/400" /> */}
        <GoogleMapp selectedAddress={selectedAddress} coordinates={coordinates} zoom={zoom} />
        //Add component for rendering lists
      </Container>
    
  );
};

export default HomePage;
