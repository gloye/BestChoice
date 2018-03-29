import React, { Component } from "react";

function QuestionItem(props) {
  if (!props.completed) {
    return (
      <div>
        <h3>第{props.index}题</h3>
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
        <h3>第{props.index}题 {props.title} </h3>
        <Choice handleFocus={()=>{props.handleFocus(0)}} cancelFocus={props.cancelFocus} isFocus={props.isFocus===0} click={props.handleNextClick} val='是' />
        <Choice handleFocus={()=>{props.handleFocus(1)}} cancelFocus={props.cancelFocus} isFocus={props.isFocus===1} click={props.handleNextClick} val='否' />
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
      <Res isFocus={props.isFocus} click={props.click} />
    </div>
  );
}

function Res(props) {
  if (props.isFocus) {
    return (
      <div style={{ display: "inline" }}>
        <input type="text" placeholder='Kindle' value={props.res} />
        <button onClick={e=>{props.click(e)}}>下一题</button>
      </div>
    );
  } else {
    return null;
  }
}

/* 然后开始建第一个选项 */
class Question extends Component {
  constructor(props) {
    super(props);
    const handleFocus = this.handleFocus.bind(this)
    const handleSubmit = this.handleSubmit.bind(this)
    const handleInput = this.handleInput.bind(this)
    const handleNextClick =  this.handleNextClick.bind(this)
    const cancelFocus = this.cancelFocus.bind(this)

    this.state = {
      completed: false,
      isFocus: -1,
      title:null,
      index:1,
      handleFocus,
      handleSubmit,
      handleInput,
      cancelFocus,
      handleNextClick
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
    const title = e.target.value
    this.setState({title})
  }

  /* 下一题 */
  handleNextClick(e){
    let {index} = this.state
    index+=1
    this.setState({index})
  }

  render() {
    const state = this.state;
    const {index} = this.state
    const questions = []
    for(let i = 0;i<index;i++){
      questions.push(<QuestionItem {...state} />)
    }
    return (
      <div className="question-item">
        <h1>{this.props.topicTitle}</h1>
        {questions}
      </div>
    );
  }
}

export default Question;
