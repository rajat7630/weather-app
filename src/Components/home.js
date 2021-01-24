import React, { Component } from 'react';
import SearchBar from "./searchBar.js";
import CityWeatherCard from './cityWeatherCard';
import WeatherGraph from './weatherGraph.js';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherCard: false,
            weatherData: {},
        };
        this.updateWeatherData = this.updateWeatherData.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }
    deleteCard = (data) => {
        this.setState({
            weatherCard: false
        })
    }
    updateWeatherData = (data) => {
        this.setState({
            weatherCard: true,
            weatherData: data
        });
    }
    render() {
        let dataCard = (this.state.weatherCard) ? < CityWeatherCard weatherData={this.state.weatherData} deleteCard={() => this.deleteCard()} /> : (null);
        return (
            <div>
                <SearchBar
                    updateWeatherData={(data) => {
                        this.updateWeatherData(data);
                    }}
                />
                {dataCard}
                <WeatherGraph />
            </div>
        )
    }
}

export default Home;