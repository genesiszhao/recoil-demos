import { User } from '../types'

const userInfoList = [{
    id: 0,
    name: 'ZhaoYi',
    age: 27,
    gender: 'male',
    email: 'yee.zy@icloud.com',
    phone: '18001890741',
    watchs: [1,2]
},{
    id: 1,
    name: 'LiLei',
    age: 30,
    gender: 'male',
    email: 'lilei123@outlook.com',
    phone: '18555555555',
    watchs: [2]
},
{
    id: 2,
    name: 'HanMeiMei',
    age: 31,
    gender: 'famale',
    email: 'hmm123@outlook.com',
    phone: '1877777777',
    watchs: [0]
}
]

type userQueryParams = {
    userID: number
}


export function userQuery({ userID} : userQueryParams) {
    const currentUser = userInfoList[userID]

    return new Promise<{
        data: User | null,
        error?: Error
    }>((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve({
                    data: currentUser
                })
            } catch (error) {
                reject({
                    data: null,
                    error: error
                })
            }
        }, 1200);
    })
}   