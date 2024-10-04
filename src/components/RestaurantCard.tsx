import React from "react";
import { Card } from "react-bootstrap";
import { Restaurant } from "../types/User.types";
import placeholderImage from "../assets/imgs/restaurantPlaceholder.jpeg";
import "../assets/RestaurantCard.scss";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {

  const imageUrl =
    restaurant.images && restaurant.images.length > 0
      ? restaurant.images[0] 
      : placeholderImage;

  return (
    <Card className="restaurant-card mb-3 shadow-sm">
      <Card.Img variant="top" src={imageUrl} className="restaurant-card-image" alt={`${restaurant.name} Image`}/>
      <Card.Body className="restaurant-card-body">
        <Card.Title className="restaurant-card-title">
          {restaurant.name || "Not a restaurant"}
        </Card.Title>
        {restaurant.address && (
          <Card.Text>
            <span className="card-label">Address:</span> {restaurant.address}
          </Card.Text>
        )}
        {restaurant.city && (
          <Card.Text>
            <span className="card-label">City:</span> {restaurant.city}
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer className="restaurant-card-footer">
        <div className="social-icons">
          <span className="social-icon">
            <i className="bi bi-facebook"></i>
          </span>
          <span className="social-icon">
            <i className="bi bi-instagram"></i>
          </span>
          <span className="social-icon">
            <i className="bi bi-envelope"></i>
          </span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default RestaurantCard;