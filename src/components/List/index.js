import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

class ProposalList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("http://localhost:3001/proposals").then(({ data }) => {
            this.setState({ data });
        });
    }
    //{this.props.pending && this.props.pending.length ? (
    //    this.props.pending.map(pending => {

    render() {
        return (
            <List>
                <Typography variant="headline">Your Contracts</Typography>

                {this.state.data &&
                    this.state.data.map(contract => {
                        return (
                            <div key={contract.id}>
                                <ListItem button>
                                    <ListItemText
                                        primary={
                                            contract.contractName ||
                                            "Contract Name"
                                        }
                                        secondary={contract.creationDate}
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
            </List>
        );
    }
}

export default ProposalList;
