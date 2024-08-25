import axios from "axios";
import { GeocodeLocationType, ReverseGeocodeResultType, UserLocationType } from "../types/goggleAPI.types";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASEURL;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    key: googleMapsApiKey,
  },
});

// genrisk funktion för get
const get = async <T>(endpoint: string, params = {}): Promise<T> => {
  try {
    const res = await instance.get(endpoint, { params });
    return res.data;
  } catch (error) {
    console.error(`error making get request to ${endpoint}:`, error);
    throw error;
  }
};

// generisk funktion för post.
const post = async <T>(endpoint: string, data = {}): Promise<T> => {
  try {
    const res = await instance.post(endpoint, data);
    return res.data;
  } catch (error) {
    console.error(`error making post request to ${endpoint}:`, error);
    throw error;
  }
};

// adress till kordinator
export const getGeocodeCoordinates = async (address: string): Promise<GeocodeLocationType> => {
    return get<GeocodeLocationType>("/geocode/json", { address });
  };

// användarens kordinator
export const getUserLocation = async (): Promise<UserLocationType> => {
    return post<UserLocationType>("/geolocation/v1/geolocate");
  };

// kordinator till adress
export const getReverseGeocode = async (lat: number, lng: number): Promise<ReverseGeocodeResultType> => {
    return get<ReverseGeocodeResultType>("/geocode/json", { latlng: `${lat},${lng}` });
  };