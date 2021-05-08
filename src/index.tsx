import './index.css'

// import App from './main/redux/App'
// import App from './main/recoil/App'
import App from './main/mobx/App'

import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { Counter } from './main/recoil/Counter'
import { PostInfo } from './main/recoil/Post'

ReactDOM.render(
  <RecoilRoot>
    <React.Suspense fallback={<div>Loading...</div>}>
      <PostInfo />
    </React.Suspense>
  </RecoilRoot>,
  document.getElementById('root')
)
