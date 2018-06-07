const QuestionAdd = props => {
  return (
    <div>
      <h4>第{props.index}题</h4>
      <div className="form-group">
        <label htmlFor="#input"> 请输入你的问题：</label>
        <input
          id="input"
          type="text"
          className="form-control"
          onChange={e => {
            props.handleInput(e)
          }}
        />
      </div>
      <button
        className="btn btn-primary btn-block "
        data-type="titleSubmit"
        onClick={e => {
          props.handleSubmit(e)
        }}
      >
        确定
      </button>
    </div>
  )
}
export default QuestionAdd
