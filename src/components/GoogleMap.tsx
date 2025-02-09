import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import placeholderImage from "../assets/imgs/restaurantPlaceholder.jpeg";
import { Carousel } from 'react-bootstrap';


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

  const selectedRestaurantData = restaurants?.find(
    (r) => r.id === selectedRestaurant
  )?.data;

   const imageUrl =
    selectedRestaurantData?.images && selectedRestaurantData.images.length > 0
      ? selectedRestaurantData.images[0]
      : placeholderImage;

      const images =
  selectedRestaurantData?.images && selectedRestaurantData.images.length > 0
    ? selectedRestaurantData.images
    : [placeholderImage];

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

        {selectedRestaurant && selectedRestaurantData && (
          <InfoWindow
            position={selectedRestaurantData.location}
            onCloseClick={() => setSelectedRestaurant(null)}
          >
            <div style={{ maxWidth: '200px' }}>
              <h2>{selectedRestaurantData.name}</h2>
              <h3>{selectedRestaurantData.description}</h3>
              <p>Address: {selectedRestaurantData.address}</p>
              <p>Category: {selectedRestaurantData.category?.join(', ')}</p>
              <p>Offer: {selectedRestaurantData.offer?.join(', ')}</p>
              <p>Website: {selectedRestaurantData.website}</p>
              <p>Email: {selectedRestaurantData.email}</p>
              <p>Phone: {selectedRestaurantData.phone}</p>
              <p>
                <a
                  href={directionsLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Get Directions
                </a>
              </p>
              {images.length > 1 ? (
                <Carousel
                  indicators={false}
                  controls={images.length > 1}
                  interval={null}
                  style={{ marginTop: '10px' }}
                >
                  {images.map((imgUrl: string, index: number) => (
                    <Carousel.Item key={index}>
                      <img
                        className='d-block w-100'
                        src={imgUrl}
                        alt={`${selectedRestaurantData.name} Image ${index + 1}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = placeholderImage;
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={images[0]}
                  alt={`${selectedRestaurantData.name} Image`}
                  style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderImage;
                  }}
                />
              )}
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapp;
