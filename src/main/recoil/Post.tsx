import React from 'react'
import { atom, selector, selectorFamily, useRecoilValue } from 'recoil'
import { mockPostQueryUrl, mockCommentsQueryUrl } from '../../constants/url'
import { Post } from '../../types'

async function postQuery({ postID }: { postID: number }) {
  return fetch(mockPostQueryUrl(postID)).then((response) => response.json())
}

const currentPostIDState = atom({
  key: 'currentPostIDState',
  default: 1,
})

// 通过内置的get方法从atom获取数据完成请求
const currentPostInfoQuery = selector<Post>({
  key: 'currentPostInfoQuery',
  get: async ({ get }) => {
    const response = await postQuery({
      postID: get(currentPostIDState),
    })
    return response
  },
})

// 通过参数完成数据的请求
const currentPostInfoWithParamQuery = selectorFamily<Post, number>({
  key: 'currentPostInfoWithParamQuery',
  get: (postID) => async () => {
    const response = await postQuery({ postID })

    return response
  },
})

export function PostInfo() {
  // const post = useRecoilValue(currentPostInfoQuery)
  const post = useRecoilValue(currentPostInfoWithParamQuery(3))

  return (
    <div>
      <h2>{post.title}</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <strong>{post.createdAt} </strong> <em style={{ marginLeft: 12 }}>{post.views}</em>
      </div>
    </div>
  )
}
