<template>
	<view>
		<Listview @select="selectSinger"  :datas="singers"></Listview>
	</view>
</template>

<script>
	import Listview from '../../components/listview/listview.vue'
	import { getSingerList } from '../../api/singer.js'
	import { mapMutations } from 'vuex'
	const HOT_SINGER_LEN = 10
	const HOT_NAME = '热门'
	class Singer {
	  constructor({id, name}) {
	    this.id = id
	    this.name = name
	    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
	  }
	}
	export default {
		data() {
			return {
				url: 'http://localhost:3000/SingerList',
				singers: []
			}
		},
		onLoad() {
		},
		mounted() {
			getSingerList(this)
		},
		methods: {
		
			_normalizeSinger(list) {
			  let map = {
			    hot: {
			      title: HOT_NAME,
			      items: []
			    }
			  }
			  list.forEach((item, index) => {
			    if (index < HOT_SINGER_LEN) {
			      map.hot.items.push(new Singer({
			        name: item.Fsinger_name,
			        id: item.Fsinger_mid
			      }))
			    }
			    const key = item.Findex
			    if (!map[key]) {
			      map[key] = {
			        title: key,
			        items: []
			      }
			    }
			    map[key].items.push(new Singer({
			      name: item.Fsinger_name,
			      id: item.Fsinger_mid
			    }))
			  })
			  // 为了得到有序列表，我们需要处理 map
			  let ret = []
			  let hot = []
			  for (let key in map) {
			    let val = map[key]
			    if (val.title.match(/[a-zA-Z]/)) {
			      ret.push(val)
			    } else if (val.title === HOT_NAME) {
			      hot.push(val)
			    }
			  }
			  ret.sort((a, b) => {
			    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
			  })
			  return hot.concat(ret)
			},
			selectSinger(singer) {
				this.setSinger(singer)
				uni.navigateTo({
					url: `../singerInfo/singerInfo?id=${singer.id}`,
					animationType: 'slide-in-left',
					animationDuration: 200
				})
			},
			...mapMutations(["setSinger"])
		},
		components: {
			Listview
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	.scrollView {
		height : 1160upx;
	}

</style>
