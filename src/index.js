import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget from './Widget';

window.widget = {
  initialize: (id = 'root', sortBy = 'gold') => {
    ReactDOM.render(
      <Widget sortBy={sortBy} />,
      document.getElementById(id)
    );
  }
};

/*
  1. Install dependencies using "yarn". Run using "yarn start".

  2. Able to Test in the console using "widget.initialize()".
  Defaults to "root" id and "gold" medal sorting if not given any arguments.

  3. 3 external libraries were used:
    a. Axios: HTTP client used to grab API data in convenient manner.
    b. classnames: Simple JavaScript utility for conditionally joining classNames together.
    c. react-spinners: Improves look of error messaging.
*/