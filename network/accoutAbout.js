import {
	myRequest
} from './http.js'
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
