import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'

const weather_api = process.env.REACT_APP_API_KEY;

const Weather = ({ weatherDetail: { current: { temperature, wind_speed, wind_dir, weather_icons } }, name }) => {
  return (
    <>
      <h3>Weather in {name}</h3>
      <div><b>temperature:</b> {temperature} Celcius</div>
      <img alt='weather' className="icon" src={weather_icons[0]}></img>
      <div><b>wind:</b> {wind_speed} mph direction {wind_dir}</div>
    </>
  )
};

const SingleCountry = ({ country = {} }) => {
  const [ weatherDetail, setWeatherDetail ] = useState('');
  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weather_api}&query=${country.capital}`)
      .then(res=> {
        setWeatherDetail(res.data);
      })
  },[])
  return (
    <> 
      <h2>{country.name}</h2>
      <div>captial {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        { country.languages.map( l => (<li key={l.name}>{l.name}</li>))}
      </ul>
      <img alt="flag" className="icon" src={country.flag} />
      {
        weatherDetail? (
          <Weather weatherDetail={weatherDetail} name={country.capital} />
        ) : ''
      }

    </>
  );
}

const CountryColumn = ({ countries }) => {
  const [ openFlag, setOpenFlag ] = useState({});

  const onClickButton = (e) => {
    const index =  e.target.getAttribute('data-index');
    setOpenFlag({
      ...openFlag,
      [index]: true
    });
  }
 return countries.map( (country,index) => (
    <div key={country.name}> 
      <div>{country.name} <button onClick={onClickButton} data-index={index}>show</button></div>
      <div>{ openFlag[index]?  (<SingleCountry country={country} />) : '' }</div>
    </div>
  ));
}

const CountryList = ({ countries }) =>{
  if(countries.length > 10){
    return (<div>Too many matches, specify another filter </div>);
  }else if (countries.length<= 10 && countries.length > 1) {
    return (<CountryColumn countries={countries} />);
  }else if (countries.length === 1){
    return <SingleCountry country={countries[0]}></SingleCountry>
  } else {
    return (<div>No countries</div>)
  }
}

const App = () => {
  const [countries, setCountries ] = useState([]);
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( res => {
        setCountries(res.data);
      })
  }, []);

  const onInputChange = ((e)=>{
    e.preventDefault(); 
    axios
      .get(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
      .then( res =>{
        setCountries(res.data);
      })
  });

  return (
    <div>   
      <div>
        <span>find countries</span>
        <input onChange={onInputChange}  />
      </div>
      <CountryList countries={countries} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
