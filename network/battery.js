import {
	myRequest
} from './http.js'

export function getBattery(options){
	return myRequest({
		method:"Post",
		url:"/battery/getBattery",
		data:options
	})
	
}