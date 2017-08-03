'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('main container mounted');
  }

  cardFlipped(event) {
    if (event
      && event.currentTarget
      && event.currentTarget.className) {
      if (event.currentTarget.className.indexOf('flipped') === -1) {
        event.currentTarget.className = 'card flipped';
      }
      else {
        event.currentTarget.className = 'card';
      }
    }
  }

  render() {

    return (
      <div>
        <div className="card" onClick={this.cardFlipped.bind(this)}>
          <div className="card-face">
            <div className="card-face__corner top-right">&nbsp;</div>
            <div className="card-face__corner top-left">&nbsp;</div>
            <div className="card-face__corner bottom-right">&nbsp;</div>
            <div className="card-face__corner bottom-left">&nbsp;</div>
            <div className="card-face__center">
              <div className="comedy-icon">&nbsp;</div>
            </div>
            <div className="card-face__title">
              Посмеяться
            </div>
          </div>
          <div className="card-back">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(AppContainer);