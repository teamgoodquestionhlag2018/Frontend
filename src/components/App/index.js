import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Form from '../Form'
import List from '../List'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={List} />
          <Route path="/form" component={Form} />
        </div>
      </Router>
    )
  }
}

export default App
