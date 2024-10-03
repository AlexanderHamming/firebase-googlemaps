import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

interface GoogleMappProps {
  coordinates: { lat: number; lng: number } | null;
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
  restaurants: { id: string; data: any }[] | null;
}

const GoogleMapp: React.FC<GoogleMappProps> = ({
  coordinates,
  zoom,
  userLocation,
  restaurants,
}) => {
  const [mapCenter, setMapCenter] = useState(coordinates);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [showUserLocationInfo, setShowUserLocationInfo] = useState(false);

  useEffect(() => {
    if (coordinates) {
      setMapCenter(coordinates);
      setCurrentZoom(zoom);
    }
  }, [coordinates, zoom]);

  const handleCameraChanged = ({ detail }: any) => {
    setMapCenter(detail.center);
    setCurrentZoom(detail.zoom);
  };

  if (!coordinates) {
    return <p>No valid coordinates found!</p>;
  }

  const directionsLink = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${mapCenter?.lat},${mapCenter?.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${mapCenter?.lat},${mapCenter?.lng}`;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapID = import.meta.env.VITE_GOOGLE_MAP_ID;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={mapID}
        center={mapCenter}
        zoom={currentZoom}
        style={{ width: "100%", height: "70vh" }}
        gestureHandling="greedy"
        onCameraChanged={handleCameraChanged}
      >
        {userLocation && (
          <AdvancedMarker
            key="user-location"
            position={userLocation}
            onClick={() => setShowUserLocationInfo(true)}
          />
        )}

        {userLocation && showUserLocationInfo && (
          <InfoWindow
            position={userLocation}
            onCloseClick={() => setShowUserLocationInfo(false)}
          >
            <div>
              <h2>Me</h2>
            </div>
          </InfoWindow>
        )}

        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <AdvancedMarker
              key={restaurant.id}
              position={restaurant.data.location}
              onClick={() => setSelectedRestaurant(restaurant.id)}
            />
          ))
        ) : (
          <p>No restaurants available.</p>
        )}

        {selectedRestaurant && (
          <InfoWindow
            position={
              restaurants?.find((r) => r.id === selectedRestaurant)?.data
                .location
            }
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div>
              <h2>
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .name
                }
              </h2>
              <h3>
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .description
                }
              </h3>
              <p>
                Address:{" "}
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .address
                }
              </p>
              <p>
                Category:{" "}
                {restaurants
                  ?.find((r) => r.id === selectedRestaurant)
                  ?.data.category?.join(", ")}
              </p>
              <p>
                offer:{" "}
                {restaurants
                  ?.find((r) => r.id === selectedRestaurant)
                  ?.data.offer?.join(", ")}
              </p>
              <p>
                website:{" "}
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .website
                }
              </p>
              <p>
                email:{" "}
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .email
                }
              </p>
              <p>
                phone:{" "}
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .phone
                }
              </p>
              <p>
                phone:{" "}
                {
                  restaurants?.find((r) => r.id === selectedRestaurant)?.data
                    .phone
                }
              </p>
              <p>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapp;
