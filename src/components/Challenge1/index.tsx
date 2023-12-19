import { useState } from 'react'
import './style.scss'
import axios, { Canceler } from 'axios';

const apiInstance = axios.create({ baseURL: 'https://api.openweathermap.org' })
const CancelToken = axios.CancelToken
let cancelCurrentApiCall: Canceler

type SearchData = {
  location: string,
  longitude: string,
  latitude: string,
  weather: string,
  humidity: string,
  temperature: string
  'feels-like': string
}

const searchWeather = (search: string) => {
  return new Promise<SearchData>((resolve, reject) => {
    cancelCurrentApiCall?.('Cancel Current API Call.');
    apiInstance.get('/data/2.5/weather', {
      params: {
        APPID: '3c58f347a044d7b975ca3fbf77e748fd',
        q: search
      },
      cancelToken: new CancelToken((cancelSource) => { cancelCurrentApiCall = cancelSource })
    }).then(
      (response) => {
        // console.log(response?.data)
        const { sys, name, coord, weather, main } = response.data;
        resolve({
          location: `${name}, ${sys?.country}`,
          longitude: coord?.lon,
          latitude: coord?.lat,
          weather: `${weather?.[0]?.main}, ${weather?.[0]?.description}`,
          humidity: `${main?.humidity}%`,
          temperature: `${Math.floor((main?.temp - 32) * 5/9)}℃`,
          'feels-like': `${Math.floor((main?.feels_like - 32) * 5/9)}℃`
        });
      }
    ).catch(
      (error) => {
        if (error.code !== 'ERR_CANCELED') {
          reject(error)
        }
      }
    )
  })
}

const displayData = (object: SearchData) => {
  const list = []
  let property: keyof typeof object
  for (property in object) {
    list.push(
      <p key={property} className="details-wrapper">
        <span className="name">{property.replace(/-/ig, ' ')}</span>
        <span className="value">{object[property]}</span>
      </p>
    )
  }
  return list
}

const Component = () => {
  const [search, setSearch] = useState<string>('')
  const [searchData, setSearchData] = useState<SearchData | 'No Available Data.' | null>()

  const handelSearchChange = (event: React.ChangeEvent & { target: HTMLInputElement }) => {
    setSearch(event.target.value)
  };

  const handelSearch = async(event: React.MouseEvent | React.KeyboardEvent) => {
    if (search && (event.type === 'click' || (event.type === 'keyup' && (event as React.KeyboardEvent).code === 'Enter'))) {
      try {
        const response = await searchWeather(search)
        setSearchData(response)
      } catch(error) {
        setSearchData('No Available Data.')
      }
    }
  };

  return (
    <div id='component-1'>
      <div id="search-wrapper">
        <input id="search-input" type="text" name="search-input" placeholder="Search Weather Via Location" autoFocus onChange={handelSearchChange} onKeyUp={handelSearch}/>
        <button id="search-button" onClick={handelSearch}>Search</button>
      </div>

      {
        (searchData) ? (
          <div id="search-data">
            {(searchData !== 'No Available Data.') ? displayData(searchData) : <p className="no-data">{searchData}</p>}
          </div>
        ) : null
      }
    </div>
  )
}

export default Component
