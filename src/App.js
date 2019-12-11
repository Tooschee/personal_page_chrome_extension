import React from 'react';
import 'sass/index.scss';
import Links from 'components/Links/Links';
import Todos from 'components/Todos/Todos';
import Clock from 'components/Clock/Clock';
import Weather from 'components/Weather/Weather';
import Notes from 'components/Notes/Notes';
import Calendar from 'components/Calendar/Calendar';
import Loading from 'components/_shared/Loading/Loading'
import { signIn } from 'services/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    signIn()
      .then(() => { this.setState({ loggedIn: true }); })
      .catch(() => {
        this.setState({ loggedIn: true });
        throw Error(`${this.constructor.name}: sign in went wrong`);
      });
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <>
        <div className="container">
          <div className="level">
            <h1 className="head-1">Main</h1>
          </div>
          <div className="columns">
            <div className="column">
              <div className="container">
                <Links />
              </div>
            </div>
            <div className="column">
              <div className="container">
                <Clock />
              </div>
              <div className="container">
                <Weather />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="level">
                <h1 className="head-1">Calendar</h1>
              </div>
              <Calendar />
            </div>
            <div className="column">
              <div className="container">
                <div className="level">
                  <h1 className="head-1">Todo's</h1>
                </div>
                {loggedIn ? <Todos /> : <Loading />}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="head-1">Notes</h1>
        </div>
        <div className="columns">
          <div className="column">
            <div className="container">
              <Notes />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
