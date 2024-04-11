import React from "react";
import { WeatherDataT, getWeatherIcon, formatDay, fetchWeather } from "./utils";

const LOCAL_STORAGE_KEY = "classy-weather-location";

class LocationInput extends React.Component<{
  location: string;
  onLocationChange: React.ChangeEventHandler<HTMLInputElement>;
}> {
  render(): React.ReactNode {
    return (
      <input
        type="text"
        placeholder="Search from location..."
        value={this.props.location}
        onChange={this.props.onLocationChange}
      ></input>
    );
  }
}

class WeatherDay extends React.Component<{
  date: string;
  max: number;
  min: number;
  code: number;
  key: string;
  isToday: boolean;
}> {
  render(): React.ReactNode {
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

class Weather extends React.Component<{
  location: string;
  weather: WeatherDataT;
}> {
  render(): React.ReactNode {
    const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = this.props.weather;
    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <WeatherDay date={date} max={max[i]} min={min[i]} code={codes[i]} key={date} isToday={i === 0} />
          ))}
        </ul>
      </div>
    );
  }
}

class ClassyWeather extends React.Component {
  // 以下写法不推荐，仅供参考
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     location: '',
  //     isLoading: false,
  //     displayLocation: '',
  //     weatherData: null as WeatherDataT | null,
  //   };
  //   this.handleLocationChange = this.handleLocationChange.bind(this);
  // }
  // handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   this.setState({ location: event.target.value });
  // }

  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weatherData: null as WeatherDataT | null,
  };

  handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ location: event.target.value });
  };

  async handleGetWeather() {
    if (this.state.location.length < 2) return this.setState({ weather: {} });
    this.setState({ isLoading: true });
    try {
      const res = await fetchWeather(this.state.location);
      if (!res) return;
      this.setState({
        displayLocation: res.displayLocation,
        weatherData: res.weatherData,
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount(): void {
    this.setState({
      location: localStorage.getItem(LOCAL_STORAGE_KEY) || "",
    });
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{ location: string }>) {
    if (prevState.location !== this.state.location) {
      localStorage.setItem(LOCAL_STORAGE_KEY, this.state.location);
      await this.handleGetWeather();
    }
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <LocationInput location={this.state.location} onLocationChange={this.handleLocationChange}></LocationInput>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {!this.state.isLoading && this.state.weatherData?.time && (
          <Weather weather={this.state.weatherData} location={this.state.displayLocation} />
        )}
      </div>
    );
  }
}

export default ClassyWeather;
