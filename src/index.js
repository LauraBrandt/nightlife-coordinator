import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// muiTheme={getMuiTheme(darkBaseTheme)} (place as prop in MuiThemeProvider)
import './index.css';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Auth from './Auth';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
     <BrowserRouter>
        <div>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/logout' render={() => {
              Auth.deauthenticateUser();
              return <Redirect to='/'/>
            }
          }/>
          <Route path='/' component={App} />
        </div>
     </BrowserRouter>
   </MuiThemeProvider>, 
  document.getElementById('root'));
registerServiceWorker();
