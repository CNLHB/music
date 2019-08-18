<template>
	<view>
		<mheader></mheader>
		<Tab v-on:show="ifShow" :isShow="isShow"></Tab>
		<Recommend v-if="isShow=='recommend'"></Recommend>
		<Rank v-if="isShow=='rank'"></Rank>
		<Search v-if="isShow=='search'"></Search>
		<Singer v-if="isShow=='singer'"></Singer>
	</view>
</template>

<script>
	import Mheader from '../../components/m-header/m-header.vue'
	import Tab from '../tab/tab.vue'
	import Recommend from '../recommend/recommend.vue'
	import Rank from '../rank/rank.vue'
	import Search from '../search/search.vue'
	import Singer from '../singer/singer.vue'
	export default {
		data() {
			return {
				isShow: 'recommend'

				
			}
		},
		onLoad() {
			
			this.$store.commit('login',{user: 'jack', age: '18'});

		},

		methods: {
			ifShow (msg) {
				this.isShow = msg
			},
			handle () {
				console.log(this.slider)
			}
		},
		components: {
			Mheader,
			Tab,
			Recommend,
			Rank,
			Singer,
			Search
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
	@import '../../common/stylus/variable.styl';
</style>
