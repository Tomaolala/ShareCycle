import {
	myRequest
} from './http.js'

export function login(config) { //登录
	return myRequest({
		url: 'login',
		method: 'post',
		data: config
	})
}
export function isAdminExist(id) {
	return myRequest({
		url: '/user/findUserById',
		method: 'GET',
		data:{
			id
		}
	})
}
