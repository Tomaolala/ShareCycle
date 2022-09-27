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
export function getAccoutById(id) {
	return myRequest({
		url: '/accout/getAccoutById',
		method: 'GET',
		data: {
			id
		}	
	})

}
