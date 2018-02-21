import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Bar extends Component {
  constructor() {
    super()

    this.state = { 
      popoverOpen: false,
      popoverAnchorEl: {}
    }

    this.handleShowPopover = this.handleShowPopover.bind(this);
    this.handleRequestClosePopover = this.handleRequestClosePopover.bind(this);
  }

  handleShowPopover(e) {
    e.preventDefault();

    this.setState({
      popoverOpen: true,
      popoverAnchorEl: e.currentTarget,
    });
  }

  handleRequestClosePopover = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  render() {
    const {
      bar
    } = this.props;
    return (
      <Paper zDepth={2} className="bar__paper">
        <img src={bar.image_url} alt="" className="bar__img"/>
        <div className="bar__info">
          <a href={bar.url} className="bar__name">{bar.name}</a>
          <RaisedButton 
            label={`${bar.attendees.length} Going`}
            primary={true}
            onClick={this.handleShowPopover}
          />
          <Popover
            open={this.state.popoverOpen && bar.attendees.length > 0}
            anchorEl={this.state.popoverAnchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClosePopover}
          >
            <Menu>
              {bar.attendees.map(user => <MenuItem primaryText={user} key={user}/>)}
            </Menu>
          </Popover>
          {/* <RaisedButton 
            label="Going" 
            secondary={true} 
            className="results__is-going-button" 
            onClick={this.props.toggleUserGoing}
          /> */}
        </div>
      </Paper>
    );
  }
}

export default Bar;