'use strict';

import React from 'react';

const MovieCardComponent = props => {

  return (
    <div
      className={
        "movie-card"
        + (props.movieCardEmpty ? " empty" : "")
        + (props.movieCardInfo && !props.movieCardInfo.poster_path ? " no-picture" : "")
      }
      onClick={props.movieCardAction ? props.movieCardAction : null}
    >
      {props.movieCardInfo && props.movieCardInfo.poster_path &&
        <img src={"https://image.tmdb.org/t/p/w300/" + props.movieCardInfo.poster_path.slice(1)}/>
      }
      {props.movieCardInfo && !props.movieCardInfo.poster_path && props.movieCardInfo.title &&
        <div className="movie-title-wo-picture">{props.movieCardInfo.title}</div>
      }
    </div>
  );
};

export default MovieCardComponent;