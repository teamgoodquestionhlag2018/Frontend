import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      error: false,
      newMilestone: false
    };
  }
  isEmpty = val => {
    if (val == null || val === "") {
      return true;
    } else {
      return false;
    }
  };
  addMilestone = () => {
    this.setState({
      newMilestone: true
    });
  };
  handleInput = e => {
    this[e.target.name] = e.target.value;
  };
  sendData = () => {
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
      // data of second milestone is not sent to server
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
          milestone: [
            {
              price: this.milestonePrice,
              requirements: this.milestoneRequirements,
              dueDate: this.milestoneDeadline
            }
          ]
        })
        .then(resp => {
          console.log("Server response data", resp.data.id);
          this.setState({
            proposalId: resp.data.id
          });
        })

        .catch(err => console.log("Error ", err));
    }
  };
  render() {
    return this.state.proposalId ? (
      <Redirect to={`/proposals/${this.state.proposalId}`} />
    ) : (
      <div>
        <Typography variant="headline">Create contract proposal</Typography>
        <FormGroup style={{ width: "700px" }}>
          <TextField
            name="companyName"
            onChange={this.handleInput}
            required
            label="Company name"
          />
          <TextField
            name="companyStreet"
            onChange={this.handleInput} // required
            label="Street"
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

          <TextField
            name="contractSummary"
            onChange={this.handleInput} // required
            label="Summary"
          />
          <Typography variant="subheading" style={{ marginTop: "20px" }}>
            Milestone 1
          </Typography>

          <TextField
            name="milestoneRequirements"
            onChange={this.handleInput}
            required
            label="Requirements"
            multiline={true}
            rows={1}
            rowsMax={5}
          />
          <TextField
            type="date"
            name="milestoneDeadline"
            onChange={this.handleInput}
            required
            label="Due date"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            name="milestonePrice"
            onChange={this.handleInput}
            required
            label="Price"
          />
          {this.state.newMilestone && (
            <FormGroup>
              <Typography variant="subheading" style={{ marginTop: "20px" }}>
                Milestone 2
              </Typography>

              <TextField
                name="milestone2Requirements"
                onChange={this.handleInput}
                label="Requirements"
                multiline={true}
                rows={1}
                rowsMax={5}
              />
              <TextField
                type="date"
                name="milestone2Deadline"
                onChange={this.handleInput}
                label="Due date"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                name="milestone2Price"
                onChange={this.handleInput}
                label="Price"
              />
            </FormGroup>
          )}

          <Button
            onClick={this.addMilestone}
            size="small"
            style={{
              width: "200px",
              marginTop: "10px",
              background: "lightGrey"
            }}
          >
            Add more milestones
          </Button>

          <Snackbar
            open={this.state.error}
            message="Please fill in all required fields"
          />
          <Button style={{ top: "20px" }} onClick={this.sendData}>
            Create proposal
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default Form;
