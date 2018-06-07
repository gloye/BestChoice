import React, { Component } from 'react'
import Choice from './choice'

const QuestionItem = props => {
  const Choices = []
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
        pIndex={props.index}
        index={i}
        key={i}
        isCurrent={props.index === props.position[0] && i === props.position[1]}
      />
    )
  })
  return (
    <div className="item">
      <h4>
        第{props.index + 1}题 {props.title}
      </h4>
      {Choices}
    </div>
  )
}
export default QuestionItem
