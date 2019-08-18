import { http } from './config.js'	
//获取轮播图，排行榜
export const recommendInit = (_this) => {
				let url =  [ http + '/slider',  http + '/getDiscList']
				uni.request({
					url: url[0],
					success: (data) =>{
						_this.slider = data.data.data.slider
						_this.songList = data.data.data.songList
					},
					fail() {
						console.log('err')
					}
				});
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: url[1],
					success: (data) =>{
						_this.discList = data.data.data.list
					},
					fail() {
						console.log('err')
					},
					complete() {
						uni.hideLoading();
					}
				});
			}