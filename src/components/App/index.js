import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "../Form";
import ProposalList from "../List";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={ProposalList} />
                    <Route path="/form" component={Form} />
                </div>
            </Router>
        );
    }
}

export default App;
