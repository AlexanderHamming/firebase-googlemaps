import React, { useState, useEffect, useRef } from "react";
import Select, { MultiValue } from "react-select";
import { Form, Button } from "react-bootstrap";
import { Restaurant } from "../types/User.types";
import { addDoc, collection } from "firebase/firestore";
import { firedb } from "../service/firebase";
import { toast } from "react-toastify";
import { useGeocode } from "../hooks/googleMapsHooks/useGeocode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../service/firebase";
interface OptionType {
  value: string;
  label: string;
}

const RestaurantForm: React.FC = () => {
  const initialInputValues = {
    address: "",
    category: [],
    city: "",
    description: "",
    email: "",
    facebook: "",
    instagram: "",
    name: "",
    offer: [],
    phone: "",
    website: "",
    location: { lat: 0, lng: 0 },
  };

  const [restaurant, setRestaurant] = useState<Restaurant>(initialInputValues);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: geocodeData } = useGeocode(restaurant.address, restaurant.city);

  useEffect(() => {
    if (geocodeData && geocodeData.results && geocodeData.results[0]) {
      const location = geocodeData.results[0].geometry.location;
      setRestaurant((prevState) => {
        if (prevState.location.lat !== location.lat || prevState.location.lng !== location.lng) {
          return {
            ...prevState,
            location: { lat: location.lat, lng: location.lng },
          };
        }
        return prevState;
      });
    }
  }, [geocodeData]);

  const categoryOptions: OptionType[] = [
    { value: "Pizza napoletana", label: "Pizza napoletana" },
    { value: "Pizza americana", label: "Pizza americana" },
    { value: "Dessert-pizza", label: "Dessert-pizza" },
    { value: "Swedish pizza", label: "Swedish pizza" },
    { value: "Partypizza", label: "Partypizza" },
  ];

  const offerOptions: OptionType[] = [
    { value: "After Work", label: "After Work" },
    { value: "Lunch", label: "Lunch" },
    { value: "A La Carte", label: "A La Carte" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRestaurant({
      ...restaurant,
      [name]: value,
    });
  };

  const handleCategoryChange = (newValue: MultiValue<OptionType>) => {
    setRestaurant((prevState) => ({
      ...prevState,
      category: newValue.map((option) => option.value),
    }));
  };

  const handleOfferChange = (newValue: MultiValue<OptionType>) => {
    setRestaurant((prevState) => ({
      ...prevState,
      offer: newValue.map((option) => option.value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(restaurant);
  
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `restaurantImages/${Date.now()}_${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadUrl = await getDownloadURL(imageRef);
          return downloadUrl;
        })
      );
      await addDoc(collection(firedb, "formSuggestions"), {
        ...restaurant,
        images: imageUrls, 
        createdAt: new Date(),
      });
      toast("Form submitted successfully!");
      setRestaurant(initialInputValues);
      setImages([]); 
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast("Failed to submit form.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name*</Form.Label>
        <Form.Control type="text" name="name" value={restaurant.name} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address*</Form.Label>
        <Form.Control type="text" name="address" value={restaurant.address} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group controlId="formCity">
        <Form.Label>City*</Form.Label>
        <Form.Control type="text" name="city" value={restaurant.city} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category*</Form.Label>
        <Select isMulti options={categoryOptions} value={categoryOptions.filter((option) => restaurant.category.includes(option.value))} onChange={handleCategoryChange} placeholder="Select Categories" />
      </Form.Group>

      <Form.Group controlId="formOffer">
        <Form.Label>Offer*</Form.Label>
        <Select isMulti options={offerOptions} value={offerOptions.filter((option) => restaurant.offer.includes(option.value))} onChange={handleOfferChange} placeholder="Select Offers" />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={restaurant.description} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={restaurant.email} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={restaurant.phone} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formWebsite">
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" name="website" value={restaurant.website} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formFacebook">
        <Form.Label>Facebook</Form.Label>
        <Form.Control type="text" name="facebook" value={restaurant.facebook} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formInstagram">
        <Form.Label>Instagram</Form.Label>
        <Form.Control type="text" name="instagram" value={restaurant.instagram} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formImages">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RestaurantForm;
