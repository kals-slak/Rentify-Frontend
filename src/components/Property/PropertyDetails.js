import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PropertyDetails({ property, onLike }) {
  const navigate = useNavigate();

  const handleInterest = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/properties/${property._id}/interested`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Interest expressed successfully. Check your email for seller details.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <button onClick={() => onLike(property._id)}>Like ({property.likes})</button>
      <button onClick={handleInterest}>I'm Interested</button>
    </div>
  );
}

export default PropertyDetails;
