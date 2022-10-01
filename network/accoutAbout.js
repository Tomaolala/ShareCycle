import {
	myRequest
} from './http.js'
/**
 * 注册时初始化用户表
 * @param {*} id 
 */
export function initAccout(id) {
	return myRequest({
		url: '/accout/initAccout',
		method: 'Post',
		data: {
			id,
			userId: '默认用户',
			ctime: dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss')
		}
	})
}
/**
 * @param {Object} id
 * 通过id获取账户信息
 */
export function getAccoutById(id) {
	return myRequest({
		url: '/accout/getAccoutById',
		method: 'GET',
		data: {
			id
		}	
	})
}
/**
 * 
 * @param {*} id 
 * @param {*} money 
 * 修改账号金额
 */
export function changeMoney(id,money){
	return myRequest({
		url: '/accout/changeMoney',
		method: 'Post',
		data: {
			id,
			money
		}	
	})
}