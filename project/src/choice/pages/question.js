import React, { Component } from "react";
import _ from "lodash";

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
      position: [0, 0],
      add: false
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
        break;
      case "resultInput":
        const result = e.target.value;
        this.setState({ result });
        break;
      default:
        return null;
    }
  }

  checkPosition(positionDist) {
    const { position } = this.state;
    return _.isEqual(position, positionDist);
  }

  /* 提交 */
  handleSubmit(e, ...args) {
    e.preventDefault();
    let { children,choices } = this.props.currentItem;
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
    const { createQuestion, updateOption } = this.props;
    const { pindex, index } = args?args:{pindex:-1,index:-1};
    const { className } = e.target;
    switch (className) {
      case "titleSubmit":
        const { title } = this.state;
        createQuestion(title);
        this.setState({
          add:false
        })
        break;
      case "optionSubmit":
        /**
         * props: title target(question/choice)
         */
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
        const position = [pindex, index];
        this.setState(position);
        createAnswer(result);
        break;
      default:
        return null;
    }
  }

  componentDidMount = () => {
    const {children} = this.props.currentItem
    if(!children){
      this.setState({
        add:true
      })
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
        {this.state.add ? <QuestionAdd index={nextIndex} {...events} /> : null}
      </div>
    );
  }
}

export default Question;
