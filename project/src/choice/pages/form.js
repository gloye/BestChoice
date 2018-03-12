import React, { PureComponent } from "react";

// 新增结果
class ResAdd extends PureComponent {
    render(){
        if(!this.props.isShow) return null
        return(
            <div>
                <input type="text" placeholder="填写您的结果" onChange ={e=>{this.props.onChange(e)}}/>
                <button onClick = {e=>{this.props.onClick(e)}}>确定</button>
            </div>
        )
    }
}
// 取消完成
class ResSubmit extends PureComponent {
    render(){
        return(
            <div className="panel">
                <button>完成</button>
                <button>取消</button>
            </div>
        )
    }
}
// 结果
class Res extends PureComponent {
    constructor(props){
        super(props)
        this.add = this.add.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            res:['Result1','Result2','Result3'],
            add:false,
            inputVal:''
        }
    }
    add(e){
        e.preventDefault()
        this.setState({
            add:true
        })
    }
    handleChange(e){
        e.preventDefault()
        const val = e.target.value
        this.setState({
            inputVal: val
        })
    }
    handleClick(e){
        e.preventDefault()
        const state = this.state 
        if(state.inputVal.length>0) state.res.push(state.inputVal)
        this.setState({
            add:false,
            res:state.res
        })
    }
    render(){
        if(!this.props.isShow) return null
        const results = this.state.res
        const resList = []
        results.forEach((item,idx)=>{
            resList.push(
                <li key={idx}>
                    <input type="radio" name="res" value={idx} id={'radio'+idx}/>
                    <label htmlFor={'radio'+idx}>{item}</label>
                </li>
            )
        })
        return (
            <div className='panel'>
                <div className="panel">
                <ul>
                    {resList}
                    <li><a href="" onClick={e=>{this.add(e)}}>新增</a></li>
                </ul>
                <ResAdd isShow={this.state.add} onChange={e=>this.handleChange(e)} onClick={e=>this.handleClick(e)}/>
                </div>
                <ResSubmit/>
            </div>
        )
    }
}
class Choice extends React.PureComponent {
  constructor(props) {
    super(props)
    this.getRes = this.getRes.bind(this)
    this.state = {
        res:false
    }
  }
  next(e){
      e.preventDefault()
      console.log('next')
  }
  getRes(e){
      e.preventDefault()
      this.setState({
          res:true
      })
      console.log('getRes')
    }
  cancelRes(e){
      e.preventDefault()
      this.setState({
          res:false
      })
  }
  render(){
      return(
          <div className='form-group'>
            <div className="panel">
                <button className='btn' onClick={e=>{this.next(e)}}>下一步</button>
                <button className='btn' onClick={e=>{this.getRes(e)}}>结果</button>
            </div>
            <Res isShow={this.state.res}/>
          </div>
      )
  }
}

export default Choice
