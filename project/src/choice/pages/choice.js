/* 想到哪里写到那里 */
import React, { Component } from "react";
import QuestionShow from "./questionShow";

class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      questions: [],
      questionAmount: 0
    };
  }
  /* 创建标题 */
  handleTitleSubmit(event, title) {
    this.setState({
      title: title
    });
    event.preventDefault();
  }
  /* 创建问题 */
  createQuestion() {
    const amount = this.state.questionAmount + 1;
    this.setState({
      questionAmount: amount
    });
  }
  /* 创建选项 */
  createOption() {
    console.log("create");
  }
  render() {
    return (
      <div className="container">
        <QuestionShow />
      </div>
    );
  }
}
export default Choice;
