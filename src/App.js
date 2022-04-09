import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city: 'İstanbul',
    country: 'TR',
    temperature: '',
    humidity: '',
    minTemperature: '',
    weatherIcons: '10d'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (city) => {
    try {
      const APIKEY = '6b0e4ea973e10d1911a9a50a1158c23b'
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon
      })
    } catch (error) {
      console.log('API not loaded correctly')
    }

  }
  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (

    <main>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            value={search}
            type='text'
            name='city'
            placeholder='Şehir Adı Giriniz...'
            onChange={handleChange}
          />
          <button for='city'>Ara</button>
        </form>
        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
                <img alt='weather icon' src={'https://openweathermap.org/img/wn/' + allData.weatherIcons + '@2x.png'} />
                <h1 className='title'>{allData.city}</h1>
                <h2 className='location'>{allData.country}</h2>

                <div className='weather-description'>
                  <div>
                    <h3>NEM</h3>
                    <p>{allData.humidity}%</p>
                  </div>
                  <div>
                    <h3>Sıcaklık</h3>
                    <p>{allData.temperature}°C</p>
                  </div>
                  <div>
                    <h3>En Düşük Sıcaklık</h3>
                    <p>{allData.minTemperature}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
