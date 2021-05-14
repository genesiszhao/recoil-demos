import React from 'react'
import { atom, useRecoilState, useRecoilCallback } from 'recoil'

const countState = atom({
  key: 'countState',
  default: 0,
})

export function MyComponent() {
  const [count, setCount] = useRecoilState(countState)

  const logState = useRecoilCallback(({ snapshot }) => async () => {
    const numItemsInCart = await snapshot.getPromise(countState)
    console.log('Items in cart: ', numItemsInCart)

    // const newSnapshot = snapshot.map(({ set }) => set(countState, 42))
    // const doubleNumItemsInCart = await newSnapshot.getPromise(countState)
    // console.log('Double Items in cart: ', doubleNumItemsInCart)
  })

  React.useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }, [count])

  return (
    <div>
      <div>{count}</div>
      <button onClick={logState}>log</button>
    </div>
  )
}
