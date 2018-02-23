import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
      <Card>
        <form onSubmit={this.processForm}>
          <h2>Sign Up</h2>

          {this.state.errors.summary && <p>{this.state.errors.summary}</p>}

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
              floatingLabelText="Display Name"
              name="name"
              errorText={this.state.errors.name}
              onChange={this.handleChange}
              value={this.state.user.name}
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
            <RaisedButton type="submit" label="Create New Account" primary={true} />
          </div>

          <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        </form>
      </Card>
    );
  }
}

export default SignUpPage;