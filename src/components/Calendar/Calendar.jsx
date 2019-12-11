import React from 'react';
import config from 'config';
import moment from 'moment';
import cx from 'classnames';
import './styles.scss'

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const events = localStorage.getItem('events');

    this.state = {
      events: events ? JSON.parse(events) : [],
    }
  }

  componentDidMount() {
    this.loadGapi();
    this.eventLoop = setInterval(() => {
      this.getCalendarEvents();
    }, config.calendar.updateFrequency);
  }

  componentWillUnmount() {
    clearInterval(this.eventLoop);
  }

  loadGapi = () => {
    if (window.gapi) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          apiKey: config.gapi.apiKey,
          clientId: config.gapi.clientId,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
        }).then(() => {
          this.getCalendarEvents();
        });
      });
    };

    document.body.appendChild(script);
  }

  getCalendarEvents = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      gapi.client.setToken({ access_token: token })

      window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: moment().startOf('day').toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime',
      }).then((response) => {
        const events = response.result.items;
        localStorage.setItem('events', JSON.stringify(events));
        this.setState(prev => ({ ...prev, events }));
      });
    });
  }

  mapDaysAhead = () => {
    const howManydays = 3;
    const today = {
      start: moment().startOf('day'),
      end: moment().endOf('day'),
    };

    return [...Array(howManydays)].map((val, idx) => {
      if (idx === 0) { return today; }
      return {
        start: moment(today.start).add(idx, 'days'),
        end: moment(today.end).add(idx, 'days'),
      };
    });
  }

  mapEventsToDays = () => {
    const { events } = this.state;
    const days = this.mapDaysAhead();

    return days.map((day) => {
      const dayEvents = events.filter(({ start, end }) => {
        const eventStart = moment(start.date || start.dateTime);
        const eventEnd = moment(end.date || end.dateTime);

        return (day.start < eventStart) && (day.end > eventEnd);
      });

      return {
        day,
        events: dayEvents,
      };
    });
  }

  renderEmptyDay = () => (
    <li className="calendar__event calendar__event--empty">
      <i className="far fa-grin calendar__empty-icon" />
    </li>
  )

  renderEvents = events => events.map((event) => {
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;
    const format = 'HH:mm';
    return (
      <li
        key={event.summary}
        className={cx('calendar__event', { 'calendar__event--crossed': moment() > moment(end) })}
      >
        <div className="calendar__event-summary">
          {event.summary}
        </div>
        <div className="calendar__event-time">
          <i className="far fa-clock" />
          {moment(start).format(format)} - {moment(end).format(format)}
        </div>
      </li>
    );
  })

  renderDays = () => {
    const days = this.mapEventsToDays();

    return days.map(({ day, events }) => (
      <div className="columns calendar__day" key={day.start}>
        <div className="column is-one-fifth">
          <p className="calendar__day-number">
            {day.start.format('DD')}
          </p>
        </div>
        <div className="column">
          <ul className="calendar__events">
            {events.length !== 0 ? this.renderEvents(events) : this.renderEmptyDay()}
          </ul>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="calendar" >
          {this.renderDays()}
        </div>
      </div>
    );
  }
}

export default Calendar;
