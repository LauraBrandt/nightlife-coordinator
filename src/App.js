import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CircularProgress from 'material-ui/CircularProgress';
import BarList from './BarList';
import Search from './Search';
import Snackbar from 'material-ui/Snackbar';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = { 
      location: "",
      bars: [],
      numBars: 0,
      loading: false,
      error: false,
      errorMessage: "",
      attendeesPopoverOpen: false,
      popoverAnchorEl: {}
    }

    this.getBars = this.getBars.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleShowPopover = this.handleShowPopover.bind(this);
    this.handleRequestClosePopover = this.handleRequestClosePopover.bind(this);
    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
  }

  componentDidMount() {
    const location = queryString.parse(this.props.location.search).location;
    this.setState({ location });
    if (location) {
      this.getBars(location);
    }
  }

  getBars(location) {
    this.setState({ loading: true });
    axios.get(`/api/bars/${location}`)
      .then(res => {
        if (res.data.error) {
          this.setState({
            error: true,
            errorMessage: res.data.error.description,
            loading: false
          });
        } else {
          this.getAttendees(res.data.businesses)
            .then(bars => {
              this.setState({
                bars,
                numBars: res.data.total,
                loading: false
              });
            });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  getAttendees(barList) {
    return new Promise((resolve,reject) => {
      let barsAndAttendees = [];
      let totalRequests = barList.length;
      let requestsMade = 0;

      if (totalRequests > 0) {
        barList.forEach(bar => {
          axios.get(`/api/attendees/${bar.id}`)
            .then(res => {
              requestsMade += 1;
              const attendees = res.data.attendees;
              barsAndAttendees.push({...bar, attendees: attendees});
              if (requestsMade === totalRequests) {
                resolve(barsAndAttendees);
              }
            })
            .catch(err => {
              requestsMade += 1;
              barsAndAttendees.push({...bar, attendees: []});
              if (requestsMade === totalRequests) {
                resolve(barsAndAttendees);
              }
            });
        });
      }
    });
  }

  /* For Search component */

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();
    window.location.href = `/search?location=${this.state.location}`;
  }

  /* For BarList component */

  handleShowPopover(e) {
    e.preventDefault();

    this.setState({
      attendeesPopoverOpen: true,
      popoverAnchorEl: e.currentTarget,
    });
  }

  handleRequestClosePopover = () => {
    this.setState({
      attendeesPopoverOpen: false,
    });
  };

  /* For Snackbar component */

  handleRequestCloseSnackbar() {
    this.setState({
      error: false,
      errorMessage: ""
    });
  }

  render() {
    return (
      <div className="App">
        <Search 
          handleChange={this.handleLocationChange}
          handleSearch={this.handleSearch} 
          location={this.state.location} 
          disabled={this.state.loading}
        />
        {this.state.loading &&
          <CircularProgress size={60} thickness={5} className="app__progress" style={{display: 'block'}}/>
        }
        {this.state.location && 
          <BarList 
            bars={this.state.bars} 
            handleShowPopover={this.handleShowPopover}
            handleRequestClosePopover={this.handleRequestClosePopover}
            popoverOpen={this.state.attendeesPopoverOpen}
            popoverAnchorEl={this.state.popoverAnchorEl}
          />
        }

        <Snackbar
          open={this.state.error}
          message={this.state.errorMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />
      </div>
    );
  }
}

export default App;
