import {
	myRequest
} from './http.js'
import dayjs from 'dayjs'
export function login(options) { //登录
	return myRequest({
		url: '/user/userLogin',
		method: 'Post',
		data: {
			id: options.id,
			password: options.password
		}
	})
}
export function isAdminExist(id) {
	return myRequest({
		url: '/user/findUserById',
		method: 'GET',
		data: {
			id
		}
	})
}
export function signUpUser(options) {
	return myRequest({
		url: '/user/addUser',
		method: 'Post',
		data: {
			id: options.id,
			userPhone: options.userPhone,
			password: options.password,
			role: 'user',
			ctime: dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss')
		}
	})
}
