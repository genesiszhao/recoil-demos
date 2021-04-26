import React, { ChangeEventHandler } from 'react'

type TodoCreatorProps = {
  defaultValue: string
  onSubmit: (value: string) => void
}

function useFormInput(defaultValue: string) {
  const [value, setValue] = React.useState(defaultValue)

  const handleChange: ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    setValue(event.target.value)
  }, [])

  const reset = React.useCallback(() => {
    setValue('')
  }, [])

  return { value, handleChange, reset }
}

function TodoCreator({ defaultValue, onSubmit }: TodoCreatorProps) {
  const input = useFormInput(defaultValue)

  const handleClick = () => {
    onSubmit(input.value)
    input.reset()
  }

  return (
    <div>
      <input type="text" name="todo context" {...input} />
      <button onClick={() => handleClick()}></button>
    </div>
  )
}

export default TodoCreator
