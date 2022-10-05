import {
	myRequest
} from './http.js'

export function getBattery(id){
	return myRequest({
		method:"Post",
		url:"/battery/getBattery",
		data:{
			number:id
		}
	})
	
}