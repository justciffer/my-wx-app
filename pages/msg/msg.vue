<template>
	<view>
        <view class="chat-list"  >
			<view class="chat" v-for="(chat,index) in chatList.data" :key="index">
				<view class="row" @tap="toChat(chat)">
					<view  class="right">
						<view class="top">
							<view class="msg">{{chat.name}}</view>
							<view class="username">{{chat.username}}</view>
						</view>
						<view class="bottom">
							<view class="time">{{chat.create_date}}</view>
							<view class="tis" v-if="chat.read==0"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchForm:{
					current:1,
					user_id:uni.getStorageSync('user_id')
					},
				chatList:{}
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			
			if (this.searchForm.current >= this.chatList.totalPages) {
				uni.showToast({ title: '到底了' });
				return false;
			}
			 
			 uni.showLoading({
			 	title: '加载中...'
			 });
			 let _self=this;
			 _self.searchForm.current++;
			 this.$http.post('admin/sys_sms/pageData', _self.searchForm,function(datas){
					_self.chatList.data = _self.chatList.data.concat(datas.data);
					_self.chatList.totalPages = datas.totalPages;
					uni.hideLoading();
			 });
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...'
			});
			
			let _self=this;
			this.$http.post('admin/sys_sms/pageData', _self.searchForm,function(datas){
					_self.chatList = datas;
					uni.hideLoading();
			});
		
		},
		methods: {
			toChat(chat){
				uni.navigateTo({
					url:"chat/chat?name="+chat.username
				})
			}
		}
	}
</script>

<style  lang="scss">
	page{
		background-color: rgba(0,0,0,0);
	}
	.chat-list{
		width: 94%;
		padding: 0 3%;
		.chat{
			width: 100%;
			height: 100upx;
			padding: 20upx 0;
			border-bottom: solid 1upx #eaeaea;
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 100upx;
					height: 100upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
	}
</style>
