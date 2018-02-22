import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const Bar = (props) => {
  return (
    <Paper zDepth={2} className="bar__paper">
      <img src={props.bar.image_url} alt="" className="bar__img"/>
      <div className="bar__info">
        <a href={props.bar.url} className="bar__name">{props.bar.name}</a>
        <RaisedButton 
          label={`${props.bar.attendees.length} Going`}
          primary={true}
          onClick={props.handleShowPopover}
        />
        <Popover
          open={this.state.popoverOpen && props.bar.attendees.length > 0}
          anchorEl={this.state.popoverAnchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={props.handleRequestClosePopover}
        >
          <Menu>
            {props.bar.attendees.map(user => <MenuItem primaryText={user} key={user}/>)}
          </Menu>
        </Popover>
        {/* <RaisedButton 
          label="Going" 
          secondary={true} 
          className="results__is-going-button" 
          onClick={props.toggleUserGoing}
        /> */}
      </div>
    </Paper>
  );
}

export default Bar;