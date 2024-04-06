import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateSearch = () => {
 
  const [fechaSalida, setFechaSalida] = useState();
  const [fechaRetorno, setFechaRetorno] = useState();

  
  const enviarFechas = () => {
    
    alert(`Salida: ${fechaSalida.toDateString()}, Retorno: ${fechaRetorno.toDateString()}`);
  };

/****************************************** */

  const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);


  const toggleOpciones = () => {
      setOpcionesAbiertas(!opcionesAbiertas);
  };

  /***************************************** */
  const [cantidadMascotas, setCantidadMascotas] = useState(0);

  const incrementarCantidad = () => {
    if (cantidadMascotas <= 14)
    setCantidadMascotas(prevCantidad => prevCantidad + 1);
  
  };

  const decrementarCantidad = () => {
    if (cantidadMascotas > 0) {
      setCantidadMascotas(prevCantidad => prevCantidad - 1);
    }
  };


  return (
    <div className=" rounded-[80px] bg-white shadow-[0px_10px_40px_rgba(0,_0,_0,_0.05)] flex flex-row items-center justify-between p-3  max-w-full  z-[3] ">

          <div className='flex flex-col ml-10 w-[150px]'> 
            <label className='font-medium'>Lugar</label>
            <input placeholder = '¿Dónde?'
            className='outline-none'
            
            ></input>
          </div>

            <div className=" flex flex-row max-w-full overflow-hidden items-center">
            <img
              className="h-[25px] w-[25px] rounded-[20px] max-w-full overflow-hidden "
              loading="lazy"
              alt=""
              src="/1084899-4caf50.png"
            />    
            

            <div className="flex flex-col items-start justify-start ml-[10px] w-[100px]">
              <div className=" font-medium">Check-in</div>
              <DatePicker
                selected={fechaSalida}
                onChange={setFechaSalida}
                placeholderText={fechaSalida ? `${fechaSalida}` : '¿Cuándo?'}
                className='outline-none'
                
                />
            </div>

          </div>
          
          <div className="flex flex-row max-w-full overflow-hidden items-center">
            
            <img
              className="h-[25px] w-[25px] rounded-[20px] max-w-full overflow-hidden"
              loading="lazy"
              alt=""
              src="/1084899-ff5722.png"
            />    

            <div className="flex flex-col items-start justify-start ml-[10px]  w-[100px]">
              <div className="font-medium">Check-out</div>
              <DatePicker selected={fechaRetorno} onChange={setFechaRetorno} placeholderText={fechaRetorno ? `${fechaRetorno}` : '¿Cuándo?'} 
              className='outline-none'
              />
            </div>

          </div>

          <div className='flex flex-col w-[100px]'> 
            <label className='font-medium'>Mascotas</label>
            <div className="relative">
                <button
                    type="button"
                    className="bg-transparent outline-none flex justify-start w-full text-[#767676]"
                    onClick={toggleOpciones}
                    
                >¿Cuántas?</button>
                {opcionesAbiertas && (
                    <div className="absolute z-10 mt-6 w-[200px] h-[165px] rounded-[20px] bg-white shadow-lg">
                        <div className="mt-4" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="flex w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span className='mr-[55px]'>Perro</span>
                                <div className="flex">
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={decrementarCantidad}>-</button>
                                    <input  className='outline-none w-[35px] flex text-center' value= {cantidadMascotas} readOnly />
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={incrementarCantidad}>+</button>
                                </div>
                            </div>
                            <div className="flex gap-1 w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span  className='mr-[55px]' >Gato</span>
                                <div className="flex">
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('-')}>-</button>
                                    <input type='number' className='outline-none w-[35px] flex text-center' defaultValue='0' min='0' />
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('+')}>+</button>
                                </div>
                            </div>
                            <div className="flex w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span  className='mr-[53px]'>Reptil</span>
                                <div className="flex">
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('-')}>-</button>
                                    <input type='number' className='outline-none w-[35px] flex text-center' defaultValue='0' min='0' />
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('+')}>+</button>
                                </div>
                            </div>
                            <div className="flex w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span  className='mr-[41px]'>Caballo</span>
                                <div className="flex">
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('-')}>-</button>
                                    <input type='number' className='outline-none w-[35px] flex text-center' defaultValue='0' min='0' />
                                    <button type="button" className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" onClick={() => console.log('+')}>+</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
            </div>
        
     
      <button 
        className="cursor-pointer py-2 font-medium text-[20px] text-white  bg-chocolate-100 w-[130px] rounded-[50px] flex items-center justify-between px-[20px] hover:bg-chocolate-200" 
        onClick={enviarFechas}>
        <box-icon name='search' size='25px' color='white'></box-icon> 
        Buscar</button>
    </div>
  );
};
