import React from 'react'
import axios from 'axios';
import logo from'./img/brabus.jpg'
function App() {
  const[location,setLocation]=React.useState('');
  const[data,setData]=React.useState({})
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b2d9e9e37240e79dd8eb2d19c21408e`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    axios.get(url).then(response=>{
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }
}
  return (
  <section >
  <div className="container py-2 ">
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-md-10 col-lg-8 col-xl-6">
        <div className="card" >
          <div className="card-img" >
            <img src={logo}
              className=" img img-fluid w-100" alt="weather" />
            <div className="mask"></div>
          </div>
          <div className="card-img-overlay text-dark p-5">
            <h4 className="mb-0 text-center"><input className='form-control' value={location}onChange={event => setLocation(event.target.value)}onKeyPress={searchLocation} placeholder='Enter Location'type="text" /></h4>
            <p className="display-2 my-3 text-light">{data.name}</p>
            <h1 className="display-2 my-3 text-light">{data.main ? (data.main.feels_like-273.15).toFixed() +' °C': null}</h1>
            <p className="display-2 my-3 text-light description">
            {(() => {
              if(data.weather){
                if(data.weather[0].main==='Clouds'){
                  return (<>Clouds<i className='bi bi-clouds '></i></>)
                }else if(data.weather[0].main==='Clear'){
                  return (<>Clear<i class="bi bi-brightness-high"></i></>)
                }
              }
              
              return null;
            })()}
            </p>
          </div>
          {data.name !== undefined &&
             <div className="bottom text-light">
               <div className="feels ">
                 {data.main ? <p className='bold text-warning'>{(data.main.feels_like-273.15).toFixed()}°C</p> : null}
                 <p>Feels Like</p>
               </div>
               <div className="humidity">
                 {data.main ? <p className='bold text-warning' >{data.main.humidity}%</p> : null}
                 <p>Humidity</p>
               </div>
               <div className="wind">
                 {data.wind ? <p className='bold text-warning'>{data.wind.speed.toFixed()} MPH</p> : null}
                 <p>Wind Speed</p>
               </div>
             </div>
           }
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

export default App;
