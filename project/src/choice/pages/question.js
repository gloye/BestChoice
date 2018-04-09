import React, { Component } from "react";

function QuestionItem(props) {
  const Choices = [];
  props.children.forEach((item, idx) => {
    Choices.push(
      <Choice
        {...props}
        val={item.title}
        index={idx}
        key={idx}
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
          className="titleInput"
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
  const ResultGroup = () => (
    <div className="resultGroup">
      <input
        type="text"
        className="resultInput"
        placeholder="不填跳转下一题"
        onChange={e => {
          props.handleInput(e);
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
    </div>
  );

  return (
    <div>
      <input
        type="text"
        className="optionInput"
        placeholder={props.val}
        onChange={e => props.handleInput(e)}
      />
      <ResultGroup />
    </div>
  );
}

/* 然后开始建第一个选项 */
class Question extends Component {
  constructor(props) {
    super(props);
    const createQuestion = value => {
      props.createQuestion(value);
    };
    const createAnswer = value => {
      props.createAnswer(value);
    };
    this.state = {
      title: null, // 用于提交标题赋值
      result: null, // 用于提交结果赋值
      option:null,
      createQuestion,
      createAnswer
    };
  }

  /* focus事件 */
  handleFocus(e) {}

  /* blur事件 */
  handleBlur(e) {}

  /* 输入 */
  handleInput(e) {
    const { className } = e.target;
    switch (className) {
      case "questionInput":
        let title = e.target.value;
        this.setState({ title });
        break;
      case "optionInput":
        const option = e.target.value;
        this.setState({option})
        break;
      case "resultInput":
        const result = e.target.value;
        this.setState({result})
        break;
      default:
        return null;
    }
  }

  /* 提交 */
  handleSubmit(e) {
    e.preventDefault();
    const className = e.target;
    switch (className) {
      case "titleSubmit":
        const { title, createQuestion } = this.state;
        createQuestion(title);
        break;
      case "optionSubmit":
        break;
      case "resultSubmit":
        const { result, createAnswer } = this.state;
        createAnswer(result);
        break;
      default:
        return null;
    }
  }

  render() {
    const { title, children } = this.props.currentItem;
    const Questions = [];
    const nextIndex = children ? children.length + 1 : 1;
    const handleFocus = this.handleFocus.bind(this);
    const handleInput = this.handleInput.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
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
        <QuestionAdd index={nextIndex} {...events} />
      </div>
    );
  }
}

export default Question;
