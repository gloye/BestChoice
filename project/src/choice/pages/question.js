import React, { Component } from "react";

function Ques(props) {
  if (!props.completed) {
    return (
      <div>
        <h3>第1题</h3>
        <div className="form-group">
          <label htmlFor="#input"> 请输入你的问题：</label>
          <input id="input" type="text" className="form-control" onChange={(e)=>{props.handleInput(e)}}/>
          <button onClick={(e)=>{props.handleSubmit(e)}}>确定</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>第1题 是否经常阅读</h3>
        <Choice handleFocus={props.handleFocus} isFocus={props.isFocus} />
      </div>
    );
  }
}

function Choice(props) {
  return (
    <div style={{ display: "inline" }}>
      <input
        type="text"
        placeholder="是"
        onFocus={e => {
          props.handleFocus(e);
        }}
      />
      <Res isFocus={props.isFocus} />
    </div>
  );
}

function Res(props) {
  if (props.isFocus) {
    return (
      <div style={{ display: "inline" }}>
        <input type="text" placeholder="Kindle" />
        <button>下一题</button>
      </div>
    );
  } else {
    return null;
  }
}

/* 然后开始建第一个选项 */
class QuestionInput extends Component {
  constructor(props) {
    super(props);
    const handleFocus = this.handleFocus.bind(this)
    const handleSubmit = this.handleSubmit.bind(this)
    const handleInput = this.handleInput.bind(this)
    this.state = {
      completed: false,
      isFocus: false,
      handleFocus,
      handleSubmit,
      handleInput
    };
  }
  handleFocus(e) {
    this.setState({
      isFocus: true
    });
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      completed: true
    });
  }
  handleInput(e){
    console.log(e.target.value)
  }
  render() {
    const state = this.state;
    return (
      <div className="question-item">
        <h1>如何选择一个Kindle?</h1>
        <Ques {...state} />
      </div>
    );
  }
}

export default QuestionInput;
