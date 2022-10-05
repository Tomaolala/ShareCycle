import {
	myRequest
} from './http.js'

/**
 * 获取所有的消费订单
 * @param {*} userId 
 */
export function getTotalPay(userId){
	return myRequest({
		url:"/pay/findPayList",
		method:"Post",
		data:{
			user_id:userId
		}
	})
}

export function getAllMoney(userId){
	return myRequest({
		url:"/pay/getTotalPay",
		method:"Get",
		data:{
			userId
		}
	})
}