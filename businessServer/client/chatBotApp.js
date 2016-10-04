import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.css';

// Import Components
import Main from './components/Main';
import SingleForm from './components/SingleForm';


//import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// import store, { history } from '.store';


const router = (

// <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
  
    </Route>
  </Router>
//<Provider>

)

render(router, document.getElementById('root'));
