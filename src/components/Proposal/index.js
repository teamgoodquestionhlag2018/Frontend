import React, { Component } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Proposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposal: undefined
    };
  }
  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:3001/proposals/${this.props.match.params.id}`, {
  //       headers: {
  //         token: "4cfe8299-ccdb-4483-9ec1-0f4ddcb08743"
  //       }
  //     })
  //     .then(({ data }) => {
  //       this.setState(
  //         {
  //           proposal: data
  //         },
  //         () => console.log("Current state", this.state)
  //       );
  //     })
  //     .catch(err => console.log("error", err));
  // }

  async componentDidMount() {
    try {
      const proposal = await axios.get(
        `http://localhost:3001/proposals/${this.props.match.params.id}`,
        {
          headers: {
            token: "4cfe8299-ccdb-4483-9ec1-0f4ddcb08743"
          }
        }
      );
      console.log(proposal);
      this.setState({ proposal: proposal.data }, () => {
        console.log("Current state: ", this.state);
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  handleClick = async (person, id) => {
    if (person === "client") {
      try {
        const proposalNew = await axios.put(
          `http://localhost:3001/milestones/${id}/client/sign`,
          { signed: true },
          {
            headers: {
              token: "4cfe8299-ccdb-4483-9ec1-0f4ddcb08743"
            }
          }
        );
        this.setState({
          proposal: proposalNew.data
        });
        // this.setState({ signed: true });
      } catch (error) {
        console.log("Error in client signature", error);
      }
    } else if (person === "freelancer") {
      try {
        const proposalNew = await axios.put(
          `http://localhost:3001/milestones/${id}/freelancer/sign`,
          true,
          {
            headers: {
              token: "4cfe8299-ccdb-4483-9ec1-0f4ddcb08743"
            }
          }
        );
        this.setState({ proposal: proposalNew.data });
        // this.setState({ signed: true });
      } catch (error) {
        console.log("Error in freelancer signature", error);
      }
    }
  };

  render() {
    // const proposal = this.state.proposal ? this.state.proposal : null;
    // console.log(proposal);
    // return proposal ? (
    if (!this.state.proposal) {
      return null;
    } else {
      const proposal = this.state.proposal ? this.state.proposal : null;
      return (
        <div style={{ padding: "4rem" }}>
          <Card style={{ padding: "3em", maxWidth: "80%" }}>
            <CardContent style={{ marginBottom: "4em" }}>
              <Typography color="textSecondary">Proposal:</Typography>
              <Typography
                variant="headline"
                component="h1"
                style={{ marginBottom: "2em" }}
              >
                {proposal.title}
              </Typography>
              <Typography variant="body1" component="p">
                This Freelance Contract is entered into and made effective as of{" "}
                {
                  // Format date
                }
                {proposal.creationDate}, by and between the client{" "}
                {proposal.client.name} ("Client") and the contractor{" "}
                {proposal.freelancer.name} (“Freelancer”).
              </Typography>
              <Typography variant="body1" component="p">
                {" "}
                Both parties agree as follows:
              </Typography>
              <Typography variant="subheading" style={{ marginTop: "10px" }}>
                Description of the Services:
              </Typography>
              <Typography variant="subheading">{proposal.summary}</Typography>
              <Typography
                variant="title"
                component="h2"
                style={{ margin: "2em 0 1em" }}
              >
                Milestones
              </Typography>
              {proposal.milestones &&
                proposal.milestones.map((milestone, index) => {
                  return (
                    <List key={index} component="ul">
                      <Typography variant="subheading">
                        Milestone {index + 1}
                      </Typography>
                      <ListItem>
                        <ListItemText
                          primary="Requirement"
                          secondary={milestone.requirement}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Deadline"
                          secondary={milestone.deadline}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Price"
                          secondary={milestone.price}
                        />
                      </ListItem>
                      {milestone.client.signed ? (
                        <Typography style={{ color: "green" }}>
                          {milestone.client} (client) signed
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() =>
                            this.handleClick("client", milestone.id)
                          }
                        >
                          Client: sign milestone
                        </Button>
                      )}
                      {milestone.freelancer.signed ? (
                        <Typography style={{ color: "green" }}>
                          {milestone.freelancer} (freelancer) signed
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() =>
                            this.handleClick("freelancer", milestone.id)
                          }
                        >
                          Freelancer: sign milestone
                        </Button>
                      )}
                    </List>
                  );
                })}
              <Typography
                variant="title"
                component="h2"
                style={{ margin: "2em 0 1em" }}
              >
                Payment Terms/Schedule
              </Typography>
              <Typography variant="body1" component="p">
                At the moment of acceptance of the contract the payment of the
                milestone will be automatically transferred from the Client's
                accountto a holding account. When a milestone has been
                completed, the money will be automatically transferred to the
                account of the Freelancer. Either party has the right to
                terminate this agreement after every milestone.
              </Typography>
              <Typography
                variant="title"
                component="h2"
                style={{ margin: "2em 0 1em" }}
              >
                Terms and Conditions
              </Typography>
              <Typography variant="body1" component="p">
                This Freelance Contract is governed by the terms and conditions
                stated in the contract.
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
    // ) : null;
  }
}

export default Proposal;
