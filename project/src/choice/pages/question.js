import React, { Component } from "react";

function QuestionItem(props) {
  const { handleFocus, handleInput, id, currentOptionId } = props;
  const Choices = [];
  const events = {
    handleFocus,
    handleInput
  };
  props.children.forEach((item, idx) => {
    Choices.push(
      <Choice
        val={item.title}
        currentOptionId={currentOptionId}
        pid={id}
        index={idx}
        key={idx}
        {...events}
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
  const id = "c" + props.pid + props.index;
  const resultInput =
    props.currentOptionId === id ? (
      <input type="text" placeholder="Kindle" value={props.res} />
    ) : null;
  return (
    <div>
      <input
        type="text"
        className="optionInput"
        placeholder={props.val}
        value={props.val}
        id={id}
        onFocus={e => props.handleFocus(e)}
        onChange={e => {
          props.handleInput(e);
        }}
      />
      {resultInput}
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
    this.state = {
      title: null,
      currentOptionId: null,
      createQuestion
    };
  }

  /* focus事件 */
  handleFocus(e) {
    // 获取触发点击事件的input的id
    const currentOptionId = e.target.id;
    this.setState({
      currentOptionId
    });
  }

  /* blur事件 */
  handleBlur(e) {}

  /* 输入 */
  handleInput(e) {
    const that = this;
    const { className } = e.target;
    switch (className) {
      case "questionInput":
        const title = e.target.value;
        that.setState({ title });
        break;
      case "optionInput":
        break;
      default:
        return null;
    }
  }

  /* 提交 */
  handleSubmit(e) {
    e.preventDefault();
    const { title, createQuestion } = this.state;
    createQuestion(title);
  }

  render() {
    const { title, children } = this.props.currentItem;
    const Questions = [];
    const nextIndex = children ? children.length + 1 : 1;
    const handleFocus = this.handleFocus.bind(this);
    const handleInput = this.handleInput.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const { currentOptionId } = this.state;
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
            currentOptionId={currentOptionId}
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
