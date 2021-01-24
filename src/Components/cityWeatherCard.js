import React, { Component } from 'react';

class CityWeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            available: true
        }
        this.getDate = this.getDate.bind(this);
        this.addZero = this.addZero.bind(this);
    }
    addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    getDate = (sec) => {
        let d = new Date(sec * 1000);
        var h = this.addZero(d.getHours());
        var m = this.addZero(d.getMinutes());
        var s = this.addZero(d.getSeconds());
        return h + ":" + m + ":" + s;

    }
    render() {
        let card = (this.props.weatherData.cod === 200) ? (<div className=" border-blue-800 border-2 rounded-xl  bg-blue-300 mx-6 mt-6">
            <button onClick={this.props.deleteCard} className="text-blue-800 outline-none focus:outline-none pr-4 pt-3 font-bold float-right">X</button>
            <div className="mt-2 p-4 border-b border-grey-light  text-center">
                <span className="text-4xl font-thin">{this.props.weatherData.name}, {this.props.weatherData.sys.country}</span>
                <span className="hidden sm:inline-block align-bottom text-xs">( {this.props.weatherData.id} )</span>
                <div className="text-white align-center tracking-wide">
                    Sunrise : {this.getDate(this.props.weatherData.sys.sunrise)} | Sunset : {this.getDate(this.props.weatherData.sys.sunset)}
                </div>
            </div>
            <div className="text-center text-xl text-grey-light p-4">
                <span>{this.props.weatherData.weather[0].description}</span>
            </div>
            <div className="flex justify-center">
                <div className="text-center p-2">
                    <div className="text-lg text-grey-light">
                        <span className="text-right">{(this.props.weatherData.main.temp_min - 273).toFixed(1)}˚C</span>
                        <span className="text-center text-5xl text-white mx-6  font-thin">{(this.props.weatherData.main.temp - 273).toFixed(1)}˚C</span>
                        <span className="text-left">{(this.props.weatherData.main.temp_max - 273).toFixed(1)}˚C</span>
                    </div>
                    <div className="text-blue-600 tracking-wide">
                        Wind  : {this.props.weatherData.wind.speed} | Visibility  : {this.props.weatherData.visibility} | Cloud  : {this.props.weatherData.clouds.all}
                    </div>
                </div>
            </div>
        </div>) : (<div className="bg-red-300 border border-red-600 mx-12 mt-6 rounded-xl text-red-900 ">
            <strong className="font-bold text-xl">Oops!</strong>
            <span className="text-xl"> Unable to find Location</span>
            
            <button onClick={this.props.deleteCard} className="text-red-900 outline-none focus:outline-none pr-5 font-bold float-right">X</button>
        </div>);
        return (
            <>
                {card}
            </>
        )
    }
}
export default CityWeatherCard;