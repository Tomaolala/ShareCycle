import {
	myRequest
} from './http.js'

export function addFault(fault) {
	return myRequest({
		method: "Post",
		url: "/fault/addFault",
		data: {
			fault
		}
	})

}

export function getFault(page,size,params) {
	return myRequest({
		method: "Post",
		url: "/fault/getFault",
		data:{
			page,
			size
		}
	})
}
