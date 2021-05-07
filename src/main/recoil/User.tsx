import React from 'react'
import { atom, selector } from 'recoil'
import { mockTodoQueryUrl } from '../../constants/url'

async function UserInfoQuery(params: { userID: number }) {
  return fetch(mockTodoQueryUrl).then((response) => response.json())
}

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
})

const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    })
    return response.name
  },
})
