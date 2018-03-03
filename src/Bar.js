import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      popoverAnchorEl: {},
      dialogOpen: false
    }

    this.handleShowPopover = this.handleShowPopover.bind(this);
    this.handleRequestClosePopover = this.handleRequestClosePopover.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleShowPopover(e) {
    e.preventDefault();

    this.setState({
      popoverOpen: true,
      popoverAnchorEl: e.currentTarget,
    });
  }

  handleRequestClosePopover = () => {
    this.setState({ popoverOpen: false });
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleLogin = () => {
    window.location.href = '/login';
  }

  handleSignup = () => {
    window.location.href = '/signup';
  }

  render() {
    const { bar, userId, isAuth } = this.props;

    const actions = [
      <FlatButton
        label="Log In"
        primary={true}
        onClick={this.handleLogin}
      />,
      <FlatButton
        label="Sign Up"
        secondary={true}
        onClick={this.handleSignup}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.handleDialogClose}
      />
    ];

    return (
      <Paper zDepth={2} className="bar__paper">
        <img src={bar.image_url} alt="" className="bar__img"/>
        <div className="bar__info">
          <a href={bar.url} className="bar__name">{bar.name}</a>
          <RaisedButton 
            label={`${bar.attendees.length} Going`}
            primary={true}
            onClick={isAuth ? this.handleShowPopover : this.handleDialogOpen}
          />
          <Popover
            open={this.state.popoverOpen && bar.attendees.length > 0}
            anchorEl={this.state.popoverAnchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClosePopover}
          >
            <Menu>
              {bar.attendees.map(attendee => <MenuItem primaryText={attendee.displayName} key={attendee._id}/>)}
            </Menu>
          </Popover>
          <Dialog
            title="Please Log In"
            actions={actions}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
            You must be logged in to see who's going.
          </Dialog>
          <Checkbox
            label="I'm in!"
            name={bar.id}
            checked={bar.attendees.find( attendee => attendee._id === userId ) ? true : false}
            onCheck={this.props.updateCheckGoing}
            disabled={!isAuth}
          />
        </div>
      </Paper>
    );
  }
}

export default Bar;