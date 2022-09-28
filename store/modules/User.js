export default {
	state: {
		UserId: () => {
			let UserId=""
			uni.getStorage({
				key: "UserId",
				success(res) {
					UserId = res.data
				}
			})
			return UserId
		}
	},
	getters: {

	},
	mutations: {
		updateUserId(state, options) {
			state.UserId = options.UserId
		}
	},
	actions: {

	}
}
