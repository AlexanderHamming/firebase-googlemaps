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

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  location_type: string;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface ReverseGeocodeResultType {
  results: Result[]; 
  status: string;
}