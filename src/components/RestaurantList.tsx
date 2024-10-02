import React from "react";
import { Restaurant } from "../types/User.types";
import RestaurantCard from "./RestaurantCard";
import { Container } from "react-bootstrap";
import "../assets/RestaurantList.scss";

interface RestaurantListProps {
  restaurants: { id: string; data: Restaurant }[] | null;
  loading: boolean;
  error: string | null;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurants || restaurants.length === 0) return <div>No food for you</div>;
  
  return (
    <Container fluid className="restaurant-list-container">
      <div className="restaurant-list">
        {restaurants.map(({ id, data: restaurant }) => (
          <div key={id} className="restaurant-item">
            <RestaurantCard id={id} restaurant={restaurant} />  
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RestaurantList;
