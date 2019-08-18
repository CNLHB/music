<template>
    <view class="tab">
	    <view  class="tab-item" v-for="(item,index) in msg" :key="index" @click="changeType(item.type)" :class="{'router-link-active': isShow === item.type}">
			<text class="tab-link">{{item.name}}</text>
		</view>
    </view>
</template>

<script type="text/ecmascript-6">
  export default {
		data() {
			return {
				msg: [{name: '推荐', type: 'recommend'}, {name: '歌手', type: 'singer'}, {name: '排行', type: 'rank'}, {name: '搜索', type: 'search'}]
			}
		},
	    props: {
			isShow: {
				type: String,
				default: 'recommend'
			}
		},
	    methods:{
		  changeType:function(type){
			  console.log(type)
			this.$emit("show", type)
			},
	  }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>