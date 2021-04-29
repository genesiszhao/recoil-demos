import React from 'react'
import { VisibilityFilter } from '../types'
import { SHOW_ALL, SHOW_COMPLATED, SHOW_UNCOMPLATED } from '../constants'

type ChangeFilterProps = {
  onChange: (filter: VisibilityFilter) => void
  currentFilter: VisibilityFilter
}

function ChangeFilter({ currentFilter, onChange }: ChangeFilterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        style={{
          backgroundColor: currentFilter === SHOW_ALL ? '#00CCBB' : '',
        }}
        onClick={() => {
          onChange(SHOW_ALL)
        }}
      >
        SHOW_ALL
      </button>
      <button
        style={{
          backgroundColor: currentFilter === SHOW_COMPLATED ? '#00CCBB' : '',
        }}
        onClick={() => {
          onChange(SHOW_COMPLATED)
        }}
      >
        SHOW_COMPLATED
      </button>
      <button
        style={{
          backgroundColor: currentFilter === SHOW_UNCOMPLATED ? '#00CCBB' : '',
        }}
        onClick={() => {
          onChange(SHOW_UNCOMPLATED)
        }}
      >
        SHOW_UNCOMPLATED
      </button>
    </div>
  )
}

export default ChangeFilter
