import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyDetails from './PropertyDetails';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties?page=${page}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProperties(res.data.properties);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, [page]);

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/properties/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProperties(properties.map(p => p._id === id ? { ...p, likes: p.likes + 1 } : p));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {properties.map(property => (
        <PropertyDetails key={property._id} property={property} onLike={handleLike} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PropertyList;
