import React, { useState } from 'react';
import axios from 'axios';

function PropertyForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    type: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    amenities: '',
    rent: '',
    images: []
  });

  const {
    title, description, street, city, state, country, zipCode, type, bedrooms, bathrooms, area, amenities, rent
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/properties', {
        title, description,
        address: { street, city, state, country, zipCode },
        type, bedrooms, bathrooms, area, amenities: amenities.split(','), rent, images: []
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Property created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={description} onChange={handleChange} required />
      </div>
      <div>
        <label>Street</label>
        <input type="text" name="street" value={street} onChange={handleChange} required />
      </div>
      <div>
        <label>City</label>
        <input type="text" name="city" value={city} onChange={handleChange} required />
      </div>
      <div>
        <label>State</label>
        <input type="text" name="state" value={state} onChange={handleChange} required />
      </div>
      <div>
        <label>Country</label>
        <input type="text" name="country" value={country} onChange={handleChange} required />
      </div>
      <div>
        <label>Zip Code</label>
        <input type="text" name="zipCode" value={zipCode} onChange={handleChange} required />
      </div>
      <div>
        <label>Type</label>
        <input type="text" name="type" value={type} onChange={handleChange} required />
      </div>
      <div>
        <label>Bedrooms</label>
        <input type="number" name="bedrooms" value={bedrooms} onChange={handleChange} required />
      </div>
      <div>
        <label>Bathrooms</label>
        <input type="number" name="bathrooms" value={bathrooms} onChange={handleChange} required />
      </div>
      <div>
        <label>Area (sq ft)</label>
        <input type="number" name="area" value={area} onChange={handleChange} required />
      </div>
      <div>
        <label>Amenities (comma separated)</label>
        <input type="text" name="amenities" value={amenities} onChange={handleChange} />
      </div>
      <div>
        <label>Rent</label>
        <input type="number" name="rent" value={rent} onChange={handleChange} required />
      </div>
      <button type="submit">Create Property</button>
    </form>
  );
}

export default PropertyForm;