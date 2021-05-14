import './index.css'

// import App from './main/redux/App'
// import App from './main/recoil/App'
import App from './main/mobx/App'

import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { Counter } from './main/recoil/Counter'
import { UserInfo, UserInfoWithParam, CurrentUserInfo, UserInfoWithoutSuspense } from './main/recoil/UserInfo'
import { MyComponent } from './main/recoil/Snapshot'

ReactDOM.render(
  <RecoilRoot>
    <Counter />
  </RecoilRoot>,
  document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'))

// ReactDOM.render(
//   <RecoilRoot>
//     <React.Suspense fallback={<div>Loading...</div>}>
//       {/* <UserInfo />
//       <UserInfoWithParam userID={0} />
//       <UserInfoWithParam userID={1} />
//       <UserInfoWithParam userID={2} /> */}
//       {/* <CurrentUserInfo /> */}
//       {/* <UserInfoWithoutSuspense userID={0} /> */}
//       {/* <MyComponent /> */}
//     </React.Suspense>
//   </RecoilRoot>,
//   document.getElementById('root')
// )
