import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import {grey100, grey400, teal400} from 'material-ui/styles/colors';

const Search = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSearch} className="search__form">
        <TextField
          id="location"
          hintText="New York"
          floatingLabelText="Where are you?"
          value={props.location}
          onChange={props.handleChange}
          disabled={props.disabled}
          className="search__input"
          hintStyle={{color: grey400}}
          inputStyle={{color: grey100}}
          floatingLabelStyle={{color: grey100, fontSize: '1.1em'}}
          floatingLabelFocusStyle={{color: teal400}}
          required
        />
        <RaisedButton
          type="submit"
          primary={true}
          icon={<FontIcon className="material-icons">search</FontIcon>}
          disabled={props.loading}
          className="search__button"
          title="Search"
        />
        {props.loading &&
          <CircularProgress size={60} thickness={5} className="search__progress" />
        }
      </form>
    </div>
  );
}

export default Search;
