import React, { Component } from 'react'

function getQues(props){
    if(!props.completed){
        return(
            <div>
                <h3>第1题</h3>
                <div className="form-group">
                        <label htmlFor="#input"> 请输入你的问题：</label>
                        <input id="input" type="text" className="form-control" />
                        <button>确定</button>
                </div>
            </div>
        )
    } else{
        return(
            <div>
                <h3>第1题 是否经常阅读</h3>
            </div>
        )
    }
}

function getRes(){
    return(
        <div style={{display:"inline"}}>
            <input type="text" placeholder="是" onFocus={props.handleFocus}/>
            <input type="text" placeholder="Kindle"/>
            <button>下一题</button>
        </div>
    )
}



/* 然后开始建第一个选项 */
class QuestionInput extends Component {
    constructor(props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this)
        this.state = {
            completed: true ,
            handleFocus(e){
                console.log(e)
            }
        }
    }

    handleFocus(event){
        console.log(event)
    }
    
    render() {  
        const state = this.state
        return (
            <div className="question-item">
                <h1>如何选择一个Kindle?</h1>
                {getQues(state)}
            </div>
        )
    }
}

export default QuestionInput