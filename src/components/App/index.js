import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "../Form";
import List from "../List";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route exact path="/" component={List} />
            <Route path="/form" component={Form} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
