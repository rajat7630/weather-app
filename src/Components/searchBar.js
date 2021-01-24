import React, { Component } from 'react';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: "",
            weatherStatus: {}
        }
        this.suggestionHandler = this.suggestionHandler.bind(this)
    }
    suggestionHandler = async () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.queryString}&appid=eb9219860969f10dd7bfc2d91212ad98`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    weatherStatus: data
                })
                console.log(data)
                this.props.updateWeatherData(data);
            });
    }
    render() {
        return (
            <div className="w-full px-10 flex bg-blue-500 p-4">
                <div className="flex-1 flex">
                    <input

                        placeholder="Enter a place"
                        type="text"
                        onChange={(eve) => {
                            this.setState({
                                queryString: eve.target.value
                            })
                        }}
                        className="text-xl w-3/6 px-4 outline-none py-1 text-gray-900 rounded-full"
                    />
                    <button
                        className="bg-blue-800 text-white focus:outline-none rounded-full text-xl outline-none mx-4 px-4 py-1"
                        onClick={(eve) => {
                            console.log(eve);
                            this.suggestionHandler();
                        }}
                    >
                        Search
                    </button>
                </div>
                <div className="float-right">
                    <button
                        className="bg-blue-800 text-white focus:outline-none rounded-full text-xl outline-none mx-4 px-4 py-1"

                        onClick={(eve) => {
                            let currLocation = (pos) => {
                                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=eb9219860969f10dd7bfc2d91212ad98`)
                                    .then(res => res.json())
                                    .then(data => {
                                        this.setState({
                                            weatherStatus: data
                                        })
                                        console.log(data);
                                        this.props.updateWeatherData(data);
                                    });
                                console.log(pos);
                            }
                            navigator.geolocation.getCurrentPosition(currLocation);
                        }}
                    >
                        Current Weather
                        </button>
                </div>
            </div >
        )
    }
}

export default SearchBar;