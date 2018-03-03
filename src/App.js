import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Header from './Header';
import Search from './Search';
import BarList from './BarList';
import Snackbar from 'material-ui/Snackbar';
import './App.css';
import Auth from './Auth';

class App extends Component {
  constructor() {
    super()

    this.state = { 
      isAuthenticated: false,
      userId: "",
      location: "",
      bars: [],
      numBars: 0,
      loading: false,
      snackbarOpen: false,
      snackbarMessage: "",
    }

    this.getBars = this.getBars.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRequestCloseSnackbar = this.handleRequestCloseSnackbar.bind(this);
    this.updateUserGoing = this.updateUserGoing.bind(this);
  }

  componentDidMount() {
    const location = queryString.parse(this.props.location.search).location || '';
    localStorage.setItem('currentLocation', location);

    const userId = localStorage.getItem('userID')

    this.setState({ 
      location,
      userId,
      isAuthenticated: Auth.isUserAuthenticated(), 
    });

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
            snackbarOpen: true,
            snackbarMessage: res.data.error.description,
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
      let totalRequests = barList.length;
      let requestsMade = 0;

      if (totalRequests > 0) {
        barList.forEach((bar, index) => {
          axios.get(`/api/attendees/${bar.id}`)
            .then(res => {
              requestsMade += 1;
              barList[index].attendees = res.data.attendees;
              if (requestsMade === totalRequests) {
                resolve(barList);
              }
            })
            .catch(err => {
              requestsMade += 1;
              barList[index].attendees = [];
              if (requestsMade === totalRequests) {
                resolve(barList);
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

  updateUserGoing(e) {
    e.preventDefault();

    const barID = e.target.name;
    const userID = this.state.userId;

    axios.put(`/api/attendees/${barID}/${userID}`)
      .then(res => {
        const barName = this.state.bars.find(bar => bar.id === res.data.bar.yelpID).name
        this.getAttendees(this.state.bars)
          .then(bars => {
            this.setState({
              bars,
              snackbarOpen: true,
              snackbarMessage: res.data.action === "add" ?
                `You're going to ${barName}!` :
                `You're no longer going to ${barName}.`
            });
          });
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data);
      });

  }

  /* For Snackbar component */

  handleRequestCloseSnackbar() {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: ""
    });
  }

  render() {
    return (
      <div className="App">
        <Header 
          isAuth={this.state.isAuthenticated} 
          textShowing={this.state.bars.length === 0} 
          loading={this.state.loading}
        />
        <Search 
          handleChange={this.handleLocationChange}
          handleSearch={this.handleSearch} 
          location={this.state.location || ""} 
          loading={this.state.loading}
        />
        {this.state.location && 
          <BarList 
            bars={this.state.bars} 
            userId={this.state.userId}
            isAuth={this.state.isAuthenticated}
            updateUserGoing={this.updateUserGoing}
          />
        }

        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestCloseSnackbar}
        />
      </div>
    );
  }
}

export default App;
