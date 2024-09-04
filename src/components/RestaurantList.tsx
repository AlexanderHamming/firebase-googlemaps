import React from "react";
import { Restaurant } from "../types/User.types";
import "../assets/RestaurantList.scss";

interface RestaurantListProps {
  restaurants: (Restaurant & { id: string })[] | null;
  loading: boolean;
  error: string | null;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurants || restaurants.length === 0) return <div>No food for you</div>;

  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name || restaurant.address || restaurant.city);
  if (filteredRestaurants.length === 0) return <div>No food for you</div>;

  return (
    <div className="restaurant-list-container">
      <ul className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.id} className="restaurant-item p-3 mb-3 rounded shadow-sm">
            {restaurant.name && <div className="restaurant-name fw-bold">{restaurant.name}</div>}
            {restaurant.address && <div className="restaurant-address text-muted">{restaurant.address}</div>}
            {restaurant.city && <div className="restaurant-city text-muted">{restaurant.city}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
