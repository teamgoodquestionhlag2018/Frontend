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
      milestones: [1]
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
      milestones: [
        ...this.state.milestones,
        this.state.milestones[this.state.milestones.length - 1] + 1
      ]
    });
  };
  handleInput = e => {
    this[e.target.name] = e.target.value;
  };
  composeMilestones = milestones => {
    let milestonesArray = [];
    milestones.map(item => {
      const milestonePrice = "milestone" + item + "Price";
      const milestoneRequirements = "milestone" + item + "Requirements";
      const milestoneDeadline = "milestone" + item + "Deadline";
      if (
        this.isEmpty(this[milestonePrice]) &&
        this.isEmpty(this[milestoneRequirements]) &&
        this.isEmpty(this[milestoneDeadline])
      ) {
        return milestonesArray;
      } else {
        return (milestonesArray = [
          ...milestonesArray,
          {
            price: this[milestonePrice],
            requirements: this[milestoneRequirements],
            dueDate: this[milestoneDeadline]
          }
        ]);
      }
    });
    return milestonesArray;
  };

  sendData = () => {
    if (
      this.isEmpty(this.companyName) ||
      this.isEmpty(this.milestone1Price) ||
      this.isEmpty(this.milestone1Requirements) ||
      this.isEmpty(this.milestone1Deadline)
    ) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      });
      const milestonesArray = this.composeMilestones(this.state.milestones);
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
          milestones: milestonesArray
        })
        .then(resp => {
          console.log("Server response data", resp.data);
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
      <div style={{ width: "700px" }}>
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
            onChange={this.handleInput}
            required
            label="Street"
          />
          <TextField
            name="companyCity"
            onChange={this.handleInput}
            required
            label="City"
          />
          <TextField
            name="companyContry"
            onChange={this.handleInput}
            required
            label="Country"
          />
          <TextField
            name="contractTitle"
            onChange={this.handleInput}
            required
            label="Contract title"
          />

          <TextField
            name="contractSummary"
            onChange={this.handleInput}
            required
            label="Description"
          />

          {this.state.milestones &&
            this.state.milestones.map(milestone => {
              return (
                <div key={milestone}>
                  <Typography
                    variant="subheading"
                    style={{ marginTop: "20px" }}
                  >
                    Milestone {milestone}
                  </Typography>

                  <TextField
                    style={{ width: "347px", marginRight: "10px" }}
                    name={`milestone${milestone}Requirements`}
                    onChange={this.handleInput}
                    required={milestone === 1 ? true : false}
                    label="Requirements"
                  />
                  <TextField
                    style={{ marginRight: "10px" }}
                    type="date"
                    name={`milestone${milestone}Deadline`}
                    onChange={this.handleInput}
                    required={milestone === 1 ? true : false}
                    label="Due date"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    name={`milestone${milestone}Price`}
                    onChange={this.handleInput}
                    required={milestone === 1 ? true : false}
                    label="Price"
                  />
                </div>
              );
            })}

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

          <Button
            style={{ top: "20px", background: "grey" }}
            onClick={this.sendData}
          >
            Create proposal
          </Button>
        </FormGroup>
        <Snackbar
          style={{ left: "700px", top: "20px" }}
          open={this.state.error}
          message="Please fill in all required fields"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </div>
    );
  }
}

export default Form;
