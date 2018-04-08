import React, { Component } from "react";

function QuestionItem(props) {
  return (
    <div className="item">
      <h3>
        第{props.index + 1}题 {props.title}
      </h3>
      <Choice val="是" handleFocus={props.handleFocus}/>
      <Choice val="否" handleFocus={props.handleFocus}/>
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
          className="form-control"
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
  const resultInput = props.isFocus ? (
    <input type="text" placeholder="Kindle" value={props.res} />
  ) : null;
  return (
    <div>
      <input type="text" placeholder={props.val} onFocus={props.handleFocus} />
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
      createQuestion
    };
  }

  /* focus事件 */
  handleFocus(e) {
    console.log('focus')
  }

  /* 输入 */
  handleInput(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  /* blur事件 */
  handleBlur(e) {
    
  }

  /* 提交 */
  handleSubmit(e) {
    e.preventDefault();
    const { title, createQuestion } = this.state;
    createQuestion(title);
  }

  render() {
    const { title, children } = this.props.currentItem;
    const questions = [];
    const nextIndex = children ? children.length + 1 : 1;
    const handleFocus = this.handleFocus.bind(this)
    const events = {
      handleFocus
    }
    if (children) {
      children.forEach((item, index) => {
        questions.push(<QuestionItem {...item} {...events} index={index} key={item.id} />);
      });
    }
    return (
      <div className="question-item">
        <h1>{title}</h1>
        {questions}
        <QuestionAdd index={nextIndex} />
      </div>
    );
  }
}

export default Question;
