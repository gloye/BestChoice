import React, { PureComponent } from "react";

class Topic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTitleSubmit = this.handleTitleSubmit.bind(this);
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({
      title: title
    });
  }
  handleTitleSubmit(e){
      e.preventDefault()
      this.props.history.push('/question/1')
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">输入标题:</label>
          <input
            type="text"
            name="title"
            id=""
            onChange={this.handleTitleChange}
            placeholder="请输入你的标题"
          />
          <button
            onClick={this.handleTitleSubmit}>
            下一步
          </button>
        </div>
      </form>
    );
  }
}

export default Topic;
