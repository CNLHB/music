<template>
	<view>
		<MusicList :musics="songs" :singer="singer"></MusicList>
<!-- 		<view class="filter" :style="{transform: 'translateY(0%)'}">
			<image :src="singer.avatar" mode="" class="bg-img"></image>
		</view>
		<scroll-view scroll-y class="scroll-song" @scrolltolower="addPage" @scrolltoupper="subPage" @scroll="transTop">
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
		</scroll-view> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getSingerDetail } from '../../api/singer.js'
	import MusicList from '../music-list/music-list.vue'
	export default {
		data() {
			return {
				songs: [],
				page: 1,
				pageSize: 10,
				scrollTop: 0
			}
		},
		onLoad(data) {
			getSingerDetail(this, data.id)
			if(this.singer.name) {
				uni.setNavigationBarTitle({
					title: this.singer.name
				});
			}
		},
		mounted() {
			
		},
		methods: {
			addPage() {
				if(this.page*this.pageSize > this.songs.length) {
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
			...mapState(["singer"]),
			fliterSong() {
				return  this.songs.filter((item, index)=> {
					if(index >= this.page*this.pageSize) {
						return false
					}else {
						return true
					}
				})
			}
		},
		components:{
			MusicList
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
	height 760upx
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

</style>
