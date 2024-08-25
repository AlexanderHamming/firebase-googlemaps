export interface GeocodeLocationType {
  lat: number;
  lng: number;
}

export interface ReverseGeocodeResultType {
  formatted_address: string;
}

export interface UserLocationType {
  lat: number;
  lng: number;
  accuracy?: number;
}
