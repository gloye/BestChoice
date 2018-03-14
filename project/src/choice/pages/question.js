import React, { Component } from 'react'

function Ques(props){
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
                <Choice/>
            </div>
        )
    }
}

function Choice(props){
    let isShow = false
    const handleFocus = (e) => {
        console.log(e)
        isShow = true
        console.log(isShow)
    }
    
    return(
        <div style={{display:"inline"}}>
            <input type="text" placeholder="是" onFocus={handleFocus}/>
            <Res focus={isShow}/>
        </div>
    )
}

function Res(props){
    if(props.focus){
        return(
            <div style={{display:"inline"}}>
                <input type="text" placeholder="Kindle"/>
                <button>下一题</button>
            </div>
        )
    }else{
        return null
    }
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
                {Ques(state)}
            </div>
        )
    }
}

export default QuestionInput