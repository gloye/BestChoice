import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import App from './App'
import Topic from './pages/topic'
import Question from './pages/question'
import Choice from './pages/choice'

const BCRouter = () => (
    <Router>
      <div>
        <Route exact path="/app" component={App} />
        <Route path="/topic" component={Topic} />
        <Route path="/question/:id" component={Question} />
        <Route path="/choice/:id" component={Choice} />
      </div>
    </Router>
  );

  export default BCRouter