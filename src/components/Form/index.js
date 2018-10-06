import React, { Component } from "react";
import axios from "axios";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  isEmpty = val => {
    console.log(val);
    if (val == null || val === "") {
      return true;
    } else {
      return false;
    }
  };
  handleInput = e => {
    console.log(e.target.name, ": ", e.target.value);
    this[e.target.name] = e.target.value;
  };
  sendData = () => {
    console.log(this.companyName);
    console.log(this.milestonePrice);
    console.log(this.milestoneDeadline);
    console.log(this.milestoneRequirements);

    if (
      // this.isEmtpy(this.freelancerName) ||
      this.isEmpty(this.companyName) ||
      this.isEmpty(this.milestonePrice) ||
      this.isEmpty(this.milestoneRequirements) ||
      this.isEmpty(this.milestoneDeadline)
    ) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      });
      axios
        .post("http://localhost:3001/proposals", {
          freelancer: "John",
          client: this.companyName,
          companyAddress: {
            street: this.companyStreet,
            city: this.companyCity,
            country: this.companyCountry
          },
          contractTitle: this.contractTitle,
          contractSummary: this.contractSummary,
          milestones: [
            {
              price: this.milestonePrice,
              requirements: this.milestoneRequirements,
              dueDate: this.milestoneDeadline
            }
          ]
        })
        .then(resp => console.log("Server response", resp.data))
        .catch(err => console.log("Error ", err));
    }
  };
  render() {
    return (
      <div>
        <Typography variant="headline">Create contract proposal</Typography>
        <FormGroup>
          <TextField
            name="companyName"
            onChange={this.handleInput}
            required
            label="Company name"
          />
          <TextField
            name="companyStreet"
            onChange={this.handleInput} // required
            label="Address"
          />
          <TextField
            name="companyCity"
            onChange={this.handleInput} // required
            label="City"
          />
          <TextField
            name="companyContry"
            onChange={this.handleInput} // required
            label="Country"
          />
          <TextField
            name="contractTitle"
            onChange={this.handleInput} // required
            label="Contract title"
          />
          <div>
            <TextField
              name="contractSummary"
              onChange={this.handleInput} // required
              label="Summary"
            />
            <Typography variant="subheading">Milestone</Typography>
            <TextField
              name="milestoneRequirements"
              onChange={this.handleInput}
              required
              label="Requirements"
            />
            <TextField
              name="milestoneDeadline"
              onChange={this.handleInput}
              required
              label="Due date"
            />
            <TextField
              name="milestonePrice"
              onChange={this.handleInput}
              required
              label="Price"
            />
          </div>
          <Snackbar
            open={this.state.error}
            message="Please fill in all required fields"
          />
          <Button onClick={this.sendData}>Create proposal</Button>
        </FormGroup>
      </div>
    );
  }
}

export default Form;
