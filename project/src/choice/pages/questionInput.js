import React, { Component } from 'react'

/* 然后开始建第一个选项 */
class QuestionInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    render() {
        return (
            <div className="question-item">
                <h1>第{this.props.index}题</h1>
                <div className="form-group">
                    <label htmlFor={ "#name"+this.props.index}> 请输入题目名称：</label>
                    <input id={ "name"+this.props.index} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">确定</button>
                </div>
            </div>
        )
    }
}

export default QuestionInput