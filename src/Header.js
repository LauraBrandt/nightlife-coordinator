import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {grey300} from 'material-ui/styles/colors';

const Header = (props) => {
  return (
    <header>
      <nav className="header__nav">
        <div className="header__nav_left">
          <FlatButton 
            label="Home"
            primary={true}
            href="/"
          />
        </div>
        {props.isAuth ? 
          <div className="header__nav_right">
            <FlatButton 
              label="Logout"
              primary={true}
              href="/logout"
            />
          </div>
          :
          <div className="header__nav_right">
            <FlatButton 
              label="Login"
              primary={true}
              href="/login"
            />
            <FlatButton 
              label="Sign up"
              secondary={true}
              href="/signup"
            />
          </div>
        }
      </nav>
      {props.textShowing && !props.loading && <div className="header__text">
        <h1 className="header__h1">Nightlife Coordinator</h1>
        <p style={{color: grey300}}><i className="material-icons">local_bar</i>See what bars people are going to.</p>
        <p style={{color: grey300}}><i className="material-icons">person_pin_circle</i>Then RSVP to your favorite.</p>
      </div>}
    </header>
  );
}

export default Header;