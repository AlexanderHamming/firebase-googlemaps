import axios from "axios";

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

const get = async <T>(endpoint: string, params = {}): Promise<T> => {
    try {
      const res = await instance.get(endpoint, { params });
      return res.data;
    } catch (error) {
      console.error(`error making get request to ${endpoint}:`, error);
      throw error; 
    }
  };

  const post = async <T>(endpoint: string, data = {}): Promise<T> => {
    try {
      const res = await instance.post(endpoint, data);
      return res.data;
    } catch (error) {
      console.error(`error making get request to ${endpoint}:`, error);
      throw error; 
    }
  };


// adress till kordinator
  export const getGeocodeAdress = async (adress: string) => {
    return get("/geocode/json", { adress })
  }

  export const getUserLocation = async () {

  }

  export const getDirections = async () {

  }