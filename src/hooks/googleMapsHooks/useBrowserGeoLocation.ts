import { useState, useEffect } from "react";
import { UserLocationType } from "../../types/goggleAPI.types";

export const useBrowserGeolocation = () => {
  const [location, setLocation] = useState<UserLocationType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation in this browser");
      setIsLoading(false);
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setIsLoading(false);
    };

    const error = (err: GeolocationPositionError) => {
      setError(err.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { location, error, isLoading };
};
