import React, { ChangeEventHandler } from 'react'

type TodoCreatorProps = {
  defaultValue: string
  onSubmit: (value: string) => void
}

function TodoCreator({ defaultValue, onSubmit }: TodoCreatorProps) {
  const [value, setValue] = React.useState(defaultValue)

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input type="text" name="todo context" value={value} onChange={onChange} />
      <button
        onClick={() => {
          onSubmit(value)
          setValue(defaultValue)
        }}
      ></button>
    </div>
  )
}

export default TodoCreator
