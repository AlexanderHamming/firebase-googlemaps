import { getUserLocation } from "../../service/googleMaps";
import { UserLocationType} from "../../types/goggleAPI.types";
import { useQuery } from "@tanstack/react-query";

export const useUserLocation = () => {
  return useQuery<UserLocationType, Error>({
    queryKey: ["userlocation"],
    queryFn: () => getUserLocation(),
  });
};

export default useUserLocation;
