import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleInput = e => {
    this[e.target.name] = e.target.value;
  };
  login = () => {
    console.log(this.id);
    axios
      .post("http://localhost:3001/authentication/login", {
        id: this.id
      })
      .then(resp => console.log("login response: ", resp))
      .catch(err => console.log("Login error", err));
  };

  render() {
    return (
      <FormGroup>
        <Typography variant="headline">Login</Typography>
        <TextField
          name="id"
          onChange={this.handleInput}
          required
          label="Please insert your user id"
        />
        <Button
          style={{ top: "20px", background: "grey" }}
          onClick={this.login}
        >
          Login
        </Button>
      </FormGroup>
    );
  }
}

export default Login;
