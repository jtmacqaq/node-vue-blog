import { request } from "./request";

//请求用户信息

export function getuserinfo(){
    return request({
        url:'my/userinfo'
    })
}