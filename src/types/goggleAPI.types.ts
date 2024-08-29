export interface GeocodeLocationType {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type?: string;
    };
  }[];
  status: string;
}


export interface ReverseGeocodeResultType {
  formatted_address: string;
}

export interface UserLocationType {
  lat: number;
  lng: number;
  accuracy?: number;
}
