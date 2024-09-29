import RealTimeRestaurants from "../components/restaurant/RealtimeRestaurant"; 
import MalmoRestaurants from "../components/restaurant/QueryRestaurant"; 

const RestaurantsPage = () => {
  return (
    <div>
      <h1>Restaurants</h1>
      <section>
        <RealTimeRestaurants />
      </section>
      <section>
        <MalmoRestaurants />
      </section>
    </div>
  );
};

export default RestaurantsPage;
