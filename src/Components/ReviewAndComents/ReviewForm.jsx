import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { BsStarFill } from 'react-icons/bs';
import classNames from 'classnames';
import axios from 'axios';


const ReviewForm = ( id ) => {
  const [comment, setComment] = useState("");
  const [valoracion, setValoracion] = useState("");
  const [error, setError] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  
  const handleSendReview = async () => {
  
    const dateNow = new Date();
    
    try {
      const response = await axios.post('/review/newReview', {
        comentario: comment,
        valoracion: valoracion,
        id_alojamiento: id.id,
        fecha: dateNow
      });
  
      if (response.status !== 200) {
        throw new Error('Error al enviar la revisión');
      }
  
      setShowThanks(true);
     
    } catch (error) {
      console.error("Error del servidor:", error.response.data); // Imprime el error del servidor
      setError('Error al enviar la revisión');
    }
  };

  const handleCommentChange = (event) => {
    
    setComment(event.target.value);
    setError('');
  };

  const handleValoracionChange = (value) => {
    
    setValoracion(value);
    setError('');
  };

  

  useEffect(() => {
    
    setShowThanks(false); // Reset showThanks state when component re-renders

  }, [comment, valoracion]);


  const handleSend = () => {
    
    if (!comment.trim()) {
      setError('Por favor, escriba un comentario.');
      return;
    }

    if (!valoracion) {
      setError('Por favor, elija una opción de calificación.');
      return;
    }
    handleSendReview();
    setComment('');
    setValoracion('');
    setValue(null);
    setShowThanks(true);
    setError('');
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded p-4">
        <div className="flex">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-1/2 p-2 border border-orange-300 rounded mr-2"
            maxLength={128}
          />
          <div className="w-1/2">
            <RadioGroup
              value={valoracion}
              onChange={handleValoracionChange}
              className="w-full my-1"
            >
              <RadioGroup.Label className="sr-only">Elija una opción</RadioGroup.Label>
              <div className="flex flex-row-reverse justify-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <RadioGroup.Option
                    key={index + 1}
                    value={5 - index}
                    className={({ active, checked }) =>
                      classNames(
                        'cursor-pointer text-gray-200',
                        'flex-1 hover:text-yellow-400',
                        'peer',
                        'peer-hover:text-yellow-400',
                        active ? 'text-yellow-500' : '',
                        checked ? 'text-yellow-500' : '',
                        valoracion >= 5 - index ? 'text-yellow-500' : ''
                      )
                    }
                  >
                    <RadioGroup.Label as={BsStarFill} className="w-6 h-6" />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 ml-24"
              onClick={handleSend}
            >
              Enviar
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
        {showThanks && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-orange-300 p-4 rounded shadow text-white">
              <p>Gracias por su opinión</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
