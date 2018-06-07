import React, { Component } from 'react'
import SmartChoices from './smartChoice'
const Choice = props => {
  const { index, pIndex, isCurrent } = props
  const inputTip = isCurrent ? (
    <SmartChoices
      choices={props.smartChoices}
      checkChoice={props.checkChoice}
    />
  ) : null
  return (
    <div>
      <input
        type="text"
        className="optionInput"
        value={props.value || ''}
        onChange={e => props.handleInput(e, { index, pIndex })}
      />

      <button
        className="optionSubmit"
        disabled={!!props.dest}
        onClick={e => {
          props.handleSubmit(e, { index, pIndex })
        }}
      >
        下一题
      </button>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className="resultInput"
          value={props.dest || ''}
          onBlur={e => {
            props.handleBlur(e)
          }}
          onChange={e => {
            props.handleInput(e, { index, pIndex })
          }}
        />
        <button
          className="resultSubmit"
          onClick={e => {
            props.handleSubmit(e, { index, pIndex })
          }}
        >
          提交
        </button>
        {inputTip}
      </div>
    </div>
  )
}
