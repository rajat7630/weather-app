import React, { Component } from 'react';
import Chart from 'chart.js';
class WeatherGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourlyWeatherStatus: []
        }
        this.chartRef = React.createRef();
    }
    componentDidMount() {
        let currLocation = (pos) => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=eb9219860969f10dd7bfc2d91212ad98`)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        hourlyWeatherStatus: [...data.hourly].slice(0, 24)
                    })
                    console.log(this.state)
                    this.barGraph = new Chart(this.chartRef.current, {
                        type: 'bar',
                        data: {
                            labels: this.state.hourlyWeatherStatus.map(temp => { return temp.dt }),
                            datasets: [{
                                label: 'degree C',
                                data: this.state.hourlyWeatherStatus.map(temp => { return temp.temp-273 }),
                                borderWidth: 1,
                                barThickness:15,
                                backgroundColor:'yellow',
                            }]
                        }
                    })
                });
        }
        navigator.geolocation.getCurrentPosition(currLocation);


    }

    render() {
        let ctx=(this.state.hourlyWeatherStatus.length>0)?<canvas  ref={this.chartRef}   className="canvas" />:null;
        return (
            <div>
                {ctx}
            </div>
        )
    }
}

export default WeatherGraph;