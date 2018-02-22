import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const Search = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSearch}>
        <label htmlFor="location">Where are you?</label>
        <TextField
          id="location"
          hintText="New York"
          value={props.location}
          onChange={props.handleChange}
          disabled={props.disabled}
          className="search__input"
          required
        />
        <RaisedButton
          type="submit"
          primary={true}
          icon={<FontIcon className="material-icons">search</FontIcon>}
          disabled={props.disabled}
        />
        {/* <IconButton iconClassName="material-icons" tooltip="Search">search</IconButton> */}
      </form>
    </div>
  );
}

export default Search;
