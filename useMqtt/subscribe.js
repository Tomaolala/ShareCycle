export function test1(client, res) {
	// 对应的消息进行处理
}

/**
 * 故障处理
 */
export function vstatusHandle(client,res)
{
	// 对res进行处理
	uni.$emit("updateVstatus",res)
	//这里要向后端发请求输入数据库
}