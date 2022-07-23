import axios from "axios";
import React, { useState, useEffect } from "react";
import { getCityInfo, getTodayDateStr } from "./datesUtils";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "./api";
import "./SearchWeather.scss";
import { ResultsOperation } from "./ResultsOperation";

const SearchWeather = ({ submitSearch }) => {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState("");
  const [msg, setMsg] = useState("");
  const [coord, setCoord] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [apiInfo, setApiInfo] = useState({ icon: "", temp: "", city: "" });


  useEffect(() => {
    if (!response) return;
    const cordinates = response?.coord;
    if (!cordinates) return;
    if (!cordinates.lat && !cordinates.lon) return;
    const cordinatesString = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d9457.92593552301!2d${cordinates.lon}!3d${cordinates.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sde!4v1656549565428!5m2!1sen!2sde`;
    setCoord(cordinatesString);
  }, [response]);

  async function onSubmit(e) {
    e.preventDefault();
    console.log(process.env.REACT_APP_URL);
    if (!city || city === "") return;

    const URL = `${process.env.REACT_APP_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    try {
      const response = await axios.get(URL); 
      setResponse(response.data);
      setMsg("Exitoso"); //
      console.log(response.data, "respuesta del servidor");
      setCity("");
      setDateStr(getTodayDateStr());
      const cityInfo = await getCityInfo(response.data);
      console.log("cityInfo ", cityInfo);
      setApiInfo({ ...cityInfo });
    } catch (error) {
      setMsg("Esa ciudad no existe "); 
    }
  }

  const loadOptions = async (inputValue) => {

    const url = `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`;
    const response = await fetch(url, geoApiOptions);
    const res = await response.json();
    const options = res.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));

    return { options };
  };

  const handleChangeCity = (searchCity) => {
    console.log("searchCity ", searchCity);
    setCity(searchCity.label);
  };

  return (
    <div>
      <form className="search-bar" onSubmit={onSubmit}>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search for location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <AsyncPaginate
          placeholder={city}
          debounceTimeout={800}
          value={city}
          className="list-select"
          onChange={handleChangeCity}
          loadOptions={loadOptions}
        />
        <button type="submit" className="search-bar__button" onClick={onSubmit}>
          SEARCH
        </button>
        <p>{msg}</p>
      </form>
      <br />
      <ResultsOperation
        msg={msg}
        coord={coord}
        dateStr={dateStr}
        apiInfo={apiInfo}
      />

    </div>
  );
};

export default SearchWeather;
