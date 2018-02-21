import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CircularProgress from 'material-ui/CircularProgress';
import BarList from './BarList';
import Search from './Search';
import Snackbar from 'material-ui/Snackbar';
import './App.css';

// const BARDATA = [
//   {
//     yelpID: "foundation-raleigh",
//     attendees: ["Laura Brandt", "Martina Enlo"]
//   }
// ];

class App extends Component {
  constructor() {
    super()

    this.state = { 
      location: "",
      bars: [],
      numBars: 0,
      loading: false,
      error: false,
      errorMessage: ""
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.getBars = this.getBars.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
  }

  componentDidMount() {
    const location = queryString.parse(this.props.location.search).location;
    this.setState({ location });
    if (location) {
      this.getBars(location);
    }
  }

  handleSearch(location) {
    window.location.href = `/search?location=${location}`;
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

  handleRequestCloseSnackbar() {
    this.setState({
      error: false,
      errorMessage: ""
    });
  }

  render() {
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch} location={this.state.location} disabled={this.state.loading}/>
        {this.state.loading &&
          <CircularProgress size={60} thickness={5} className="app__progress" style={{display: 'block'}}/>
        }
        {this.state.location && <BarList bars={this.state.bars} />}

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
