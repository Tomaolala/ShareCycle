import {
	myRequest
} from './http.js'

/**
 * 获取所有的电车并渲染
 */
export  function getCycAll(){
	return myRequest({
		url:"/device/getAllBikes",
		method:"Get"
	})
}