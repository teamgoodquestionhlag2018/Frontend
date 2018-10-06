import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

class ProposalList extends Component {
    render() {
        return (
            <List>
                <Typography variant="headline">Your Contracts</Typography>
                <ListItem button>
                    <ListItemText primary="Proposal Name" />
                </ListItem>
            </List>
        );
    }
}

export default ProposalList;
