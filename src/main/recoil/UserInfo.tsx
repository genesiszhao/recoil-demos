import React from 'react'
import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
  useRecoilValueLoadable,
} from 'recoil'
import { userQuery } from '../../services/user'
import { User } from '../../types'

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 0,
})

// 通过内置的get方法从atom获取数据完成请求
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await userQuery({
      userID: get(currentUserIDState),
    })
    return response.data?.name
  },
})
export function UserInfo() {
  const userName = useRecoilValue(currentUserNameQuery)

  return (
    <div>
      <h2>{userName}</h2>
    </div>
  )
}

// 通过参数完成数据的请求
const userNameQuery = selectorFamily({
  key: 'UserName',
  get: (userID: number) => async ({ get }) => {
    const response = await userQuery({ userID })
    if (response.error) {
      throw response.error
    }
    return response.data?.name
  },
})
type UserDetailWithParamProps = {
  userID: number
}
export function UserInfoWithParam({ userID }: UserDetailWithParamProps) {
  const userName = useRecoilValue(userNameQuery(userID))

  return (
    <div>
      <h2>{userName}</h2>
    </div>
  )
}

// 根据传入的ID请求用户信息
const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: (userID: number) => async ({ get }) => {
    const response = await userQuery({ userID })
    if (response.error) {
      throw response.error
    }
    return response.data as User
  },
})
const currentUserInfoQuery = selector({
  key: 'CurrentUserInfoQuery',
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
})
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({ get }) => {
    const { watchs } = get(currentUserInfoQuery)
    const friends = []
    for (const friendID of watchs) {
      const friendInfo = get(userInfoQuery(friendID))
      friends.push(friendInfo)
    }
    // const friends = get(waitForAll(watchs.map((friendID) => userInfoQuery(friendID))))
    return friends
  },
})

export function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery)
  const friends = useRecoilValue(friendsInfoQuery)
  const setCurrentUserID = useSetRecoilState(currentUserIDState)

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 不实用Suspense
export function UserInfoWithoutSuspense({ userID }: { userID: number }) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID))
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>
    case 'loading':
      return <div>Loading...</div>
    case 'hasError':
      throw userNameLoadable.contents
  }
}
