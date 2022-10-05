<template>
  <view>数据</view>
</template>
<script>
	export default {
		/**
		 *  在这里通过总线接受下层传输的信息
		 * 
		 */
		data(){
			return{
				
			}
		},
		methods:{
			getVstats(){
				uni.$on("updateVstatus",(res)=>{
					console.log(res,"mqtt发的信息");
				})
			}
		},
		mounted() {
			
		}
	}
	
	
</script>
<style lang="scss" scoped></style>
