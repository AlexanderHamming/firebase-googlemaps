import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { firedb } from "../service/firebase";
import { RestaurantWithId } from "../types/User.types";
import SuggestionsTable from "../components/SuggestionsTable";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

const AdminAdvicePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWithId[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<RestaurantWithId> | null>(null);

  useEffect(() => {
    const fetchFormSuggestions = async (): Promise<RestaurantWithId[]> => {
      const formSuggestions = await getDocs(collection(firedb, "formSuggestions"));
      const suggestions = formSuggestions.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as RestaurantWithId;
      });
      return suggestions;
    };

    const getCollection = async () => {
      const suggestions: RestaurantWithId[] = await fetchFormSuggestions();
      setRestaurants(suggestions);
    };

    getCollection();
  }, []);

  const handleEditClick = (restaurant: RestaurantWithId) => {
    setEditMode(restaurant.id);
    setEditData({ ...restaurant });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    if (editMode && editData) {
      try {
        const docRef = doc(firedb, "formSuggestions", editMode);
        await updateDoc(docRef, editData);

        setRestaurants((prev) => prev.map((rest) => (rest.id === editMode ? { ...rest, ...editData } : rest)));

        setEditMode(null);
        setEditData(null);
        toast("Changes saved successfully!");
      } catch (error) {
        console.error("Error saving document: ", error);
        toast("Failed to save changes.");
      }
    }
  };

  const handleDelete = async (restaurant: RestaurantWithId) => {
    try {
      const id = restaurant.id;
      const docRef = doc(firedb, "formSuggestions", id);

      await deleteDoc(docRef);

      setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
      toast("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast("Failed to delete.");
    }
  };

  const handleAddToDb = async (restaurant: RestaurantWithId) => {
    const id = restaurant.id;
    const docRef = doc(firedb, "formSuggestions", id);
    const restaurantForDb = restaurants.find((restaurant) => restaurant.id === id);

    try {
      await addDoc(collection(firedb, "restaurants"), {
        ...restaurantForDb,
        createdAt: new Date(),
      });
      toast("It's now in the database!!");

      await deleteDoc(docRef);
      setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error("Error adding to database: ", error);
      toast("Failed to add to database.");
    }
  };

  return (
    <Container>
      <SuggestionsTable restaurants={restaurants} editMode={editMode} editData={editData} onEditClick={handleEditClick} onInputChange={handleInputChange} onSaveClick={handleSaveClick} onDelete={handleDelete} onAddToDb={handleAddToDb} />
    </Container>
  );
};

export default AdminAdvicePage;
