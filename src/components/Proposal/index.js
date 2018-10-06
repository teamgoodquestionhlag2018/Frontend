import React, { Component } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class Proposal extends Component {
  state = {
    proposal: {},
    signed: false
  }
  async componentDidMount() {
    try {
      const proposal = await axios.get(
        `http://localhost:3001/proposals/${this.props.match.params.id}`
      )
      console.log(this.proposal)
      this.setState({ proposal })
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = async () => {
    try {
      await axios.post(
        `http://localhost:3001/proposals/${this.state.proposal.data.id}/sign`
      )
      this.setState({ signed: true })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const proposal = this.state.proposal.data ? this.state.proposal.data : null
    return proposal ? (
      <div style={{ padding: '4rem' }}>
        <Card style={{ padding: '3em', maxWidth: '50%' }}>
          <CardContent style={{ marginBottom: '4em' }}>
            <Typography color="textSecondary">Proposal:</Typography>
            <Typography
              variant="headline"
              component="h1"
              style={{ marginBottom: '2em' }}
            >
              The name of proposal
              {proposal.name}
            </Typography>
            <Typography variant="body1" component="p">
              This Freelance Contract is entered into and made effective as of{' '}
              {
                // Format date
              }
              {new Date().toDateString(proposal.creationDate)}, by and between:
              {proposal.client.name}, the client ("Client"),
              {proposal.freelancer.name}, the contractor (“Freelancer”). Both
              parties agree as follows:
            </Typography>
            {/* <Typography variant="title">Description of the Services</Typography>
        {proposal.description} */}
            <Typography
              variant="title"
              component="h2"
              style={{ margin: '2em 0 1em' }}
            >
              Milestone
            </Typography>
            <List component="ul">
              <ListItem>
                <ListItemText
                  primary="Requirements"
                  secondary={proposal.milestone.requirements}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Deadline"
                  secondary={new Date().toDateString(proposal.milestone.deadline)}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Price"
                  secondary={proposal.milestone.price}
                />
              </ListItem>
            </List>
            <Typography
              variant="title"
              component="h2"
              style={{ margin: '2em 0 1em' }}
            >
              Payment Terms/Schedule
            </Typography>
            <Typography variant="body1" component="p">
              At the moment of acceptance of the contract the payment of the
              milestone will be automatically transfered to a holding account
              from the Client account. When the milestone has been completed the
              money will be automatically transfered to the account of the
              Freelancer. Either party has the right to terminate this agreement
              after every milestone.
            </Typography>
            <Typography
              variant="title"
              component="h2"
              style={{ margin: '2em 0 1em' }}
            >
              Terms and Conditions
            </Typography>
            <Typography variant="body1" component="p">
              This Freelance Contract is governed by the terms and conditions
              stated in the contract.
            </Typography>
          </CardContent>
          <CardActions>
            {!this.state.signed ? (
              <Button variant="contained" onClick={this.handleClick}>
                Sign the contract
              </Button>
            ) : (
              <Button variant="outlined" disabled>
                The contract is signed
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    ) : null
  }
}

export default Proposal
