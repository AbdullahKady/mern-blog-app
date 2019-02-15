import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostsList from "./components/PostsList";
import CreatePost from "./components/CreatePost";
import withAuth from "./hocs/withAuth";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
class App extends Component {
  state = {
    isAuthenticated: Boolean(localStorage.getItem("token"))
  };

  updateAuthenticationState = isAuthenticated => {
    this.setState({ isAuthenticated });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.updateAuthenticationState(false);
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <React.Fragment>
          <NavBar isAuthenticated={isAuthenticated} onLogout={this.logout} />
          <div style={{ marginTop: "30px" }} className="container jumbotron">
            <Route exact path="/" component={HomePage} />
            <Route path="/posts" component={withAuth(PostsList)} />
            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={() => (
                <Login
                  updateAuthenticationState={this.updateAuthenticationState}
                />
              )}
            />
            <Route path="/create" component={withAuth(CreatePost)} />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
