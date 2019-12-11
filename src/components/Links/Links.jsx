import React from 'react';
import config from 'config';

class Links extends React.Component {
  renderColumns = () => Object.keys(config.links).map(group => (
    <div className="column" key={group}>
      {this.renderLinks(group)}
    </div>
  ))

  renderLinks = group => config.links[group].map(({ name, link }, index) => (
    <a
      className="button is-primary is-fullwidth margin-vertical is-title-case is-outlined"
      rel="noopener noreferrer"
      href={link}
      key={index}
    >
      {name}
    </a>
  ))

  render() {
    return (
      <div className="columns">
        {this.renderColumns()}
      </div>
    );
  }
}

export default Links;
