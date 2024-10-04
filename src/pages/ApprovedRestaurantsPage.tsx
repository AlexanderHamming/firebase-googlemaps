import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firedb } from '../service/firebase';
import { RestaurantWithId } from '../types/User.types';
import ApprovedRestaurantsTable from '../components/ApprovedRestaurantsTable';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

const ApprovedRestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantWithId[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<RestaurantWithId> | null>(null);

  useEffect(() => {
    const fetchApprovedRestaurants = async (): Promise<RestaurantWithId[]> => {
      const approvedRestaurants = await getDocs(collection(firedb, 'restaurants'));
      const restaurants = approvedRestaurants.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          category: data.category || [],
          offer: data.offer || [],
        } as RestaurantWithId;
      });
      return restaurants;
    };

    const getCollection = async () => {
      const approvedRestaurants: RestaurantWithId[] = await fetchApprovedRestaurants();
      setRestaurants(approvedRestaurants);
    };

    getCollection();
  }, []);

  const handleEditClick = (restaurant: RestaurantWithId) => {
    setEditMode(restaurant.id);
    setEditData({ ...restaurant });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'category' || name === 'offer') {
      setEditData((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveClick = async () => {
    if (editMode && editData) {
      try {
        const docRef = doc(firedb, 'restaurants', editMode);
        await updateDoc(docRef, editData);

        setRestaurants((prev) => prev.map((rest) => (rest.id === editMode ? { ...rest, ...editData } : rest)));

        setEditMode(null);
        setEditData(null);
        toast('Changes saved successfully!');
      } catch (error) {
        console.error('Error saving document: ', error);
        toast('Failed to save changes.');
      }
    }
  };

  const handleDelete = async (restaurant: RestaurantWithId) => {
    try {
      const id = restaurant.id;
      const docRef = doc(firedb, 'restaurants', id);

      await deleteDoc(docRef);

      setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
      toast('Deleted successfully!');
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast('Failed to delete.');
    }
  };

  return (
    <Container>
      <h1>Approved Restaurants</h1>
      <ApprovedRestaurantsTable
        restaurants={restaurants}
        editMode={editMode}
        editData={editData}
        onEditClick={handleEditClick}
        onInputChange={handleInputChange}
        onSaveClick={handleSaveClick}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default ApprovedRestaurantsPage;
