<template>
	<view>


		<scroll-view scroll-y class="scroll-song" @scrolltolower="addPage" @scrolltoupper="subPage" @scroll="transTop">
					<view class="filter" :style="{transform: 'translateY(0%)'}">
				<image :src="singer.avatar" mode="" class="bg-img"></image>
				<view class="play-wrapper">
					<view class="play" v-show="musics.length>0">
						<text></text>
						<text class="textall">
							随机播放全部
						</text>
					</view>
				</view>
			</view>
			<view class="song-list-wrapper">
				<view class="song-list" v-for=" item in fliterSong" :key="item.id">
					<view class="content">
						<view class="name">
							{{item.name}}
						</view>
						<view class="desc">
							{{item.singer}}-{{item.album}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getSingerDetail } from '../../api/singer.js'
	export default {
		props:{
			musics: {
				type: Array
			},
			singer: {
				type: Object
			}
		},
		data() {
			return {
				title: '',
				avatar: '',
				page: 1,
				pageSize: 10,
				scrollTop: 0
			}
		},
		onLoad(data) {
			getSingerDetail(this, data.id)
			if(this.musics.name) {
				uni.setNavigationBarTitle({
					title: this.musics.name
				});
			}
			console.log(this.singer)
		},
		mounted() {
			
		},
		methods: {
			addPage() {
				if(this.page*this.pageSize > this.musics.length) {
					return false
				}else{
					this.page++
				}
			},
			subPage() {
				this.page = 2
			},
			transTop() {
				
			}
		},
		computed: {
			fliterSong() {
				return  this.musics.filter((item, index)=> {
					if(index >= this.page*this.pageSize) {
						return false
					}else {
						return true
					}
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"
  .bg-img {
	  width : 100%
	  height : 240px
  }
.scroll-song {
	height 1260upx
	
}
     .filter{
	        // position: absolute
			// top: 0
			// left: 0
			// height: 100%
			width: 100%
			background: rgba(7, 17, 27, 0.4)	  
	  }
    .song-list-wrapper{
        padding: 20px 30px
	}
	.song-list-wrapper .content{
		 flex: 1;
		line-height: 20px;
	overflow: hidden;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
	}
	.content .name {
	text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #fff;
	font-size: 14px;
    line-height: 20px;
	}
	.content .desc {
			font-size: 14px;
		line-height: 20px;
		 text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: 4px;
		color: rgba(255,255,255,0.3);
	}
     .loading-container{
	  position: absolute
		 width: 100%
		 top: 50%
		 transform: translateY(-50%) 
	  }
	.play-wrapper{
	position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
	}
	.play {
	box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffcd32;
    color: #ffcd32;
    border-radius: 100px;
    font-size: 0;
	}
	.textall {
		 display: inline-block;
		vertical-align: middle;
		font-size: 12px;
	}
</style>
