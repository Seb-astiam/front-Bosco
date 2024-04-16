import Select from "react-select";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import { useSelector, useDispatch } from "react-redux";
import { getAllAlojamientos } from "../../Redux/boscoSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import Switch from "react-switch";
import DatePicker from "react-datepicker";

const Filtro2 = () => {
  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);
  const services = useSelector((state) => state.storage.AllService);
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    provinces: "",
    cities: "",
    serviceId: [],
    square: 1,
    minPrice: "",
    maxPrice: "",
    hourly: "",
    startHour: "",
    endHour: "",
    startDate: "",
    endDate: "",
    orderBy: "price",
    orderDirection: "",
  };
  const [filter, setFilter] = useState(initialState);

  const URL = "/profileHousing/filtered";

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "9rem",
      fontSize: "12px",
      border: "none",
    }),
  };

  useLocationProvincias();
  const provincias = useSelector((state) => state.storage.AllProvinces);
  const optionProvincias = provincias.map((prov) => {
    return { value: prov.nombre, label: prov.nombre };
  });

  const [optionsLocalidades, setOptionsLocalidades] = useState([]);

  const handleChange = async (event) => {
    const { name, value, checked } = event.target;

    if (name === "hourly") {
      setFilter({ ...filter, hourly: checked });
    } else if (name === "provinces") {
      setFilter({ ...filter, provinces: value });
      try {
        const response = await axios.get(`/location/cities?provincia=${value}`);
        const formattedCities = response.data.map((city) => ({
          value: city.nombre,
          label: city.nombre,
        }));

        setOptionsLocalidades(formattedCities);
      } catch (error) {}
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const buildQueryParams = (filter) => {
    let queryParams = "?";

    for (const [key, value] of Object.entries(filter)) {
      if (value !== null && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          queryParams += `${key}=${value.join(",")}&`;
        } else {
          if (key === "hourly") {
            if (value === true) {
              queryParams += `${key}=true&`;
            } else {
              queryParams += `${key}=false&`;
            }
          } else {
            queryParams += `${key}=${value}&`;
          }
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

  useEffect(() => {
    const queryParams = buildQueryParams(filter);
    fetchAlojamientos(queryParams);
  }, [filter]);

  const [filterOn, setFilterOn] = useState(false);

  const handleFilterOn = () => {
    setFilterOn(!filterOn);
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

  const handleServiceSelection = (serviceId, checked) => {
    setFilter((prevFilter) => {
      const updatedServiceId = checked
        ? [...prevFilter.serviceId, serviceId]
        : prevFilter.serviceId.filter((id) => id !== serviceId);

      const changeFilter = { ...prevFilter, serviceId: updatedServiceId };

      // fetchAlojamientos(changeFilter);

      return changeFilter;
    });
  };

  return (
    show && (
      <div className=" flex flex-row justify-center items-center mq900:text-left">
        <div className="pl-3 border h-[40px] border-solid border-gray-200 rounded-[80px] bg-white shadow-md flex flex-row items-center justify-evenly py-4 mq900:p-1 mq900:shadow-none mq900:border-none mq900:w-[85vw] mq900:justify-end  max-w-full  z-[3]">
          <div className="flex flex-row items-center justify-between mq900:hidden">
            <div className="w-42 flex flex-col items-center ml-2">
              <label className="font-medium text-sm mb-2">Nombre</label>
              <input
                className="w-16 self-end h-4 mb-1"
                type="text"
                name="title"
                value={filter.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-row m-2">
              <div className="w-42 flex flex-col items-center mx-3">
                <label className="font-medium text-sm">Provincia</label>
                <Select
                  options={optionProvincias}
                  styles={customStyles}
                  onChange={(select) =>
                    handleChange({
                      target: { name: "provinces", value: select.value },
                    })
                  }
                />
              </div>

              <div className="w-42 flex flex-col items-center">
                <label className="font-medium text-sm">Localidad</label>
                <Select
                  options={optionsLocalidades}
                  styles={customStyles}
                  onChange={(select) =>
                    handleChange({
                      target: { name: "cities", value: select.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex align-middle justify-center mx-2 self-end">
                <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
                  Días
                </span>
                <Switch
                  onChange={(checked) => {
                    handleChange({ target: { name: "hourly", checked } });
                  }}
                  checked={filter.hourly}
                  onColor="#eb662b"
                  offColor="#eb662b"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  handleDiameter={16}
                />
                <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 ml-3">
                  Horas
                </span>
              </div>

              {filter.hourly ? (
                <div className="flex flex-row">
                  <div className="mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
                    <img
                      className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden "
                      loading="lazy"
                      alt=""
                      src="/1084899-4caf50.png"
                    />

                    <div className="mq900:hidden flex flex-col items-center justify-start ml-[10px] w-[100px]">
                      <div className=" font-medium text-sm">Check-in</div>

                      <input
                        className="mt-1 w-12"
                        type="number"
                        name="startHour"
                        value={filter.startHour}
                        onChange={handleChange}
                        min={0}
                        max={filter.endHour}
                        step={1}
                      />
                    </div>
                  </div>

                  <div className=" mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
                    <img
                      className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden"
                      loading="lazy"
                      alt=""
                      src="/1084899-ff5722.png"
                    />

                    <div className=" mq900:hidden flex flex-col items-center justify-start ml-[10px]  w-[100px]">
                      <div className="font-medium text-sm">Check-out</div>

                      <input
                        className="mt-1 w-12"
                        type="number"
                        name="endHour"
                        value={filter.endHour}
                        onChange={handleChange}
                        min={filter.startHour}
                        step={1}
                        max={24}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row">
                  <div className="mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
                    <img
                      className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden "
                      loading="lazy"
                      alt=""
                      src="/1084899-4caf50.png"
                    />

                    <div className="mq900:hidden flex flex-col items-start justify-start ml-[10px] w-[100px]">
                      <div className=" font-medium text-sm">Check-in</div>

                      <DatePicker
                        selected={filter.startDate}
                        onChange={(date) =>
                          handleChange({
                            target: { name: "startDate", value: date },
                          })
                        }
                        placeholderText={
                          filter.startDate ? `${filter.startDate}` : "¿Cuándo?"
                        }
                        maxDate={filter.endDate}
                        className="outline-none"
                      />
                    </div>
                  </div>

                  <div className=" mq900:hidden flex flex-row max-w-full overflow-hidden items-center">
                    <img
                      className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden"
                      loading="lazy"
                      alt=""
                      src="/1084899-ff5722.png"
                    />

                    <div className=" mq900:hidden flex flex-col items-start justify-start ml-[10px]  w-[100px]">
                      <div className=" font-medium text-sm">Check-out</div>

                      <DatePicker
                        selected={filter.endDate}
                        onChange={(date) =>
                          handleChange({
                            target: { name: "endDate", value: date },
                          })
                        }
                        placeholderText={
                          filter.endDate ? `${filter.endDate}` : "¿Cuándo?"
                        }
                        minDate={filter.startDate}
                        className="outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative mx-2 mq900:mx-4">
            <button
              className="cursor-pointer  py-2 text-white  bg-chocolate-100 w-[42.5px] rounded-[80px] flex items-center justify-center px-[20px] hover:bg-chocolate-200"
              onClick={handleFilterOn}
            >
              <box-icon size="25px" color="white" name="filter"></box-icon>
            </button>

            {filterOn && (
              <div className="absolute mt-6 right-0 p-4 z-10 border border-solid border-gray-200 shadow-xl bg-white flex flex-col rounded-[20px]  mq900:mt-2">
                <div className="hidden mq900:flex mq900:flex-col items-center justify-between ">
                  <div className="flex flex-col m-4">
                    <div className="w-42 flex flex-col items-center m-3">
                      <label className="font-medium text-sm">Provincia</label>
                      <Select
                        options={optionProvincias}
                        styles={customStyles}
                        onChange={(select) =>
                          handleChange({
                            target: { name: "provinces", value: select.value },
                          })
                        }
                      />
                    </div>

                    <div className="w-42 flex flex-col items-center m-3">
                      <label className="font-medium text-sm">Localidad</label>
                      <Select
                        options={optionsLocalidades}
                        styles={customStyles}
                        onChange={(select) =>
                          handleChange({
                            target: { name: "cities", value: select.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex align-middle justify-center m-2 self-center">
                      <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
                        Días
                      </span>
                      <Switch
                        onChange={(checked) => {
                          handleChange({ target: { name: "hourly", checked } });
                        }}
                        checked={filter.hourly}
                        onColor="#eb662b"
                        offColor="#eb662b"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={40}
                        handleDiameter={16}
                      />
                      <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 ml-3">
                        Horas
                      </span>
                    </div>

                    {filter.hourly ? (
                      <div className="flex flex-row">
                        <div className="flex flex-row max-w-full overflow-hidden items-center">
                          <img
                            className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden "
                            loading="lazy"
                            alt=""
                            src="/1084899-4caf50.png"
                          />

                          <div className="flex flex-col items-center justify-start ml-[10px] w-[100px]">
                            <div className=" font-medium text-sm">Check-in</div>

                            <input
                              className="mt-1 w-12"
                              type="number"
                              name="startHour"
                              value={filter.startHour}
                              onChange={handleChange}
                              min={0}
                              max={filter.endHour}
                              step={1}
                            />
                          </div>
                        </div>

                        <div className=" flex flex-row max-w-full overflow-hidden items-center">
                          <img
                            className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden"
                            loading="lazy"
                            alt=""
                            src="/1084899-ff5722.png"
                          />

                          <div className="flex flex-col items-center justify-start ml-[10px]  w-[100px]">
                            <div className="font-medium text-sm">Check-out</div>

                            <input
                              className="mt-1 w-12"
                              type="number"
                              name="endHour"
                              value={filter.endHour}
                              onChange={handleChange}
                              min={filter.startHour}
                              step={1}
                              max={24}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row">
                        <div className="flex flex-row max-w-full overflow-hidden items-center">
                          <img
                            className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden "
                            loading="lazy"
                            alt=""
                            src="/1084899-4caf50.png"
                          />

                          <div className="flex flex-col items-start justify-start ml-[10px] w-[100px]">
                            <div className=" font-medium text-sm">Check-in</div>

                            <DatePicker
                              selected={filter.startDate}
                              onChange={(date) =>
                                handleChange({
                                  target: { name: "startDate", value: date },
                                })
                              }
                              placeholderText={
                                filter.startDate
                                  ? `${filter.startDate}`
                                  : "¿Cuándo?"
                              }
                              maxDate={filter.endDate}
                              className="outline-none"
                            />
                          </div>
                        </div>

                        <div className=" flex flex-row max-w-full overflow-hidden items-center">
                          <img
                            className="h-[20px] w-[20px] rounded-[20px] max-w-full overflow-hidden"
                            loading="lazy"
                            alt=""
                            src="/1084899-ff5722.png"
                          />

                          <div className="flex flex-col items-start justify-start ml-[10px]  w-[100px]">
                            <div className=" font-medium text-sm">
                              Check-out
                            </div>

                            <DatePicker
                              selected={filter.endDate}
                              onChange={(date) =>
                                handleChange({
                                  target: { name: "endDate", value: date },
                                })
                              }
                              placeholderText={
                                filter.endDate
                                  ? `${filter.endDate}`
                                  : "¿Cuándo?"
                              }
                              minDate={filter.startDate}
                              className="outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <label className="font-medium mb-1 text-sm">Mascotas</label>
                    <input
                      className="w-12 focus:border-none active:border-none"
                      type="number"
                      name="square"
                      value={filter.square}
                      onChange={handleChange}
                      min={1}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <label className="mb-1 text-md">Mascotas</label>
                  <input
                    className="w-12 focus:border-none active:border-none self-center"
                    type="number"
                    name="square"
                    value={filter.square}
                    onChange={handleChange}
                    min={1}
                  />
                </div>

                <label className="text-md mt-1">Ordenar por:</label>
                <select
                  name="orderDirection"
                  onChange={handleChange}
                  className=" bg-transparent focus:outline-none text-chocolate-100 mb-1"
                >
                  <option value="" className="">
                    Ninguno
                  </option>
                  <option value="ASC">Menor precio</option>
                  <option value="DESC">Mayor precio</option>
                </select>

                <label className="text-md mt-1">Precio:</label>
                <div className="flex flex-row">
                  <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] ml-[15px]">
                    <label className="bg-transparent focus:outline-none text-sm text-chocolate-100 ">
                      Mín:
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
                        onChange={handleChange}
                        className="bg-transparent text-chocolate-100 focus:outline-none text-sm w-[60px]"
                      />
                    </a>
                  </div>

                  <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] ml-[15px]">
                    <label className="bg-transparent focus:outline-none text-sm text-chocolate-100 ">
                      Máx:
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
                        onChange={handleChange}
                        className="bg-transparent text-chocolate-100 focus:outline-none text-sm w-[60px]"
                      />
                    </a>
                  </div>
                </div>

                <label className="text-md mt-1">Servicios:</label>
                <div>
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between mb-2 ml-20"
                    >
                      <span className="text-sm">{service.type}</span>
                      <Switch
                        onChange={(checked) =>
                          handleServiceSelection(service.id, checked)
                        }
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

                <a
                  className="text-chocolate-100 text-sm mt-4 hover:underline cursor-pointer flex justify-center"
                  onClick={resetFilter}
                >
                  Limpiar Filtros
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Filtro2;
