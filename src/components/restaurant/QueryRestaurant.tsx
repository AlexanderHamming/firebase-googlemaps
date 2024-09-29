import { query, where } from "firebase/firestore";
import { restaurantsCollection } from "../../service/firebase"; 
import { useFireQuery } from "../../hooks/useFireQuery"; 

const MalmoRestaurants = () => {
  const malmöRestaurantsQuery = query(
    restaurantsCollection,
    where("city", "==", "malmö")
  );

  const { data, loading, error } = useFireQuery(malmöRestaurantsQuery, false); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Restaurants in Malmö</h2>
      <ul>
        {data?.map((restaurant, index) => (
          <li key={index}>{restaurant.city}</li>
        ))}
      </ul>
    </div>
  );
};

export default MalmoRestaurants;
