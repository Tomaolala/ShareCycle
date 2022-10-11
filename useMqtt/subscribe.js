import {transformData} from "./utils.js"
/**
 * 故障处理
 */
export function LiveStatusHandle(client,res)
{
	console.log(transformData(res));
	// 对res进行处理
	uni.$emit("updateVstatus",transformData(res))
	//这里要向后端发请求输入数据库
}