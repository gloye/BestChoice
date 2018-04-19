import React, { PureComponent } from "react";
import _ from "lodash";
import localforage from "localforage";
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

  componentDidMount = () => {
    // 读取本地存储
    localforage
      .getItem("currentItem")
      .then(data => {
        if (!!data) {
          this.setState({ currentItem: data });
        } else {
          this.createApp();
        }
      })
      .catch(err => console.log(err));
  };

  /* 新建一个项目 */
  createApp() {
    localforage.removeItem("currentItem");
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
    localforage.setItem("currentItem", currentItem);
  }

  /* 新建一个问题 */
  createQuestion(question) {
    const currentItem = _.cloneDeep(this.state.currentItem);
    let { children } = currentItem;
    if (!_.isArray(children)) {
      children = [];
    }
    const options = this.initOption();
    const child = {
      title: question,
      id: children.length + 1,
      children: options
    };
    children.push(child);
    currentItem.children = children;
    this.setState({ currentItem });
    localforage.setItem("currentItem", currentItem);
  }

  /* 初始化选项 */
  initOption() {
    const options = [
      {
        title: "是"
      },
      {
        title: "否"
      }
    ];
    return options;
  }

  /* 更改默认选项 */
  updateOption(o) {
    const { index, pindex, option,target } = o;
    const currentItem = _.cloneDeep(this.state.currentItem);
    if (option) currentItem.children[pindex].children[index].title = option;
    currentItem.children[pindex].children[index].target = target
    this.setState({ currentItem });
    localforage.setItem("currentItem", currentItem);
  }

  /* 清除结果 */
  clearChoices() {
    const currentItem = _.cloneDeep(this.state.currentItem);
    currentItem.choices = null;
    this.setState({ currentItem });
    localforage.setItem("currentItem", currentItem);
    alert("清除成功");
  }

  /* 新建一个结果 */
  createAnswer(o) {
    const {index,pindex,target,result} = o
    const currentItem = _.cloneDeep(this.state.currentItem);
    let { choices } = currentItem;
    if (!_.isArray(choices)) {
      choices = [];
    }
    const choice = {
      title: result,
      id: choices.length + 100
    };
    choices.push(choice);
    currentItem.children[pindex].children[index].target = target
    currentItem.choices = choices;
    this.setState({ currentItem });
    alert("提交成功");
    localforage.setItem("currentItem", currentItem);
  }

  render() {
    const { currentItem } = this.state;
    const Nav = () => (
      <div>
        <Link to="/topic" onClick={this.createApp}>
          创建问卷
        </Link>
        <button onClick={() => this.clearChoices()}>清除所有结果</button>
      </div>
    );
    const NotFound = () => <h1>404 Not Found</h1>;
    if (!currentItem) {
      return <div>加载中</div>;
    } else {
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
                    currentItem={currentItem}
                    createQuestion={q => this.createQuestion(q)}
                    createAnswer={a => this.createAnswer(a)}
                    updateOption={o => this.updateOption(o)}
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
}

export default App;
