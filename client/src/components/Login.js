import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authenticateUser } from "../services/AuthService";

export default class Login extends Component {
  state = {
    redirect: false,
    error: false
  };

  onSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await authenticateUser(username, password);
      if (this.props.updateAuthenticationState) {
        this.props.updateAuthenticationState(true);
      }
      this.setState({ redirect: true });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  };

  render() {
    const { redirect, error } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Sign in</legend>
            <div class="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter username"
              />
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                autoComplete="current-password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </fieldset>
        </form>
        {error ? <p style={errorStyle}>ERROR: {this.state.error}</p> : ""}
      </React.Fragment>
    );
  }
}

const errorStyle = {
  color: "red"
};
