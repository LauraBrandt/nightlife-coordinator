import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from './Auth';
import './LoginSignup.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    let successMessage = localStorage.getItem('successMessage') || '';
    if (successMessage) {
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  processForm(e) {
    e.preventDefault();

    const email = this.state.user.email;
    const password = this.state.user.password;
    const data = {email, password};

    const self = this;

    axios.post('/auth/login', data)
    .then(function (response) {
      self.setState({
        errors: response.data.errors || {}
      });

      Auth.authenticateUser(response.data.token);

      localStorage.setItem('userID', response.data.user.id);

      const currLocation = sessionStorage.getItem('currentLocation');
      if (currLocation) {
        window.location.href = `/search?location=${currLocation}`;
      } else {
        window.location.href = '/';
      }
    })
    .catch(function (error) {
      const errors = error.response.data.errors ? error.response.data.errors : {};
      errors.summary = error.response.data.message;

      self.setState({
        errors
      });
    });
  }

  handleChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="ls__wrapper">
        <Card className="ls__card">
          <form onSubmit={this.processForm}>
            <h2 className="ls__header">Login</h2>

            {this.state.successMessage && <p className="ls__success">{this.state.successMessage}</p>}
            {this.state.errors.summary && <p className="ls__error">{this.state.errors.summary}</p>}

            <div>
              <TextField
                floatingLabelText="Email"
                name="email"
                errorText={this.state.errors.email}
                onChange={this.handleChange}
                value={this.state.user.email}
              />
            </div>

            <div>
              <TextField
                floatingLabelText="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
                errorText={this.state.errors.password}
                value={this.state.user.password}
              />
            </div>

            <div>
              <RaisedButton type="submit" label="Log in" primary={true} className="ls__submit-button"/>
            </div>

            <CardText className="ls__cardtext">Don't have an account? <Link to={'/signup'} className="ls__link-create">Create one</Link>.</CardText>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
