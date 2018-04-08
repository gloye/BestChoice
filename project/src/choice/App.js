import React, { PureComponent } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Topic from "./pages/topic";
import Question from "./pages/question";
import Choice from "./pages/choice";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.createApp = this.createApp.bind(this);
    this.state = {
      currentItem: null
    };
  }

  componentWillMount = () => {
    // 读取本地存储
    const currentItem = JSON.parse(localStorage.getItem("currentItem"));
    if (!!currentItem) {
      this.setState({
        currentItem
      });
    } else {
      this.createApp();
    }
  };

  /* 新建一个项目 */
  createApp() {
    localStorage.removeItem('currentItem')
    this.setState({
      currentItem: {}
    });
  }

  /* 新建一个主题 */
  createTitle(title) {
    const currentItem = _.cloneDeep(this.state.currentItem);
    if (!_.isPlainObject(currentItem)) return;
    currentItem.title = title;
    this.setState({ currentItem });
    localStorage.setItem("currentItem", JSON.stringify(currentItem));
  }

  /* 新建一个问题 */
  createQuestion(question) {
    const currentItem = _.cloneDeep(this.state.currentItem);
    let { children } = currentItem;
    if (!_.isArray(children)) {
      children = [];
    }
    const child = {
      title: question,
      id: children.length,
      children: [
        {
          title: "是"
        },
        {
          title: "否"
        }
      ]
    };
    children.push(child);
    currentItem.children = children;
    this.setState({ currentItem: currentItem });
    localStorage.setItem("currentItem", JSON.stringify(currentItem));
  }

  /* 新建一个答案 */
  createAnswer(answer) {
    const currentItem = _.cloneDeep(this.state.currentItem);
    let { choices } = currentItem;
    if (!_.isArray(choices)) {
      choices = [];
    }
    const choice = {
      title: answer,
      id: choices.length + 100
    };
    choices.push(choice);
    currentItem.choices = choices;
    this.setState(currentItem);
    localStorage.setItem("currentItem", JSON.stringify(currentItem));
  }

  render() {
    const Nav = () => <Link to="/topic" onClick={this.createApp}>创建问卷</Link>;
    const NotFound = () => <h1>404 Not Found</h1>;
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/topic"
              render={props => (
                <Topic
                  createTitle={title => this.createTitle(title)}
                  {...props}
                />
              )}
            />
            <Route
              path="/question"
              render={props => (
                <Question
                  currentItem={this.state.currentItem}
                  createQuestion={e => {
                    this.createQuestion(e);
                  }}
                  {...props}
                />
              )}
            />
            <Route path="/choice" component={Choice} />
            <Route exact path="/" component={Nav} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
