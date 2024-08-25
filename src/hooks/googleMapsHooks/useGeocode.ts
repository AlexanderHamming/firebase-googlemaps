import { getGeocodeCoordinates } from "../../service/googleMaps";
import { GeocodeLocationType } from "../../types/goggleAPI.types";
import { useQuery } from "@tanstack/react-query";

export const useGeocode = (address: string) => {
  return useQuery<GeocodeLocationType, Error>({
    queryKey: ["geocode", address],
    queryFn: () => getGeocodeCoordinates(address),
    enabled: !!address,
  });
};

export default useGeocode;
