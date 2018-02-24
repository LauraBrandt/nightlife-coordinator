import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Header = (props) => {
  return (
    <header>
      {props.isAuth ? 
        <div>
          <RaisedButton 
            label="Logout"
            primary={true}
            href="/logout"
          />
        </div>
        :
        <div>
          <RaisedButton 
            label="Login"
            primary={true}
            href="/login"
          />
          <RaisedButton 
            label="Sign up"
            secondary={true}
            href="/signup"
          />
        </div>
      }
    </header>
  );
}

export default Header;