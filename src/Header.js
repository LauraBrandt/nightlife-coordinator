import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {grey400} from 'material-ui/styles/colors';

const Header = (props) => {
  return (
    <header>
      <nav className="header__nav">
        {props.isAuth ? 
          <div>
            <FlatButton 
              className="header__nav-button"
              label="Logout"
              primary={true}
              href="/logout"
            />
          </div>
          :
          <div>
            <FlatButton 
              className="header__nav-button"
              label="Login"
              primary={true}
              href="/login"
            />
            <FlatButton 
              className="header__nav-button"
              label="Sign up"
              secondary={true}
              href="/signup"
            />
          </div>
        }
      </nav>
      {props.textShowing && !props.loading && <div className="header__text">
        <h1 className="header__h1">Nightlife Coordinator</h1>
        <p style={{color: grey400}}><i className="material-icons">local_bar</i>See what bars people are going to.</p>
        <p style={{color: grey400}}><i className="material-icons">person_pin_circle</i>Then RSVP to your favorite.</p>
      </div>}
    </header>
  );
}

export default Header;