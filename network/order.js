import {
	myRequest
} from './http.js'

export function findOrderByUserId(id){
	return myRequest({
		method:"Get",
		url:"/order/findOrderByUserId",
		data:{
			id
		}
	})
	
}