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
            });
    }
    render() {
        return (
            <div>
                <div>
                    <input
                        placeholder="Enter a place"
                        type="text"
                        onChange={(eve) => {
                            this.setState({
                                queryString: eve.target.value
                            })
                        }}
                        className="text-xl text-gray-900 rounded-xl"
                    />
                    <button
                        onClick={(eve) => {
                            console.log(eve);
                            this.suggestionHandler();
                        }}
                    >
                        Search
                </button>
                </div>
                <div>
                    <button
                        onClick={(eve) => {
                            let currLocation = (pos) => {
                                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=eb9219860969f10dd7bfc2d91212ad98`)
                                    .then(res => res.json())
                                    .then(data => {
                                        this.setState({
                                            weatherStatus: data
                                        })
                                        console.log(data)
                                    });
                                console.log(pos);
                            }
                            navigator.geolocation.getCurrentPosition(currLocation);
                        }}
                    >
                        Current Weather
                </button>
                </div>
            </div>
        )
    }
}

export default SearchBar;