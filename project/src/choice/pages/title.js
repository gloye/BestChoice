import React, { PureComponent } from 'react'

class TitleInput extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }
    handleTitleChange(e) {
        const title = e.target.value
        this.setState({
            title: title
        })
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
                        placeholder="请输入你的标题" />
                    <button onClick={(event, title) => this.props.submit(event, this.state.title)}>下一步</button>
                </div>
            </form>
        )
    }
}

class TitleShow extends PureComponent {
    render() {
        if (this.props.title) {
            return (
                <div className="title">
                    <h1>{this.props.title}</h1>
                    <button onClick={() => this.props.submit()}>下一步</button>
                </div>
            )
        } else {
            return null
        }
    }
}

export default  TitleInput