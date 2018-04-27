import React, { PureComponent } from "react";
import _ from "lodash";
import localforage from "localforage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Topic from "./pages/topic";
import Question from "./pages/question";
import Choice from "./pages/choice";

const Nav = props => (
  <div>
    <ul>
      <li>
        <Link to="/topic" onClick={this.createApp}>
          创建问卷
        </Link>
      </li>
      <li>
        <Link to="/question"> 查看上次记录 </Link>
      </li>
    </ul>
  </div>
);

const NotFound = () => <h1>404 Not Found</h1>;

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
          this.upadateData(data);
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
    this.upadateData(currentItem);
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

  /* 更新数据 */
  upadateData(data) {
    this.setState({ currentItem: data });
    localforage.setItem("currentItem", data);
  }

  /* 更改默认选项 */
  updateOption(o) {
    const { index, pindex, option, target } = o;
    const currentItem = _.cloneDeep(this.state.currentItem);
    if (option) currentItem.children[pindex].children[index].title = option;
    currentItem.children[pindex].children[index].target = target;
    this.upadateData(currentItem);
  }

  /* 新增一个结果 */
  createAnswer(o) {
    const { index, pindex, target, result } = o;
    const currentItem = _.cloneDeep(this.state.currentItem);
    let { choices } = currentItem;
    choices = _.isArray(choices) && !_.isEmpty(choices) ? choices : [];
    // 提交一个空值时的逻辑 或者 先检测 choices
    if (result === null || result === "") {
      // 删除target  删除 dest 删除 focus 状态重置
      delete currentItem.children[pindex].children[index].target;
      delete currentItem.children[pindex].children[index].dest;
      delete currentItem.children[pindex].children[index].focus;
    } else {
      let push = true;
      // 在choices中进行排除
      for (let i = 0; i < choices.length; i++) {
        if (choices[i].title === result) {
          currentItem.children[pindex].children[index].target = choices[i].id;
          push = false;
          break;
        }
      }
      // 添加一个新选项
      if (push) {
        const choice = {
          title: result,
          id: target
        };
        choices.push(choice);
        currentItem.children[pindex].children[index].target = target;
      }
    }
    currentItem.choices = choices;
    alert("提交成功");
    this.upadateData(currentItem);
  }

  clearResults() {
    const currentItem = _.cloneDeep(this.state.currentItem);
    currentItem.choices = [];
    this.upadateData(currentItem);
  }

  render() {
    const { currentItem } = this.state;
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
                    clearResults={() => {
                      this.clearResults();
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
}

export default App;
