import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './LoginSignup.css';
import {indigo400} from 'material-ui/styles/colors';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  processForm(e) {
    e.preventDefault();

    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;
    const data = {name, email, password}

    const self = this;

    axios.post('/auth/signup', data)
    .then(function (response) {
      self.setState({
        errors: response.data.errors || {}
      });

      localStorage.setItem('successMessage', response.data.message);

      window.location.href = '/login';
    })
    .catch(function (error) {
      const errors = error.response.data.errors ? error.response.data.errors : {};
      errors.summary = error.response.data.message;

      self.setState({
        errors
      });
    });
  }

  render() {
    return (
      <div className="ls__wrapper">
        <Card className="ls__card">
          <form onSubmit={this.processForm}>
            <h2 className="ls__header">Sign Up</h2>

            {this.state.errors.summary && <p className="ls__error">{this.state.errors.summary}</p>}

            <div>
              <TextField
                floatingLabelText="Email"
                name="email"
                errorText={this.state.errors.email}
                onChange={this.handleChange}
                value={this.state.user.email}
                floatingLabelFocusStyle={{color: indigo400}}
                underlineFocusStyle={{borderColor: indigo400}}
              />
            </div>

            <div>
              <TextField
                floatingLabelText="Display Name"
                name="name"
                errorText={this.state.errors.name}
                onChange={this.handleChange}
                value={this.state.user.name}
                floatingLabelFocusStyle={{color: indigo400}}
                underlineFocusStyle={{borderColor: indigo400}}
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
                floatingLabelFocusStyle={{color: indigo400}}
                underlineFocusStyle={{borderColor: indigo400}}
              />
            </div>

            <div>
              <RaisedButton type="submit" label="Create New Account" secondary={true} className="ls__submit-button"/>
            </div>

            <CardText className="ls__cardtext">Already have an account? <Link to={'/login'} className="ls__link-login">Log in</Link></CardText>
          </form>
        </Card>
      </div>
    );
  }
}

export default SignUpPage;