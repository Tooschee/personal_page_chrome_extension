import React from 'react';
import moment from 'moment';
import './styles.scss';

const formats = {
  hours: 'H:mm',
  date: 'Mo MMMM'
}

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ date: moment() });
    }, 1000)
  }


  render() {
    const { date } = this.state;
    return (
      <div className="clock">
        <div className="clock__hour">
          {moment(date).format(formats.hours)}
        </div>
        <div className="clock__date">
          {moment(date).format(formats.date)}
        </div>
      </div>
    );
  }
}

export default Clock;
