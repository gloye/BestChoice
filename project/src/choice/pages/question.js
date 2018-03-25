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
        <Choice handleFocus={()=>{props.handleFocus(0)}} cancelFocus={props.cancelFocus} isFocus={props.isFocus===0} val='是' />
        <Choice handleFocus={()=>{props.handleFocus(1)}} cancelFocus={props.cancelFocus} isFocus={props.isFocus===1} val='否' />
      </div>
    );
  }
}

function Choice(props) {
  return (
    <div>
      <input
        type="text"
        placeholder={props.val}
        onFocus={e => {
          props.handleFocus(e);
        }}
        onBlur={(e)=>{props.cancelFocus(e)}}
      />
      <Res isFocus={props.isFocus} />
    </div>
  );
}

function Res(props) {
  if (props.isFocus) {
    return (
      <div style={{ display: "inline" }}>
        <input type="text" placeholder='Kindle' value={props.res} />
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
    const cancelFocus = this.cancelFocus.bind(this)
    this.state = {
      completed: true,
      isFocus: -1,
      handleFocus,
      handleSubmit,
      handleInput,
      cancelFocus
    };
  }
  /* focus事件 */
  handleFocus(idx) {
    this.setState({isFocus:idx})
  }
  /* blur事件 */
  cancelFocus(e){
    console.log(e.target)
  }
  /* 提交 */
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      completed: true
    });
  }
  /* 输入 */
  handleInput(e){
    console.log(e.target.value)
  }

  render() {
    const state = this.state;
    return (
      <div className="question-item">
        <h1>{this.props.topicTitle}</h1>
        <Ques {...state} />
      </div>
    );
  }
}

export default QuestionInput;
