import React, { Component } from 'react';
import SearchBar from "./searchBar.js";
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
            </div>
        )
    }
}

export default Home;