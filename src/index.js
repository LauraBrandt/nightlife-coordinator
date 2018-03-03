import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal400, indigo400, grey100, grey50, fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import './index.css';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Auth from './Auth';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    accent1Color: indigo400,
    borderColor: grey50,
    shadowColor: fullWhite,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
     <BrowserRouter>
        <Switch>
          <Route exact path='/login' render={() => {
            const location = localStorage.getItem('currentLocation');
            return !Auth.isUserAuthenticated() ?
              <Login />
              :
              location ? <Redirect to={`/search?location=${location}`}/> : <Redirect to='/'/>
          }}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/logout' render={() => {
              Auth.deauthenticateUser();
              const location = localStorage.getItem('currentLocation');
              return location ? <Redirect to={`/search?location=${location}`}/> : <Redirect to='/'/>
          }}/>
          <Route path='/' component={App} />
        </Switch>
     </BrowserRouter>
   </MuiThemeProvider>, 
  document.getElementById('root'));
registerServiceWorker();
