<template>
	<view>
		<scroll-view scroll-y="true" class="scrollView">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="item in slider" :key="item.id">
					<navigator class="slider-img" :url="item.linkUrl">
							<image  lazy-load="true" :src="item.picUrl" class="slider-img"></image>  
					</navigator>
				</swiper-item>
			</swiper>
			<view class="recommend-list">
			    <h1 class="list-title">热门歌单推荐</h1>
				<view class="item" v-for="item in discList" :key="item.dissid">
					<view class="icon">
					<!-- #ifdef H5 -->  
						<img v-lazy="item.imgurl" mode="" class="icon-img" ></img>
					<!-- #endif --> 
					<!-- #ifdef APP-PLUS -->  
					<image  :lazy-load="true" :src="item.imgurl" class="icon-img"></image>  
					<!-- #endif --> 
					<!-- #ifdef MP -->  
					<image  :lazy-load="true" :src="item.imgurl" class="icon-img"></image>  
					<!-- #endif --> 
					</view>

					<view class="text">
						<view class="name" v-html="item.creator.name"></view>
						<view class="desc text-hiddle" v-html="item.dissname"></view>
						
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import { recommendInit } from '../../api/recommend.js'
	export default {
		data() {
			return {
				slider: [],
				songList: [],
				discList: []
			}
		},
		onLoad(id) {
		},
		mounted() {
			if(this.slider.length === 0) {
				recommendInit(this); 
			}
		},
		methods: {
		
		},
		components: {
	
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.slider-img {
		width: 100%
		height : 100%
	}
	.scrollView {
		height : 1060upx;
	}	
	.list-title {
	height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: #ffcd32;
	}
		
		
	.item{
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 0 20px 20px 20px;
	}
		
	.icon{ 
		flex: 0 0 60px;
		width: 60px;
		padding-right: 20px;
	}
	.icon-img{
		width: 60px;
		height: 60px;
	}
	.text {
		    display: flex;
			-ms-flex-direction: column;
			flex-direction: column;
			-ms-flex-pack: center;
			justify-content: center;
			-ms-flex: 1;
			flex: 1;
			line-height: 20px;
			font-size: 14px;
			line-height: 20px;
	}
	.text .name {
		 margin-bottom: 10px;
		color: #fff;
	}
	.text .desc {
		    color: rgba(255,255,255,0.3);
	}
</style>
