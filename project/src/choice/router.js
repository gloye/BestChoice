import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const BCRouter = () => (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );

  export default BCRouter