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

  render() {

    return (
      <div>main container</div>
    );
  }
}

export default connect(state => state)(AppContainer);