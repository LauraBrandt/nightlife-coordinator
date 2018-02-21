import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ location: nextProps.location });
  }

  handleChange(e) {
    this.setState({ location: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.location);
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="location">Where are you?</label>
          <TextField
            id="location"
            hintText="New York"
            value={this.state.location}
            onChange={this.handleChange}
            disabled={this.props.disabled}
            className="search__input"
            required
          />
          <RaisedButton
            type="submit"
            primary={true}
            icon={<FontIcon className="material-icons">search</FontIcon>}
            disabled={this.props.disabled}
          />
          {/* <IconButton iconClassName="material-icons" tooltip="Search">search</IconButton> */}
        </form>
      </div>
    );
  }
}

export default Search;
