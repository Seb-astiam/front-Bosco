import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from "react-redux";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import { getAllAlojamientos } from "../../Redux/boscoSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useServices } from "../../Hooks/useServices";
import useCities from "../../Hooks/useCities";
import Switch from 'react-switch'

export const Filtros = () => {
 
  const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);

  const toggleOpciones = () => {
      setOpcionesAbiertas(!opcionesAbiertas);
  };

  useLocationProvincias();
  useServices();
  const dispatch = useDispatch();

  const provincias = useSelector((state) => state.storage.AllProvinces);

  const Localidades = useSelector((state) => state.storage.AllCities);

  const services = useSelector((state) => state.storage.AllService);

  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);

  const initialState = {
    provinces: "",
    cities: "",
    serviceId: [],
    square: null,
    minPrice: "",
    maxPrice: "",
    startDate: "",
    endDate: "",
    orderBy: "price",
    orderDirection: "",
  };

  const incrementarCantidad = () => {
    if (filter.square <= 14) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        square: prevFilter.square + 1
      }));
    }
  };
  
  const decrementarCantidad = () => {
    if (filter.square > 0) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        square: prevFilter.square - 1
      }));
    }
  };

  const [filter, setFilter] = useState(initialState);

  const URL = "http://localhost:3001/profileHousing/filtered";

  const handleProvinceSelection = async (selectedProvince) => {
    
    setSearchProvinceText('');

    const changeFilter = { ...filter, provinces: selectedProvince,
      cities: ''  };
    setFilter(changeFilter);

    buildQueryParams();
    fetchAlojamientos();
  };

  const handleCitySelection = async (selectedCity) => {
    
    setSearchCityText('');

    const changeFilter = { ...filter, cities: selectedCity };
    setFilter(changeFilter);

   buildQueryParams();
   fetchAlojamientos();
  };

  useEffect(() => {
    const queryParams = buildQueryParams(filter);
    fetchAlojamientos(queryParams);
  }, [filter]);

  const buildQueryParams = (filter) => {
    let queryParams = "?";
  
    for (const [key, value] of Object.entries(filter)) {
      if (value !== null && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          queryParams += `${key}=${value.join(",")}&`;
        } else {
          queryParams += `${key}=${value}&`;
        }
      }
    }
  
    return queryParams;
  };

  const fetchAlojamientos = async (queryParams) => {
    try {
      const { data } = await axios.get(URL + queryParams);
      dispatch(getAllAlojamientos(data));
    } catch (error) {
      console.log(error);
    }
  };


const handleFilterChange = async (e)=>{
    const changeFilter = { ...filter, [e.target.name]: e.target.value };
     setFilter(changeFilter);
     buildQueryParams();
     fetchAlojamientos();
}

  const handleChangeCity = async (e) => {
    setSearchCityText(e.target.value);

    // Lógica para filtrar las localidades
    const selectedProvince = filter.provinces;

    if (!selectedProvince) {
      return; // Salir temprano si no hay provincia seleccionada
    }
    const changeFilter = { ...filter, cities: e.target.value };
    setFilter(changeFilter);

    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredLocalidades(filteredCities);
  };

  const [show, setShow] = useState(true);

  const resetFilter = async () => {
    setFilter(initialState);

    if (show) setShow(false);

    try {
      const { data } = await axios.get(URL);
      dispatch(getAllAlojamientos(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShow(true);
  }, [Alojamiento]);

  const selectedProvince = filter.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : 'Escoge una provincia');
  const [searchProvinceText, setSearchProvinceText] = useState('');
  const [searchCityText, setSearchCityText] = useState('');
  const [filteredProvincias, setFilteredProvincias] = useState([]);
  const [filteredLocalidades, setFilteredLocalidades] = useState([]);

  const handleChangeProvince = (e) => {
    setSearchProvinceText(e.target.value);
  };

  useEffect(() => {
    const filtered = provincias.filter((provincia) =>
      provincia.nombre.toLowerCase().includes(searchProvinceText.toLowerCase())
    );
    setFilteredProvincias(filtered);
  }, [searchProvinceText, provincias]);
 
  console.log('filter:', filter)
  
  const [filterOn, setFilterOn] = useState(false)

  const handleFilterOn = () => {
    setFilterOn(!filterOn)
  }

  const handleServiceSelection = (serviceId, checked) => {
    setFilter((prevFilter) => {
      const updatedServiceId = checked
        ? [...prevFilter.serviceId, serviceId]
        : prevFilter.serviceId.filter((id) => id !== serviceId);
  
      const changeFilter = { ...prevFilter, serviceId: updatedServiceId };
  
      fetchAlojamientos(changeFilter);
  
      return changeFilter;
    });
  };
  
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);

  const handleInputClick = () => {
    if (window.innerWidth <= 900) {
      setShowAdditionalDiv((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchAlojamientos();
  }, [filter]);

  return (
    <div className=' flex flex-row justify-center items-center'>
    <div className=" border h-[40px] border-solid border-gray-200 rounded-[80px] bg-white shadow-md flex flex-row items-center justify-between p-3 mq900:p-1  max-w-full  z-[3] ">

          <div className='flex flex-col mq900:ml-5 ml-10 w-[125px]'> 
            <label className='font-medium'>Provincia</label>
            <input
            type="text"
            placeholder={filter.provinces ? `${filter.provinces}` : '¿Dónde?'}
            value={searchProvinceText}
            onChange={handleChangeProvince}
            className="bg-transparent outline-none"
            onClick={handleInputClick }
          />

          {searchProvinceText && (
            <div className="mq900:hidden absolute z-10 mt-16 bg-white shadow-xl p-4 rounded-[20px] border border-solid border-gray-200">
              {filteredProvincias.map((provincia) => (
                <div
                  key={provincia.id}
                  onClick={() => handleProvinceSelection(provincia.nombre)}
                  className="hover:bg-gray-200 cursor-pointer p-[10px] rounded-lg flex"
                >
                  {provincia.nombre}
                </div>
              ))}
            </div>
          )}
     
          </div>
 <div className='flex flex-col mq900:ml-5 ml-10 w-[125px]'>

      <label className='font-medium'>Localidad</label>
      <input
        type="text"
        placeholder={filter.cities ? `${filter.cities}` : '¿Dónde?'}
        value={searchCityText}
        onChange={handleChangeCity}
        className="bg-transparent outline-none"
        onClick={handleInputClick}
      />

      {searchCityText && (
        <div className="absolute z-10 mt-16 w-[200px] bg-white shadow-xl p-4 rounded-[20px] border border-solid border-gray-200">
          {filteredLocalidades.map((localidad) => (
            <div
              key={localidad.id}
              onClick={() => handleCitySelection(localidad.name)}
              className="hover:bg-gray-200 cursor-pointer p-[10px] rounded-lg flex"
            >
              {localidad.name}
            </div>
          ))}
        </div>
      )}
      </div>

          {showAdditionalDiv && (
            <div className='absolute justify-center z-10 flex flex-col w-[400px] top-[108px] bg-white shadow-xl p-4 rounded-[20px] border border-solid border-gray-200'>
              <box-icon name='arrow-back' onClick={handleInputClick} size='20px'></box-icon>
              <label className='font-medium ml-8'>Lugar</label>
            <input
            type="text"
            placeholder={filter.provinces ? `${filter.provinces}` : '¿Dónde?'}
            value={searchText}
            onChange={handleChangeProvince}
            className="bg-transparent outline-none mb-2 ml-8"
          />

        {searchText && (
            <div className="  z-10 ml-8 bg-white shadow-xl p-2 mb-2 rounded-[20px] border border-solid border-gray-200">
              {filteredProvincias.map((provincia) => (
                <div
                  key={provincia.id}
                  onClick={() => handleProvinceSelection(provincia.nombre)}
                  className="hover:bg-gray-200 cursor-pointer p-[5px] rounded-lg flex text-sm "
                >
                  {provincia.nombre}
                </div>
              ))}
            </div>
          )}

          <div className=" font-medium ml-8">Check-in</div>

          <DatePicker
            selected={filter.startDate} 
            onChange={(date) => handleFilterChange({ target: { name: 'startDate', value: date } })}
            placeholderText={filter.startDate ? `${filter.startDate}` : '¿Cuándo?'}
            maxDate={filter.endDate}
            className="outline-none mb-2 ml-8" 
          />

          <div className=" font-medium ml-8">Check-out</div>
              
              <DatePicker
               selected={filter.endDate} 
               onChange={(date) => handleFilterChange({ target: { name: 'endDate', value: date } })}
               placeholderText={filter.endDate ? `${filter.endDate}` : '¿Cuándo?'} 
               minDate={filter.startDate}
               className="outline-none mb-2 ml-8"
               /> 

            <label className='font-medium ml-8'>Mascotas</label>
            <div className="relative">
                <button
                    type="button"
                    className="bg-transparent outline-none flex justify-start w-full text-[#767676] ml-8"
                    onClick={toggleOpciones}
                > {filter.square ? `${filter.square}` : '¿Cuántas?'}</button>

                {opcionesAbiertas && (
                    <div className=" ml-8 z-10 mt-2 border border-solid border-gray-200 rounded-[20px] bg-white shadow-lg">
                        <div className="mt-4" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="flex w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span className='mr-[55px]'>Perro</span>
                                <div className="flex">
                                    <button className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" 
                                    onClick={decrementarCantidad}
                                    >-</button>
                                    <input  className='outline-none w-[35px] flex text-center' value= {filter.square} readOnly />
                                    <button className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" 
                                    onClick={incrementarCantidad}
                                    >+</button>
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
)}

            <div className="mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
            <img
              className="h-[25px] w-[25px] rounded-[20px] max-w-full overflow-hidden "
              loading="lazy"
              alt=""
              src="/1084899-4caf50.png"
            />    

            <div className="mq900:hidden flex flex-col items-start justify-start ml-[10px] w-[100px]">
              <div className=" font-medium">Check-in</div>

              <DatePicker
                selected={filter.startDate} 
                onChange={(date) => handleFilterChange({ target: { name: 'startDate', value: date } })}
                placeholderText={filter.startDate ? `${filter.startDate}` : '¿Cuándo?'}
                maxDate={filter.endDate}
                className="outline-none" 
              />
            </div>

          </div>
          
          <div className=" mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
            
            <img
              className="h-[25px] w-[25px] rounded-[20px] max-w-full overflow-hidden"
              loading="lazy"
              alt=""
              src="/1084899-ff5722.png"
            />    

            <div className=" mq900:hidden flex flex-col items-start justify-start ml-[10px]  w-[100px]">
              <div className=" font-medium">Check-out</div>
              
               <DatePicker
                selected={filter.endDate} 
                onChange={(date) => handleFilterChange({ target: { name: 'endDate', value: date } })}
                placeholderText={filter.endDate ? `${filter.endDate}` : '¿Cuándo?'} 
                minDate={filter.startDate}
                className="outline-none"
                /> 
            </div>

          </div>

          <div className='mq900:hidden flex flex-col w-[100px]'> 
            <label className='font-medium'>Mascotas</label>
            <div className="relative">
                <button
                    type="button"
                    className="bg-transparent outline-none flex justify-start w-full text-[#767676]"
                    onClick={toggleOpciones}
                > {filter.square ? `${filter.square}` : '¿Cuántas?'}</button>

                {opcionesAbiertas && (
                    <div className="absolute z-10 mt-7 border border-solid border-gray-200 rounded-[20px] bg-white shadow-lg">
                        <div className="mt-4" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="flex w-[200px] px-4 py-2 text-sm text-gray-700  focus:outline-none " role="menuitem">
                                <span className='mr-[55px]'>Perro</span>
                                <div className="flex">
                                    <button className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" 
                                    onClick={decrementarCantidad}
                                    >-</button>
                                    <input  className='outline-none w-[35px] flex text-center' value= {filter.square} readOnly />
                                    <button className="flex items-center w-[20px] h-[20px] justify-center focus:outline-none rounded-[20px]" 
                                    onClick={incrementarCantidad}
                                    >+</button>
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
        className="cursor-pointer  py-2 text-white  bg-chocolate-100 w-[42.5px] rounded-[80px] flex items-center justify-center px-[20px] hover:bg-chocolate-200" 
        >
        <box-icon name='search' size='25px' color='white'></box-icon> 
        </button>
    </div>
    <div className='relative'>
    <button className=' flex h-[40px] ml-2 font-custom font-medium items-center rounded-[80px] p-2 bg-white border border-gray-200 shadow-md hover:border-gray-900 '
    onClick={handleFilterOn}>
    <box-icon name='filter'></box-icon>
    Filtros
    </button>
    <a className='text-chocolate-100 text-sm hover:underline cursor-pointer flex justify-center' onClick={resetFilter}>
  Limpiar
</a>

    {filterOn && (
                    <div className='absolute mt-4 right-0 mt-106 p-4 z-10 border border-solid border-gray-200 shadow-xl bg-white flex flex-col rounded-[20px]'>
                      <label className='text-md mt-1'>Ordenar por:</label>
                      <select
                        name="orderDirection"
                        onChange={handleFilterChange}
                        className=" bg-transparent focus:outline-none text-chocolate-100 mb-1"
                      >
                        <option value="" className="">
                          Más relevantes
                        </option>
                        <option value="ASC">Menor precio</option>
                        <option value="DESC">Mayor precio</option>
                      </select>

                      <label className='text-md mt-1'>Precio:</label>
                            <div className="flex flex-row">

                                <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] ml-[15px]">
                                  <label
                                    className="bg-transparent focus:outline-none text-sm text-chocolate-100 "
                                  > Mín:
                                  </label>
                                      <a className="flex flex-row bg-transparent text-chocolate-100  focus:outline-none text-sm w-[50px] ml-[5px]">
                                        $
                                        <input
                                          value={filter.minPrice}
                                          name="minPrice"
                                          id="minPrice"
                                          type="number"
                                          min="0"
                                          max="99000"
                                          step="1000"
                                          placeholder={filter.minPrice}
                                          onChange={handleFilterChange}
                                          className="bg-transparent text-chocolate-100 focus:outline-none text-sm w-[60px]"
                                        />
                                      </a>
                                  </div>
                              
                                  <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] ml-[15px]">
                                    <label
                                      className="bg-transparent focus:outline-none text-sm text-chocolate-100 "
                                    >Máx:
                                    </label>
                                    <a className="flex flex-row bg-transparent text-chocolate-100  focus:outline-none text-sm w-[50px] ml-[5px]">
                                      $
                                      <input
                                        value={filter.maxPrice}
                                        name="maxPrice"
                                        id="maxPrice"
                                        type="number"
                                        min={parseInt(filter.minPrice) + 1000}
                                        max="99000"
                                        step="1000"
                                        onChange={handleFilterChange}
                                        className="bg-transparent text-chocolate-100 focus:outline-none text-sm w-[60px]"
                                      />
                                    </a>
                                 </div>
                                </div>
              
                              <label className='text-md mt-1'>Servicios:</label>
                                  <div>
                  
                                    {services.map((service) => (
                                      <div key={service.id} className="flex items-center justify-between mb-2 ml-20">
                                        <span className='text-sm'>{service.type}</span>
                                        <Switch
                                          onChange={(checked) => handleServiceSelection(service.id, checked)}
                                          checked={filter.serviceId.includes(service.id)} 
                                          onColor="#eb662b"
                                          offColor="#CBD5E0" 
                                          checkedIcon={false} 
                                          uncheckedIcon={false}
                                          height={20}
                                          width={40}
                                          handleDiameter={16}
                                        />
                                      </div>
                                    ))}
                                  </div>
                
                    </div>
    )}
</div>

    </div>
  );
};


