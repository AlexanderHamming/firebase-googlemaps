import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import GoogleMapp from "../components/GoogleMap";
import useGeocode from "../hooks/googleMapsHooks/useGeocode";
import { useBrowserGeolocation } from "../hooks/googleMapsHooks/useBrowserGeoLocation";
import RestaurantList from '../components/RestaurantList';
import { CollectionReference, collection } from 'firebase/firestore';
import { firedb } from "../service/firebase";
import { Restaurant } from "../types/User.types";
import useGetCollection from "../hooks/useGetCollection";

const HomePage = () => {
  const [selectedAddress, setSelectedAddress] = useState("Malmö");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [zoom, setZoom] = useState<number>(11);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { data: geocodeData } = useGeocode(selectedAddress);
  const { location, error: geolocationError } = useBrowserGeolocation();

  const colRef = collection(firedb, "restaurants") as CollectionReference<Restaurant>;
  const { data: restaurants, loading, error } = useGetCollection(colRef);

  useEffect(() => {
    if (location) {
      setUserLocation(location);
    } else if (geolocationError) {
      console.error("Error fetching user location:", geolocationError);
    }
  }, [location, geolocationError]);

  useEffect(() => {
    if (geocodeData && geocodeData.results && geocodeData.results[0]) {
      const location = geocodeData.results[0].geometry.location;
      setCoordinates({ lat: location.lat, lng: location.lng });

      const locationType = geocodeData.results[0].geometry.location_type;
      if (locationType === "ROOFTOP") {
        setZoom(15);
      } else {
        setZoom(12.5);
      }
    }
  }, [geocodeData]);

  const handleLocateUser = () => {
    if (location) {
      setCoordinates(location);
      setSelectedAddress("Your location");
      setZoom(15);
    }
  };

  return (
    
      <Container id="searchMapContainer">
        <SearchBar onSearch={setSelectedAddress} onLocateUser={handleLocateUser} />
        {/* <Image src="https://placehold.co/400" /> */}
        <GoogleMapp selectedAddress={selectedAddress} coordinates={coordinates} zoom={zoom} userLocation={userLocation}/>
        <RestaurantList restaurants={restaurants} loading={loading} error={error} />
      </Container>
  );
};

export default HomePage;
