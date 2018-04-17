import React, { Component } from "react";
import _ from "lodash";

function QuestionItem(props) {
  const Choices = [];
  props.children.forEach((item, i) => {
    Choices.push(
      <Choice
        handleInput={props.handleInput}
        handleSubmit={props.handleSubmit}
        value={item.title}
        pindex={props.index}
        index={i}
        key={i}
        isFocus={props.pindex===props.position[0]&&props.index===props.position[1]}
      />
    );
  });
  return (
    <div className="item">
      <h3>
        第{props.index + 1}题 {props.title}
      </h3>
      {Choices}
    </div>
  );
}

function QuestionAdd(props) {
  return (
    <div>
      <h3>第{props.index}题</h3>
      <div className="form-group">
        <label htmlFor="#input"> 请输入你的问题：</label>
        <input
          id="input"
          type="text"
          className="questionInput"
          onChange={e => {
            props.handleInput(e);
          }}
        />
        <button
          className="titleSubmit"
          onClick={e => {
            props.handleSubmit(e);
          }}
        >
          确定
        </button>
      </div>
    </div>
  );
}

function Choice(props) {
  const { index, pindex } = props;
  const inputTip = 0 ? <SmartChoices choices={props.smartChoices} /> : null;
  return (
    <div>
      <input
        type="text"
        className="optionInput"
        placeholder={props.value}
        onChange={e => props.handleInput(e)}
      />

      <button
        className="optionSubmit"
        onClick={e => {
          props.handleSubmit(e, { index, pindex });
        }}
      >
        下一题
      </button>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className="resultInput"
          onChange={e => {
            props.handleInput(e, { index, pindex });
          }}
        />
        <button
          className="resultSubmit"
          onClick={e => {
            props.handleSubmit(e);
          }}
        >
          提交
        </button>
        {inputTip}
      </div>
    </div>
  );
}

function SmartChoices(props) {
  let { choices } = props;
  if (!!Array.isArray(choices)) {
    choices.map(item => <li>item.title</li>);
  } else {
    choices = "test";
  }
  return <ul>{choices}</ul>;
}

/* 然后开始建第一个选项 */
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null, // 用于提交标题赋值
      option: null, // 用于提交选项赋值
      result: null, // 用于提交结果赋值
      position: [-1, -1],
      add: false,
      smartChoices: null // 显示智能提示
    };
  }

  /* focus事件 */
  handleFocus(e) {}

  /* blur事件 */
  handleBlur(e) {}

  /* 输入 */
  handleInput(e, ...args) {
    const { className } = e.target;
    const { pindex, index } = args ? args[0] : { pindex: -1, index: -1 };
    const position = [pindex,index]
    switch (className) {
      case "questionInput":
        const title = e.target.value;
        this.setState({ title });
        break;
      case "optionInput":
        const option = e.target.value;
        this.setState({ option });
        break;
      case "resultInput":
        const result = e.target.value;
        this.smartType(result);
        this.setState({
          result,
          position
        });
        break;
      default:
        return null;
    }
  }

  /* 智能提示 */
  smartType(inputVal) {
    let { choices } = this.props.currentItem;
    if (!choices||!Array.isArray(choices)) return;
    const filterMethod = item => item.title.includes(inputVal);
    const smartChoices = choices.filter(filterMethod);
    this.setState({
      smartChoices
    });
  }

  checkPosition(positionDist) {
    const { position } = this.state;
    return _.isEqual(position, positionDist);
  }

  /* 提交 */
  handleSubmit(e, ...args) {
    e.preventDefault();
    let { children, choices } = this.props.currentItem;
    // question id & choice id
    if (!Array.isArray(children)) {
      children = [];
    }
    if (!Array.isArray(choices)) {
      choices = [];
    }
    const questionId = children.length + 1;
    const choiceId = 100 + choices.length + 1;
    // props method
    const { createQuestion, updateOption,currentItem } = this.props;
    const { pindex, index } = args ? args : { pindex: -1, index: -1 };
    const { className } = e.target;
    switch (className) {
      case "titleSubmit":
        const { title } = this.state;
        createQuestion(title);
        this.setState({
          add: false
        });
        break;
      case "optionSubmit":
        const { option } = this.state;
        const targetId = this.checkPosition([pindex, index])
          ? choiceId
          : questionId;
        const obj = Object.assign({ option, target: targetId }, args[0]);
        updateOption(obj);
        this.setState({
          add: true
        });
        break;
      case "resultSubmit":
        const { result } = this.state;
        const { createAnswer } = this.props;
        if(pindex!==-1&&index!==-1){
          currentItem.children[pindex].children[index].focus = true
        }
        createAnswer(result);
        break;
      default:
        return null;
    }
  }

  componentDidMount = () => {
    const { children } = this.props.currentItem;
    if (!children) {
      this.setState({
        add: true
      });
    }
  };

  render() {
    const { title, children } = this.props.currentItem;
    const Questions = [];
    const nextIndex = children ? children.length + 1 : 1;
    const handleFocus = this.handleFocus.bind(this);
    const handleInput = this.handleInput.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const {smartChoices,position} = this.state;
    const events = {
      handleFocus,
      handleInput,
      handleSubmit
    };
    if (children) {
      children.forEach((item, index) => {
        Questions.push(
          <QuestionItem
            {...events}
            {...item}
            smartChoices={smartChoices}
            position = {position}
            index={index}
            key={item.id}
          />
        );
      });
    }
    return (
      <div className="question-item">
        <h1>{title ? title : "尚未定义主题"}</h1>
        {Questions}
        {this.state.add ? <QuestionAdd index={nextIndex} {...events} /> : null}
      </div>
    );
  }
}

export default Question;
