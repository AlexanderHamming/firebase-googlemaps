import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { Form, Button } from 'react-bootstrap';
import { Restaurant } from '../types/User.types';
import { addDoc, collection } from 'firebase/firestore';
import { firedb } from '../service/firebase';
import { toast } from 'react-toastify';

interface OptionType {
    value: string;
    label: string;
}


const RestaurantForm: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant>({
        address: '',
        category: [],
        city: '',
        description: '',
        email: '',
        facebook: '',
        instagram: '',
        name: '',
        offer: [],
        phone: '',
        website: '',
    });

    const categoryOptions: OptionType[] = [
        { value: 'Pizza napoletana', label: 'Pizza napoletana' },
        { value: 'Pizza americana', label: 'Pizza americana' },
        { value: 'Dessert-pizza', label: 'Dessert-pizza' },
        { value: 'Swedish pizza', label: 'Swedish pizza' },
        { value: 'Partypizza', label: 'Partypizza' }
    ];

    const offerOptions: OptionType[] = [
        { value: 'After Work', label: 'After Work' },
        { value: 'Lunch', label: 'Lunch' },
        { value: 'A La Carte', label: 'A La Carte' }
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setRestaurant({
            ...restaurant,
            [name]: value,
        });
    };

    const handleCategoryChange = (
        newValue: MultiValue<OptionType>
    ) => {
        setRestaurant(prevState => ({
            ...prevState,
            category: newValue.map(option => option.value),
        }));
    };

    const handleOfferChange = (
        newValue: MultiValue<OptionType>
    ) => {
        setRestaurant(prevState => ({
            ...prevState,
            offer: newValue.map(option => option.value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(restaurant);

        try {
            await addDoc(collection(firedb, 'formSuggestions'), {
                ...restaurant,
                createdAt: new Date()
            });
            toast('Form submitted successfully!');
        } catch (error) {
            console.error("Error submitting form: ", error);
            toast('Failed to submit form.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={restaurant.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formAddress">
                <Form.Label>Address*</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={restaurant.address}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formCity">
                <Form.Label>City*</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    value={restaurant.city}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formCategory">
                <Form.Label>Category*</Form.Label>
                <Select
                    isMulti
                    options={categoryOptions}
                    value={categoryOptions.filter(option => restaurant.category.includes(option.value))}
                    onChange={handleCategoryChange}
                    placeholder="Select Categories"
                />
            </Form.Group>

            <Form.Group controlId="formOffer">
                <Form.Label>Offer*</Form.Label>
                <Select
                    isMulti
                    options={offerOptions}
                    value={offerOptions.filter(option => restaurant.offer.includes(option.value))}
                    onChange={handleOfferChange}
                    placeholder="Select Offers"
                />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={restaurant.description}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={restaurant.email}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={restaurant.phone}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="formWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                    type="text"
                    name="website"
                    value={restaurant.website}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="formFacebook">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                    type="text"
                    name="facebook"
                    value={restaurant.facebook}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="formInstagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                    type="text"
                    name="instagram"
                    value={restaurant.instagram}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default RestaurantForm;
