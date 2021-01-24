import React, { Component } from 'react';

class CityWeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div class="container bg-grey-lightest mx-auto shadow rounded pb-4 bg-cover">
                <div class="mt-2 p-4 border-b border-grey-light  text-center">
                    <span class="text-4xl font-thin">Mountain View, US</span>
                    <span class="hidden sm:inline-block align-bottom text-xs">( 94041 )</span>
                </div>
                <div class="text-center text-xl text-grey-light p-4">
                    <span>Fog</span>
                    <span>, fog</span>
                </div>
                <div class="flex justify-center">
                    <div class="text-center p-2">
                        <div class="text-lg text-grey-light">
                            <span class="text-right">45˚F</span>
                            <span class="text-center text-5xl text-white mx-6  font-thin">49˚F</span>
                            <span class="text-left">58˚F</span>
                        </div>
                        <div class="text-grey-light tracking-wide">
                            Saturday | 30 Dec | 10:30pm
              </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CityWeatherCard;