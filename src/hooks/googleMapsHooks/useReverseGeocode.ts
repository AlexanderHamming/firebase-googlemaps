import { getReverseGeocode } from "../../service/googleMaps";
import { ReverseGeocodeResultType} from "../../types/goggleAPI.types";
import { useQuery } from "@tanstack/react-query";

export const useReverseGeocode = (lat: number, lng:number) => {
  return useQuery<ReverseGeocodeResultType, Error>({
    queryKey: ["geocode", lat, lng],
    queryFn: () => getReverseGeocode(lat, lng),
    enabled: !!lat && !!lng,
  });
};

export default useReverseGeocode;
