import React, { Component } from 'react';
import SearchBar from "./searchBar.js";
import WeatherGraph from './weatherGraph.js';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <SearchBar />
                <WeatherGraph />
            </div>
        )
    }
}

export default Home;