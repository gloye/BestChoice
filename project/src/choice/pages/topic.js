import React, { PureComponent } from 'react'

class Topic extends PureComponent {
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.state = {
      title: null
    }
  }

  handleTitleChange(e) {
    const title = e.target.value
    this.setState({
      title
    })
  }

  render() {
    const { title } = this.state
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="title">输入标题:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            onChange={this.handleTitleChange}
            placeholder="请输入你的标题"
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={event => {
            if (typeof title === 'string' && title.trim()) {
              this.props.history.push('/question')
              this.props.createTitle(title)
            } else {
              alert('请填写标题！')
            }
          }}
        >
          下一步
        </button>
      </div>
    )
  }
}

export default Topic
