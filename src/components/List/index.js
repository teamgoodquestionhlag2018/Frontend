import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

class ProposalList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get("http://localhost:3001/proposals").then(({ data }) => {
      this.setState({ data });
      console.log(data);
    });
  }
  render() {
    return (
      <List style={{ width: "700px" }}>
        <Typography
          variant="headline"
          style={{
            float: "left"
          }}
        >
          Your Contracts
        </Typography>
        <div
          style={{
            float: "right",
            marginRight: "20px"
          }}
        >
          <Tooltip title="Create new contract">
            <Link to={"/form"}>
              <Button variant="fab" color="secondary">
                <AddIcon />
              </Button>
            </Link>
          </Tooltip>
        </div>
        {this.state.data &&
          this.state.data.map(contract => {
            var dateNumber = parseInt(contract.creationDate);
            return (
              <Link
                to={`/proposals/${contract.id}`}
                key={contract.id}
                style={{
                  textDecoration: "none"
                }}
              >
                <div>
                  <ListItem button>
                    <ListItemText
                      primary={contract.title || "Contract Name"}
                      secondary={new Date(dateNumber).toLocaleDateString()}
                    />
                  </ListItem>
                  <Divider />
                </div>
              </Link>
            );
          })}
      </List>
    );
  }
}

export default ProposalList;
