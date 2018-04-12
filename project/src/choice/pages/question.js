import React, { Component } from "react";

function QuestionItem(props) {
  const Choices = [];
  props.children.forEach((item, idx) => {
    Choices.push(
      <Choice
        handleInput={props.handleInput}
        handleSubmit={props.handleSubmit}
        val={item.title}
        pindex={props.index}
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
  return (
    <div>
      <input
        type="text"
        className="optionInput"
        placeholder={props.val}
        onChange={e => props.handleInput(e, { index, pindex })}
      />

      <button
        className="optionSubmit"
        onClick={e => {
          props.handleSubmit(e);
        }}
      >
        下一题
      </button>
      <input
        type="text"
        className="resultInput"
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
}

/* 然后开始建第一个选项 */
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null, // 用于提交标题赋值
      option: null, // 用于提交选项赋值
      result: null, // 用于提交结果赋值
      add:false
    };
  }

  /* focus事件 */
  handleFocus(e) {}

  /* blur事件 */
  handleBlur(e) {}

  /* 输入 */
  handleInput(e, ...args) {
    const { className } = e.target;
    switch (className) {
      case "questionInput":
        const title = e.target.value;
        this.setState({ title });
        break;
      case "optionInput":
        const option = e.target.value;
        this.setState({ option });
        const obj = Object.assign(
          {
            title: option
          },
          args[0]
        );
        const { updateOption } = this.props;
        updateOption(obj);
        break;
      case "resultInput":
        const result = e.target.value;
        this.setState({ result });
        break;
      default:
        return null;
    }
  }

  /* 提交 */
  handleSubmit(e, ...args) {
    e.preventDefault();
    const { className } = e.target;
    switch (className) {
      case "titleSubmit":
        const { title } = this.state;
        const { createQuestion } = this.props;
        createQuestion(title);
        break;
      case "optionSubmit":
        /* 下一题 */
        break;
      case "resultSubmit":
        const { result } = this.state;
        const { createAnswer } = this.props;
        const options = args[0]
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
          <QuestionItem {...events} {...item} index={index} key={item.id} />
        );
      });
    }
    return (
      <div className="question-item">
        <h1>{title ? title : "尚未定义主题"}</h1>
        {Questions}
        {this.state.add?<QuestionAdd index={nextIndex} {...events} />:null}
      </div>
    );
  }
}

export default Question;
