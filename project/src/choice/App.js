import React, { PureComponent } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Topic from "./pages/topic";
import Question from "./pages/question";
import Choice from "./pages/choice";

class App extends PureComponent {
  constructor() {
    super();
    this.createApp = this.createApp.bind(this);
    this.state = {
      currentItem: null,
      item: {
        title: "Kindle",
        children: [
          {
            title: "是否经常阅读",
            id: 1,
            children: [
              {
                title: "是",
                target: 2
              },
              {
                title: "否",
                target: 101
              }
            ]
          },
          {
            title: "常阅读什么书",
            id: 2,
            children: [
              {
                title: "工具书,教材",
                target: 101
              },
              {
                title: "小说,文学",
                target: 3
              }
            ]
          }
        ],
        choices: [
          {
            title: "平板电脑",
            id: 101
          },
          {
            title: "入门版",
            id: 102
          },
          {
            title: "Paperwhite",
            id: 103
          },
          {
            title: "Voyage",
            id: 104
          },
          {
            title: "Oasis 2",
            id: 105
          }
        ]
      }
    };
  }
  /* 新建一个项目 */
  createApp() {
    this.setState({
      currentItem: {}
    });
  }
  /* 新建一个主题 */
  createTitle(title) {
    const { currentItem } = this.state;
    if (!_.isPlainObject(currentItem)) return;
    currentItem.title = title;
    this.setState(currentItem);
  }

  /* 新建一个问题 */
  createQuestion(question) {
    const { currentItem } = this.state;
    let { children } = currentItem;
    if (!_.isArray(children)) {
      children = [];
    }
    const child = {
      title: question,
      id: children.length
    };
    currentItem.children = children
    this.setState(currentItem)
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">返回首页</Link>
            </li>
            <li>
              <Link to="/topic" onClick={this.createApp}>
                创建问卷
              </Link>
            </li>
          </ul>
          <hr />
          <Route
            exact
            path="/topic"
            render={props => (
              <Topic
                createTitle={title => this.createTitle(title)}
                {...props}
              />
            )}
          />  
          <Route
            exact
            path="/question"
            render={props => (
              <Question topicTitle={this.state.currentItem.title} {...props} />
            )}
          />
          <Route exact path="/choice" component={Choice} />
        </div>
      </Router>
    );
  }
}

export default App;
