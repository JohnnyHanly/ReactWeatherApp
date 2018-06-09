import React from 'react';
import axios from 'axios';
import WeatherDisplay from './weatherdisplay';
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcodeData: [],
      zipcode: "",
      currentWeather: {
        location: "",
        city: "",
        time: "",
        iconURL: "",
        summary: "",
        temp: "",
        humidity: "",
        feelsLike: "",

      },
      hasInit: false,
      isError:false,
      weekForcast: [],

    }
    

  }

  errorHandler(){

    this.setState({
      isError:false
    })
  }

  saveWeatherData() {
    var lat;
    var long;
    var loc;
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=+" + this.state.zipcode + "&key=AIzaSyAudGrHFL9ZVsnV6YSM5LPlY2BvCmZLjT4")
      .then(
        (response) => {

          lat = (response.data.results[0].geometry.location.lat);
          long = (response.data.results[0].geometry.location.lng);
          loc = response.data.results[0].address_components[1].long_name + ", " + response.data.results[0].address_components[3].long_name;
          //daily forcast[1].long_name [3].long_name
          axios.get("https://api.darksky.net/forecast/850f4f0766e6197a7fd29f57c68df157/" + lat + "," + long)
            .then((res) => {


              this.setState({
                currentWeather: {

                  location: loc,
                  time: (res.data.currently.time),
                  iconURL: (res.data.currently.icon),
                  summary: (res.data.currently.summary),
                  temp: (res.data.currently.temperature),
                  humidity: (res.data.currently.humidity),
                  feelsLike: (res.data.currently.apparentTemperature)

                },
                hasInit: true,
                weekForcast: (res.data.daily.data),
                isError:false

              })
            })


        })
      .catch((error) => {
       this.setState({
         isError:true
       })
      })

     

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="text-center title"> <strong>React Weather App! </strong></h1>

          {this.state.hasInit ?

            <WeatherDisplay weekForcast={this.state.weekForcast} currentWeather={this.state.currentWeather}
            />
            : null}



          <div className="inputWrapper d-flex justify-content-center row">

          

            <input className="zipinput float-left" type="text" placeholder="Enter a Zipcode or City Name" value={this.state.zipcode} onChange={(event) => { this.setState({ zipcode: event.target.value }) }} id="zipInput" />
            
          {this.state.isError? (<p id="errorBox"> Invalid Entry. Please try again. </p>):null}



          <button className="btn btn-primary btn-block zipButton float-right" id="zipInput" onClick={this.saveWeatherData.bind(this)}>Generate</button>

         

            
            
          </div>

        </div>
      </div>
    )
  }
}

export default Container;
