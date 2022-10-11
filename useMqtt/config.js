/**
 * h5情况下使用ws ，app使用wx
 */

const config = {
	host:"192.168.1.100",
	// host: '192.168.188.1', 他们的服务器
	// 这是本地emqx的服务器，能正常使用 比赛不知道
	port: '1884',
	// port:""  此处为后端端口 走两套
	endpoint: '/mqtt',
	agreement:"ada",
	/**  客户端连接选项(默认选项)  **/
	options: {
		clientId: 'io-app',
		keepalive: 60,
		reschedulePings: true,
		protocolId: 'MQTT',
		protocolVersion: 4,
		username:"admin",
		password:"123",
		reconnectPeriod: 1000,
		connectTimeout: 30 * 1000,
		clean: false,
		keepAliveInterval:10,
		resubscribe: true
	}
}

export default config
