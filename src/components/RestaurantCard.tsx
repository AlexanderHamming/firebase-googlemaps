import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { Restaurant } from "../types/User.types";
import placeholderImage from "../assets/imgs/restaurantPlaceholder.jpeg";
import "../assets/RestaurantCard.scss";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const images =
    restaurant.images && restaurant.images.length > 0
      ? restaurant.images 
      : [placeholderImage];

      return (
        <Card className="restaurant-card mb-3 shadow-sm">
          <div className="restaurant-card-carousel-wrapper">
            {images.length > 1 ? (
              <Carousel
                indicators={false}
                controls={images.length > 1}
                interval={null}
                className="restaurant-card-carousel"
              >
                {images.map((imgUrl, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={imgUrl}
                      alt={`${restaurant.name} Image ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholderImage;
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Card.Img
                variant="top"
                src={images[0]}
                className="restaurant-card-image"
                alt={`${restaurant.name} Image`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderImage;
                }}
              />
            )}
          </div>
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