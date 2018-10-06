import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Form from '../Form'
import List from '../List'
import Proposal from '../Proposal'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={List} />
          <Route path="/form" component={Form} />
          <Route path="/proposal/:id" component={Proposal} />
        </div>
      </Router>
    )
  }
}

export default App
