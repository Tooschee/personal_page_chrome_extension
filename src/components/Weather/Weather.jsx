import React from 'react';
import config from 'config';
import './styles.scss';
import cx from 'classnames';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      weather: null
    }

    this.interval = null;
  }

  componentDidMount() {
    this.fetchWeather();
    this.interval = setInterval(() => {
      this.fetchWeather();
    }, config.weather.updateFrequency)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchWeather() {
    const { weather } = config;
    const url = `${weather.url}?q=${weather.location}&appid=${weather.apiKey}&units=${weather.units}&lang=${weather.lang}`;

    fetch(url).then((resp) => resp.json())
      .then((resp) => {
        this.setState({ loading: false, weather: { ...resp } })
      })
      .catch((err) => { console.error('weather problem', err); });
  }

  renderLoading = () => <div className="loading">Loading!</div>

  renderWeather = () => {
    const { weather } = this.state;

    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="weather__temperature">
              {weather.main.temp}
            </div>
            <div className="weather__temperature-celsius">
              &#176;C
            </div>
          </div>
          <div className="column">
            <div className="weather__ico">
              <i className={cx('weather__icon', 'owf', `owf-${weather.weather[0].id}`)} />
            </div>
            <div className="weather__description">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="weather">
        {loading ? this.renderLoading() : this.renderWeather()}
      </div>
    );
  }
}

export default Weather;
