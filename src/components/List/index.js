import React, { Component } from 'react'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import CheckBox from '@material-ui/icons/CheckBox'
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox'
import Tooltip from '@material-ui/core/Tooltip'

class ProposalList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/proposals', {
        headers: {
          token: '4cfe8299-ccdb-4483-9ec1-0f4ddcb08743'
        }
      })
      .then(({ data }) => {
        this.setState({ data })
        console.log({ data })
      })
  }
  render() {
    return (
      <List style={{ width: '700px', marginLeft: '20px' }}>
        <Typography
          variant="headline"
          style={{
            float: 'left',
            paddingBottom: '20px'
          }}
        >
          Your Contract Proposals
        </Typography>
        <div
          style={{
            float: 'right',
            marginRight: '20px'
          }}
        >
          <Tooltip title="Create new contract proposal">
            <Link to={'/form'}>
              <AddIcon />
            </Link>
          </Tooltip>
        </div>
        {this.state.data &&
          this.state.data.map(contract => {
            return (
              <Link
                to={`/proposals/${contract.id}`}
                key={contract.id}
                style={{
                  textDecoration: 'none'
                }}
              >
                <div>
                  <ListItem button>
                    <ListItemText
                      primary={contract.title || 'Contract Proposal Name'}
                      secondary={new Date().toDateString(contract.creationDate)}
                    />
                    {contract.milestones.length &&
                      contract.milestones.map(milestone => {
                        return (
                          <Tooltip
                            key={milestone.id}
                            title={
                              milestone.client.signed &&
                              milestone.client.freelancer
                                ? 'signed'
                                : 'not signed'
                            }
                          >
                            {milestone.client.signed &&
                            milestone.freelancer.signed ? (
                              <CheckBox
                                style={{
                                  color: 'green'
                                }}
                              />
                            ) : (
                              <IndeterminateCheckBox
                                style={{
                                  color: 'grey'
                                }}
                              />
                            )}
                          </Tooltip>
                        )
                      })}
                  </ListItem>
                  <Divider />
                </div>
              </Link>
            )
          })}
      </List>
    )
  }
}

export default ProposalList
