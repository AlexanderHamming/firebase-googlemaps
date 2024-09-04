export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Restaurant {
  address: string;
  category: string[];
  city: string;
  description?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  name: string;
  offer: string[];
  phone?: string;
  website?: string;
}

export interface RestaurantWithId {
  address: string;
  category: string[];
  city: string;
  description?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  name: string;
  offer: string[];
  phone?: string;
  website?: string;
  id: string
}
