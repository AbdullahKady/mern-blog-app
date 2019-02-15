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
      if (!message) {
        message = "Something went wrong, please try again later.";
      }
      this.setState({ error: message });
    }
  };

  render() {
    const { redirect, error } = this.state;
    let alert = undefined;
    if (this.props.location && this.props.location.state)
      alert = this.props.location.state.alert;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              alert: {
                header: "Welcome!",
                message: "You have been logged in successfully.",
                type: "success"
              }
            }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {alert && (
          <div className={`alert alert-dismissible alert-${alert.type}`}>
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <strong>{alert.header}</strong>
            {" " + alert.message}
          </div>
        )}
        {error && (
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Oops!</strong>
            {" " + error}
          </div>
        )}
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
      </React.Fragment>
    );
  }
}
