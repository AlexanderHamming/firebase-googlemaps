import { getGeocodeCoordinates } from "../../service/googleMaps";
import { GeocodeLocationType } from "../../types/goggleAPI.types";
import { useQuery } from "@tanstack/react-query";

export const useGeocode = (address: string, city?: string) => {
  const fullAddress = city ? `${address}, ${city}` : address;
  return useQuery<GeocodeLocationType, Error>({
    queryKey: ["geocode", fullAddress],
    queryFn: () => getGeocodeCoordinates(fullAddress),
    enabled: !!address,
  });
};

export default useGeocode;
