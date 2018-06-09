import React from 'react';
import clear from './../styles/weather-icon/clear-sky.png';
import rain from './../styles/weather-icon/drizzling-icon.png';
import cloudy from './../styles/weather-icon/overcast-icon.png';
import snowing from './../styles/weather-icon/snowing-icon.png';
import partlyCloudy from './../styles/weather-icon/partly-cloudy-icon.png';
import windy from './../styles/weather-icon/windy-icon.png';
import partlyCloudyNight from './../styles/weather-icon/partly-cloudy-night-icon.png';
import clearNight from './../styles/weather-icon/clear-night.png';
class WeatherDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    iconSwitcher(img) {
        switch (img) {
            case 'clear-day': return clear; break;
            case 'clear-night': return clearNight; break;
            case 'rain': return rain; break;
            case 'cloudy': return cloudy; break;
            case 'partly-cloudy-day': return partlyCloudy; break;
            case 'partly-cloudy-night': return partlyCloudyNight; break;
            case 'snow': return snow; break;
            case 'wind': return windy; break;
            case 'fog': return null; break;
            case 'clear-night': return clearNight; break;
            default:
                return null; break;

        }


    }
    dayChooser(day) {
        switch (day) {
            case 0: return "Sunday"; break;
            case 1: return "Monday"; break;
            case 2: return "Tuesday"; break;
            case 3: return "Wednesday"; break;
            case 4: return "Thursday"; break;
            case 5: return "Friday"; break;
            case 6: return "Saturday"; break;
            default: return null; break;
        }
    }
    monthChooser(month) {
        switch (month) {
            
            case 0: return "January";
            case 1: return "February";
            case 2: return "March"; 
            case 3: return "April"; 
            case 4: return "May"; 
            case 5: return "June"; 
            case 6: return "July"; 
            case 7: return "August"; 
            case 8: return "September"; 
            case 9: return "October"; 
            case 10: return "November"; 
            case 11: return "December"; 

        }
    }

    render() {
        return (

            <div >
                <div className="border text-center row" id="weatherBox">
                    <p id="date"><i>{this.dayChooser((new Date(this.props.currentWeather.time * 1000).getDay()))}, {this.monthChooser((new Date(this.props.currentWeather.time * 1000).getMonth()))} {new Date(this.props.currentWeather.time * 1000).getDate()} </i> </p>
                    <p id="location"> {this.props.currentWeather.location}  </p>

                    <div className="col-md-6 bigIcom">

                        <img height="45%" width="45%" id="currentIcon" src={this.iconSwitcher(this.props.currentWeather.iconURL)} />
                    </div>
                    <ul>
                    <div className="col float-right" id="currentDesc">
                        <p className="weatherVal1"><span className="weatherDesc1">  Current condition: </span> <em> <strong>{this.props.currentWeather.summary}</strong> </em> </p>
                        <p   className="weatherVal1"> <span className="weatherDesc1">Current temperature: </span> {this.props.currentWeather.temp} &deg;F  </p>  
                        <p  className="weatherVal2"><span className="weatherDesc2">Feels like: </span> {this.props.currentWeather.feelsLike} &deg;F </p>
                        <p  className="weatherVal2"><span className="weatherDesc2"> Humidity: </span> {this.props.currentWeather.humidity} % </p>
    
                    </div>
                    </ul>

                </div>


                <div className="row allTiles">
                    {this.props.weekForcast.map((day, index) =>

                    

                        <div className="col-md-3 border text-center weatherTile">
                            <p id="weekDate"> {this.dayChooser((new Date(day.time * 1000).getDay()))} </p>
                            <p> {day.apparentTemperatureHigh} &deg;F</p>
                            <img height="20%" width="20%" src={this.iconSwitcher(day.icon)} />

                        </div>



                    )
                    }
                </div>

            </div>
        )
    }
}

export default WeatherDisplay;