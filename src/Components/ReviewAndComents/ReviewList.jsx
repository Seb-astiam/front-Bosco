import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Estado para controlar el número de página actual
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/review/allReview/${id}`);
        setReviews(response.data);
      } catch (error) {
        setError('Error al obtener las revisiones');
        console.error(error);
      }
    };

    fetchReviews();
  }, [id]);

  // Calcular la calificación promedio
  const averageRating = reviews.length > 0 ?
    reviews.reduce((sum, review) => sum + review.valoracion, 0) / reviews.length :
    0;

  // Función para generar el array de estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<BsStarFill key={i} className="text-yellow-500" style={{ fontSize: "24px" }} />);
    }
    return stars;
  };

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Calcular el índice de inicio y final para las revisiones de la página actual
  const startIndex = (page - 1) * 4;
  const endIndex = page * 4;

  return (
    <div>
    <div className="flex items-center mb-4">
      <h2 className="text-2xl font-bold mr-4">Calificación: {averageRating.toFixed(1)}</h2>
      <div className="flex items-center">
        
        <div className="stars-container">{renderStars(averageRating)}</div>
      </div>
    </div>

      <div className="flex flex-wrap">
        {Array.isArray(reviews) && reviews.length > 0 && reviews.slice(startIndex, endIndex).map((review, index) => {
          return (
            <div key={index} className="flex-grow-0 flex-shrink-0 md:w-auto p-4">
              <div className="border border-gray-300 p-4 mb-4  rounded-md bg-orange-200">
                <div className="flex items-center mb-2">
                  <p className="text-lg font-semibold mr-2">Calificación:</p>
                  <div style={{ display: "flex" }}>
                    {renderStars(review.valoracion)}
                  </div>
                </div>
                <p className="text-gray-700">{review.comentario}</p>
              </div>
            </div>
          );
        })}
      </div>

      {reviews.length > 4 && (
        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(reviews.length / 4) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-4 py-2 border rounded ${
                i + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } hover:bg-blue-500 hover:text-white focus:outline-none`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ReviewList;
