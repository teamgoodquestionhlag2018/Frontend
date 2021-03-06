import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "../Form";
import List from "../List";
import Proposal from "../Proposal";
import MenuComponent from "../Menu";
import Login from "../Login";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Login /> */}
        <Router>
          <div style={{ display: "flex" }}>
            <MenuComponent />
            <div>
              <Route exact path="/" component={List} />
              <Route path="/form" component={Form} />
              <Route path="/proposals/:id" component={Proposal} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
