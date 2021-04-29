import React, { useEffect, ChangeEventHandler } from 'react'

type TodoCreatorProps = {
  defaultValue: string
  onSubmit: (value: string) => void
}

function useFormInput(defaultValue: string) {
  const [value, setValue] = React.useState(defaultValue)

  const change: ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    setValue(event.target.value)
  }, [])

  const reset = React.useCallback(() => {
    setValue('')
  }, [])

  return { value, change, reset }
}

function TodoCreator({ defaultValue, onSubmit }: TodoCreatorProps) {
  const { value, change, reset } = useFormInput(defaultValue)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        onSubmit(value)
        reset()
      }
    }
    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)
    }
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <input
        style={{
          flex: 1,
          fontSize: 19,
          fontWeight: 'bold',
        }}
        type="text"
        name="todo context"
        value={value}
        onChange={change}
        autoComplete="off"
      />
    </div>
  )
}

export default TodoCreator
