import React, { Component } from 'react'

/* 然后开始建第一个选项 */
class QuestionShow extends Component {
    constructor(props) {
        super(props)
        this.activate = this.activate.bind(this)
        this.state = {
            items: []
        }
    }
    activate(e){
        // 执行这个会有两个选项 默认隐藏 通过state控制它的显示
        e.preventDefault()
        console.log("触发激活")
    }
    // 定义激活的选项
    activeTools(){
        /* 允许两条操作 指向结果 以及 指向下一题 
        *
        */
        return (
            <div class="form-group">
                <button className='btn btn-primary'>下一题</button>   
                <button className='btn btn-primary'>获得结果</button>   
            </div>  
        )
    }
    // 定义下一题的方法 此处应该为React router
    toNext(){

    }
    // 定义结果的方法
    toResult(){

    }
    render() {
        return (
            <div className="question-show">
                <h3> 第一题 是否经常阅读</h3>
                <div className="item">a
                    <span className="text-disabled">是</span>
                    <a href="" onClick={this.activate} className="text-primary ml-4">激活条目</a>
                    <a href="" className="text-danger ml-2">删除</a>
                    </div>
                    <div className="item">
                    <span className="text-disable">否</span>
                    <a href="" onClick={this.activate} className="text-primary ml-4">激活条目</a>
                    <a href="" className="text-danger ml-2">删除</a>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">添加条目</button>
                    <button className="btn btn-primary ml-2">完成</button>
                </div>
            </div>
        )
    }
}

export default QuestionShow 