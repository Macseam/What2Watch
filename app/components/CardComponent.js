'use strict';

import React from 'react';

const CardComponent = props => {

  return (
    <div className="card" onClick={props.cardAction}>
      <div className="card-face">
        <div className="card-face__corner top-right">&nbsp;</div>
        <div className="card-face__corner top-left">&nbsp;</div>
        <div className="card-face__corner bottom-right">&nbsp;</div>
        <div className="card-face__corner bottom-left">&nbsp;</div>
        <div className="card-face__center">
          <div className={props.cardType + '-' + props.cardValue + '-icon'}>&nbsp;</div>
        </div>
        <div className="card-face__title">
          {props.cardTitle}
        </div>
      </div>
      <div className="card-back">&nbsp;</div>
    </div>
  );
};

export default CardComponent;