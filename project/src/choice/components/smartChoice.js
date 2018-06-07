import React, { Component } from 'react'
import _ from 'lodash'

const SmartChoices = props => {
  const { choices } = props
  const options = []
  if (_.isArray(choices) && !_.isEmpty(choices)) {
    choices.map((item, i) =>
      options.push(
        <li className="autoList-item" key={i} onClick={props.checkOption}>
          {item.title}
        </li>
      )
    )
  } else {
    return null
  }
  return <ul className="autoList">{options}</ul>
}

export default SmartChoices
