'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as mainActions from '../actions/mainActions';

import CardComponent from '../components/CardComponent';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = props.mainActions;

    this.state = {
      currentStep: this.props.mainState.currentStep
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentStep: nextProps.mainState.currentStep
    });
  }

  cardFlipped(value, event) {
    const visibleCards = document.getElementsByClassName('card');
    if (event
      && event.currentTarget
      && event.currentTarget.className) {
      event.currentTarget.className = 'card flipped';
      setTimeout(()=>{
        [].map.call(visibleCards, (cardElement)=>{
          if (cardElement.className.indexOf('flipped') !== -1) {
            cardElement.className = 'card flipped disappearing';
          }
          else {
            cardElement.className = 'card disappearing';
          }
        });
        setTimeout(()=>{
          this.actions.setGenre(value);
          this.actions.setNextStep();
        }, 500)
      },500);
    }
  }

  render() {

    const {
      currentStep
    } = this.state;

    return (
      <div className="app-container">

        <div className="card-holder">
          <div className="shelf">&nbsp;</div>

          {currentStep === 1 &&
            <div>
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "comedy")}
                cardTitle="Комедия"
                cardType="genre"
                cardValue="comedy"
              />
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "drama")}
                cardTitle="Драма"
                cardType="genre"
                cardValue="drama"
              />
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "action")}
                cardTitle="Экшен"
                cardType="genre"
                cardValue="action"
              />
            </div>
          }

          {currentStep === 2 &&
          <div>
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "comedy")}
              cardTitle="Комедия"
              cardType="genre"
              cardValue="drama"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "drama")}
              cardTitle="Драма"
              cardType="genre"
              cardValue="action"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "action")}
              cardTitle="Экшен"
              cardType="genre"
              cardValue="comedy"
            />
          </div>
          }

          {currentStep === 3 &&
          <div>
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "comedy")}
              cardTitle="Комедия"
              cardType="genre"
              cardValue="drama"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "drama")}
              cardTitle="Драма"
              cardType="genre"
              cardValue="action"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "action")}
              cardTitle="Экшен"
              cardType="genre"
              cardValue="comedy"
            />
          </div>
          }

          <div className="no-choice">Любой жанр</div>

        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators({
      ...mainActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(AppContainer);