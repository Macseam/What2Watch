'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import * as mainActions from '../actions/mainActions';

import CardComponent from '../components/CardComponent';
import MovieCardComponent from '../components/MovieCardComponent';

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.actions = props.mainActions;

    this.state = {
      currentStep: this.props.mainState.currentStep,
      moviesList: {},
      randomMoviesList: {}
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentStep: nextProps.mainState.currentStep
    });
    if ((this.state.currentStep !== nextProps.mainState.currentStep) && nextProps.mainState.currentStep === 4) {
      this.actions.getMoviesList(this.setParams(nextProps));
    }
    if (_.isEmpty(this.state.moviesList)
      && !_.isEmpty(nextProps.mainState.moviesList)
      && nextProps.mainState.moviesList.total_pages
    ) {
      let randomPage = Math.round(0.5 + Math.random() * (nextProps.mainState.moviesList.total_pages));
      if ((randomPage > 1) && (randomPage === nextProps.mainState.moviesList.total_pages)) {
        randomPage = randomPage - 1;
      }
      this.actions.getRandomMovies({params: this.setParams(nextProps), randomPage});
      this.setState({
        moviesList: nextProps.mainState.moviesList
      });
    }
    if (!_.isEmpty(nextProps.mainState.randomMoviesList) && !_.isEmpty(nextProps.mainState.randomMoviesList.results)){
      this.setState({
        randomMoviesList: _.shuffle(nextProps.mainState.randomMoviesList.results)
      });
    }
  }

  setParams(nextProps) {
    let params = {};
    switch (nextProps.mainState.genre) {
      case 'comedy':
        params['with_genres'] = '35';
        break;
      case 'drama':
        params['with_genres'] = '18,10749';
        break;
      case 'action':
        params['with_genres'] = '28,12';
        break;
      default:
        break;
    }

    switch (nextProps.mainState.date) {
      case 'old':
        params['release_date.lte'] = '2015-01-01';
        break;
      case 'new':
        params['release_date.gte'] = '2015-01-01';
        break;
      case 'fresh':
        params['release_date.gte'] = '2017-01-01';
        break;
      default:
        break;
    }

    switch (nextProps.mainState.fame) {
      case 'unknown':
        params['vote_count.lte'] = '700';
        break;
      case 'known':
        params['vote_count.gte'] = '700';
        break;
      case 'popular':
        params['vote_average.gte'] = '5';
        break;
      default:
        break;
    }
    return params;
  }

  cardFlipped(type, value, event) {
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
          this.actions['set' + type](value);
          this.actions.setNextStep();
        }, 500)
      },500);
    }
  }

  noValueClicked() {
    const visibleCards = document.getElementsByClassName('card');
    [].map.call(visibleCards, (cardElement)=>{
      if (cardElement.className.indexOf('flipped') !== -1) {
        cardElement.className = 'card flipped disappearing';
      }
      else {
        cardElement.className = 'card disappearing';
      }
    });
    setTimeout(()=>{
      this.actions.setNextStep();
    }, 500);
  }

  movieCardClicked() {
    console.log(123);
  }

  refreshRandomMovies() {
    let randomPage = Math.round(0.5 + Math.random() * (this.props.mainState.moviesList.total_pages));
    if ((randomPage > 1) && (randomPage === this.props.mainState.moviesList.total_pages)) {
      randomPage = randomPage - 1;
    }
    this.actions.getRandomMovies({params: this.setParams(this.props), randomPage});
  }

  render() {

    const {
      currentStep,
      randomMoviesList
    } = this.state;

    return (
      <div className="app-container">

        <div className="card-holder">
          <div className="shelf">&nbsp;</div>

          {currentStep === 1 &&
            <div>
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "Genre", "comedy")}
                cardTitle="Комедия"
                cardType="genre"
                cardValue="comedy"
              />
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "Genre", "drama")}
                cardTitle="Драма"
                cardType="genre"
                cardValue="drama"
              />
              <CardComponent
                cardAction={this.cardFlipped.bind(this, "Genre", "action")}
                cardTitle="Экшен"
                cardType="genre"
                cardValue="action"
              />
            </div>
          }

          {currentStep === 2 &&
          <div>
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Date", "old")}
              cardTitle="Старое"
              cardType="date"
              cardValue="old"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Date", "new")}
              cardTitle="Недавнее"
              cardType="date"
              cardValue="new"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Date", "fresh")}
              cardTitle="Новое"
              cardType="date"
              cardValue="fresh"
            />
          </div>
          }

          {currentStep === 3 &&
          <div>
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Fame", "unknown")}
              cardTitle="Малознакомое"
              cardType="fame"
              cardValue="unknown"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Fame", "known")}
              cardTitle="Известное"
              cardType="fame"
              cardValue="known"
            />
            <CardComponent
              cardAction={this.cardFlipped.bind(this, "Fame", "popular")}
              cardTitle="Рейтинговое"
              cardType="fame"
              cardValue="popular"
            />
          </div>
          }

          {currentStep === 4 && this.props.mainState.loading &&
            <div>
              <MovieCardComponent movieCardEmpty={true} movieCardInfo={null} />
              <MovieCardComponent movieCardEmpty={true} movieCardInfo={null} />
              <MovieCardComponent movieCardEmpty={true} movieCardInfo={null} />
            </div>
          }

          {currentStep === 4 && !this.props.mainState.loading && !_.isEmpty(randomMoviesList) &&
          <div>
            {_.map(randomMoviesList.slice(0,3), (movieInfo, index)=>{
              return (
                <MovieCardComponent
                  key={index}
                  movieCardAction={this.movieCardClicked.bind(this)}
                  movieCardInfo={movieInfo}
                />
              );
            })}
          </div>
          }

          {currentStep === 1 &&
          <div className="no-choice" onClick={this.noValueClicked.bind(this)}>Любой жанр</div>
          }

          {currentStep === 2 &&
          <div className="no-choice" onClick={this.noValueClicked.bind(this)}>За всё время</div>
          }

          {currentStep === 3 &&
          <div className="no-choice" onClick={this.noValueClicked.bind(this)}>Любые оценки</div>
          }

          {currentStep === 4 &&
          <div className="no-choice" onClick={this.refreshRandomMovies.bind(this)}>Еще варианты</div>
          }

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