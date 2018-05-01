import React, { Component } from "react";
import _ from "lodash";

function QuestionItem(props) {
  const Choices = [];
  props.children.forEach((item, i) => {
    Choices.push(
      <Choice
        handleInput={props.handleInput}
        handleBlur={props.handleBlur}
        handleSubmit={props.handleSubmit}
        smartChoices={props.smartChoices}
        checkChoice={props.checkChoice}
        value={item.title}
        dest={item.dest}
        pindex={props.index}
        index={i}
        key={i}
        isCurrent={props.index === props.position[0] && i === props.position[1]}
      />
    );
  });
  return (
    <div className="item">
      <h3>
        第{props.index + 1}题 {props.title}
      </h3>
      {Choices}
    </div>
  );
}

function QuestionAdd(props) {
  return (
    <div>
      <h3>第{props.index}题</h3>
      <div className="form-group">
        <label htmlFor="#input"> 请输入你的问题：</label>
        <input
          id="input"
          type="text"
          className="questionInput"
          onChange={e => {
            props.handleInput(e);
          }}
        />
        <button
          className="titleSubmit"
          onClick={e => {
            props.handleSubmit(e);
          }}
        >
          确定
        </button>
      </div>
    </div>
  );
}

function Choice(props) {
  const { index, pindex, isCurrent } = props;
  const inputTip = isCurrent ? (
    <SmartChoices
      choices={props.smartChoices}
      checkChoice={props.checkChoice}
    />
  ) : null;
  return (
    <div>
      <input
        type="text"
        className="optionInput"
        value={props.value || ""}
        onChange={e => props.handleInput(e, { index, pindex })}
      />

      <button
        className="optionSubmit"
        disabled={!!props.dest}
        onClick={e => {
          props.handleSubmit(e, { index, pindex });
        }}
      >
        下一题
      </button>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className="resultInput"
          value={props.dest || ""}
          onBlur={e => {
            props.handleBlur(e);
          }}
          onChange={e => {
            props.handleInput(e, { index, pindex });
          }}
        />
        <button
          className="resultSubmit"
          onClick={e => {
            props.handleSubmit(e, { index, pindex });
          }}
        >
          提交
        </button>
        {inputTip}
      </div>
    </div>
  );
}

function SmartChoices(props) {
  const { choices } = props;
  const options = [];
  if (_.isArray(choices) && !_.isEmpty(choices)) {
    choices.map((item, i) =>
      options.push(
        <li className="autoList-item" key={i} onClick={props.checkOption}>
          {item.title}
        </li>
      )
    );
  } else {
    return null;
  }
  return <ul className="autoList">{options}</ul>;
}

/* 然后开始建第一个选项 */
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: props.currentItem,
      title: null, // 用于提交标题赋值
      option: null, // 用于提交选项赋值
      result: null, // 用于提交结果赋值
      position: [-1, -1],
      add: false,
      smartChoices: null // 显示智能提示
    };
  }

  /* focus事件 */
  handleFocus(e) {}

  /* blur事件 */
  handleBlur(e) {
    const { className } = e.target;
    switch (className) {
      case "resultInput":
        this.setState({
          smartChoices: null
        });
        break;
      default:
        return;
    }
  }

  /* 输入 */
  handleInput(e, ...args) {
    const { className, value } = e.target;
    const { pindex, index } = !_.isEmpty(args)
      ? args[0]
      : { pindex: -1, index: -1 };
    const position = [pindex, index];
    const currentItem = _.cloneDeep(this.props.currentItem);
    switch (className) {
      case "questionInput":
        this.setState({ title: value });
        break;
      case "optionInput":
        currentItem.children[pindex].children[index].title = value;
        this.setState({ option: value, currentItem });
        break;
      case "resultInput":
        currentItem.children[pindex].children[index].dest = value;
        this.smartType(value);
        this.setState({
          result: value,
          currentItem,
          position //choice的位置
        });
        break;
      default:
        return null;
    }
  }

  /* 自动完成 */
  smartType(inputVal) {
    let { choices } = this.props.currentItem;
    if (!_.isArray(choices) || _.isEmpty(choices)) return;
    const filterMethod = item =>
      item.title.includes(inputVal) && inputVal !== "";
    const smartChoices = choices.filter(filterMethod);
    this.setState({
      smartChoices
    });
  }

  checkChoice(choice) {
    this.setState({
      result: choice,
      smartChoices: null
    });
  }

  checkPosition(positionDist) {
    const { position } = this.state;
    return _.isEqual(position, positionDist);
  }

  /* 提交 */
  handleSubmit(e, ...args) {
    e.preventDefault();
    let { children, choices } = this.props.currentItem;
    // question id & choice id
    if (!Array.isArray(children)) {
      children = [];
    }
    if (!Array.isArray(choices)) {
      choices = [];
    }
    const { title, option, result } = this.state;
    const questionId = children.length + 1;
    // compare with existing choice
    let choiceId = 100 + choices.length + 1;
    // props method
    const { createQuestion, updateOption } = this.props;
    const { pindex, index } = !_.isEmpty(args)
      ? args[0]
      : { pindex: -1, index: -1 };
    const targetId = this.checkPosition([pindex, index])
      ? choiceId
      : questionId;
    const obj = Object.assign({ target: targetId }, args[0]);
    const { className } = e.target;
    switch (className) {
      case "titleSubmit":
        createQuestion(title);
        this.setState({
          add: false
        });
        break;
      case "optionSubmit":
        const optionObj = Object.assign({ option }, obj);
        updateOption(optionObj);
        this.setState({
          add: true
        });
        break;
      case "resultSubmit":
        const { createAnswer } = this.props;
        const resultObj = Object.assign({ result }, obj);
        createAnswer(resultObj);
        break;
      default:
        return null;
    }
  }

  createDest(data) {
    const currentItem = arguments.length > 0 ? data : this.state.currentItem;
    const { children, choices } = currentItem;
    if (!children) {
      this.setState({
        add: true
      });
    } else {
      children.forEach(item => {
        item.children.forEach(choiceItem => {
          if (choiceItem.target && choiceItem.target !== 0) {
            if (choiceItem.target > 100 && _.isArray(choices)) {
              const filtered = choices.filter(
                item => item.id === choiceItem.target
              );
              if (!_.isEmpty(filtered)) currentItem.dest = filtered[0].title;
            }
          }
        });
      });
      currentItem.children = children;
      this.setState({
        currentItem
      });
    }
  }

  componentDidMount = () => {
    this.createDest();
  };

  componentWillReceiveProps = nextProps => {
    const { currentItem } = nextProps;
    this.createDest(currentItem);
  };

  render() {
    const { currentItem } = this.state;
    const { title, children } = currentItem;
    const Questions = [];
    const nextIndex = children ? children.length + 1 : 1;
    const handleFocus = this.handleFocus.bind(this);
    const handleInput = this.handleInput.bind(this);
    const handleBlur = this.handleBlur.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);
    const checkChoice = this.checkChoice.bind(this);
    const { smartChoices, position } = this.state;
    const events = {
      handleFocus,
      handleInput,
      handleBlur,
      handleSubmit,
      checkChoice
    };
    // add the title text for children.children
    if (children) {
      children.forEach((item, index) => {
        Questions.push(
          <QuestionItem
            {...events}
            {...item}
            smartChoices={smartChoices}
            position={position}
            index={index}
            key={item.id}
          />
        );
      });
    }
    return (
      <div className="container">
        <div className="debug">
          <pre className="pre">{JSON.stringify(currentItem, null, 2)}</pre>
          <button onClick={this.props.clearResults}>清除结果</button>
        </div>
        <div className="main">
          <h1>{title ? title : "尚未定义主题"}</h1>
          {Questions}
          {this.state.add ? (
            <QuestionAdd index={nextIndex} {...events} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Question;
