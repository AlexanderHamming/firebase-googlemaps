import { restaurantsCollection } from "../../service/firebase"; 
import { useFireQuery } from "../../hooks/useFireQuery";

const RealTimeRestaurants = () => {
  const { data, loading, error } = useFireQuery(restaurantsCollection, true);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Real-time Restaurants</h2>
      <ul>
        {data?.map((restaurant, index) => (
          <li key={index}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeRestaurants;