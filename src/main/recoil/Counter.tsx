import React from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const countState = atom({
  key: 'countState',
  default: 0,
})

export function Counter() {
  const [count, setCount] = useRecoilState(countState)
  //   const count = useRecoilValue(countState)
  //   const setCount = useSetRecoilState(countState)

  React.useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }, [count])

  return <div>{count}</div>
}
