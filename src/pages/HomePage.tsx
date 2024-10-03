import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import GoogleMapp from "../components/GoogleMap";
import useGeocode from "../hooks/googleMapsHooks/useGeocode";
import { useBrowserGeolocation } from "../hooks/googleMapsHooks/useBrowserGeoLocation";
import RestaurantList from "../components/RestaurantList";
import { restaurantsCollection } from "../service/firebase";
import { query, where } from "firebase/firestore";
import { useFireQuery } from "../hooks/useFireQuery";
import { useLocation, useNavigate } from "react-router-dom";
import useReverseGeocode from "../hooks/googleMapsHooks/useReverseGeocode";

const HomePage = () => {
  const [selectedAddress, setSelectedAddress] = useState("malmö");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [zoom] = useState<number>(12);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("city") || "";
  };

  useEffect(() => {
    const city = getQueryParams();
    if (city) {
      setSelectedAddress(city);
    }
  }, [location]);

  const { data: geocodeData } = useGeocode(selectedAddress);
  const { location: UsersLocation, error: geolocationError } =
    useBrowserGeolocation();

  const { data: reverseGeocodeData } = useReverseGeocode(
    userLocation?.lat || 0,
    userLocation?.lng || 0
  );

  // query for the selected adress...Removing comment later.
  const restaurantsQuery = useMemo(() => {
    return query(
      restaurantsCollection,
      where("city", "==", selectedAddress.toLowerCase())
    );
  }, [selectedAddress]);

  // Using the useFireQuery here with a boolean true, should work as stream..Not tested yet.
  const {
    data: restaurants,
    loading,
    error,
  } = useFireQuery(restaurantsQuery, true);

  useEffect(() => {
    if (UsersLocation) {
      setUserLocation(UsersLocation);
    } else if (geolocationError) {
      console.error("Error fetching user location:", geolocationError);
    }
  }, [UsersLocation, geolocationError]);

  useEffect(() => {
    if (geocodeData && geocodeData.results && geocodeData.results[0]) {
      const location = geocodeData.results[0].geometry.location;
      setCoordinates({ lat: location.lat, lng: location.lng });
    }
  }, [geocodeData]);

  const handleLocateUser = () => {
    if (UsersLocation) {
      setUserLocation(UsersLocation);
      setCoordinates(UsersLocation);

      if (
        reverseGeocodeData &&
        reverseGeocodeData.results &&
        reverseGeocodeData.results[0]
      ) {
        const cityResult = reverseGeocodeData.results.find((result) =>
          result.address_components.some((comp) =>
            comp.types.includes("locality")
          )
        );
        if (cityResult) {
          const city = cityResult.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name;
          if (city) {
            setSelectedAddress(city);
            navigate(`/search?city=${city.toLowerCase()}`);
          }
        } else {
          console.log("No valid city found in reverse geocoding data");
        }
      }
    } else {
      console.log("User location not available");
    }
  };

  return (
    <Container id="searchMapContainer">
      <SearchBar
        onSearch={setSelectedAddress}
        onLocateUser={handleLocateUser}
      />
      <GoogleMapp
        restaurants={restaurants}
        coordinates={coordinates}
        zoom={zoom}
        userLocation={userLocation}
      />
      <RestaurantList
        restaurants={restaurants}
        loading={loading}
        error={error?.message || null}
      />
    </Container>
  );
};

export default HomePage;
