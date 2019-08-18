<template>
		<scroll-view class="listview scrollView" scroll-y="true" :scroll-into-view="keys" @scroll="scrollView" @scrolltolower="tolower">
			<view class="list-group" v-for="(group, index) in datas" :key="group.title">
				<view v-if="index==0" id="re" class="list-group-title" >
					{{group.title}}
				</view> 
				<view  v-else class="list-group-title" :id="group.title">
					{{group.title}}
				</view>
				<view class="list-group-item" v-for="item in group.items" :key="item.name" @click="selectItem(item)">
					
						<!-- #ifdef H5 -->  
							<img v-lazy="item.avatar" mode="" class="avatar" ></img>
						<!-- #endif --> 
						<!-- #ifdef APP-PLUS -->  
							<image  :lazy-load="true" :src="item.avatar" class="avatar"></image>  
						<!-- #endif --> 
						<!-- #ifdef MP -->  
							<image  :lazy-load="true" :src="item.avatar" class="avatar"></image>  
						<!-- #endif --> 
					<text class="name">{{item.name}}</text>
				</view> 
			</view>
		<view class="list-shortcut">
				<view class="item" 
					v-for="(item, indexs) in shortcutList"
					 :key="indexs" @tap="tapIndex(item)"
					  :class="{current: newKeys==item}"
					  >
					
					{{item}}
				</view>
			</view>
		</scroll-view>

</template>

<script type="text/ecmascript-6">

  export default {
	 data() {
	    return {
		  keys: 're',
		  creutIndex: 0,
		  scrollKey: true,
		  scrollTop:0
	    }
	},
    props: {
      datas: {
        type: Array
      }
    },
    computed: {
      shortcutList() {
        return this.datas.map((group) => {
          return group.title.substr(0, 1)
        })
      },
	  newKeys() {
		  return this.keys == 're' ? '热' : this.keys
	  },
	  newTop() {
		return function (int) {
			 let lengths = this.datas.map((item, index) => {
						 return item.items.length * 70 + 60
			})
			 return lengths.reduce((num, Litem, Lindex)=>{
				 if(Lindex > int) {
					 return num
				 }else{
					 return num + Litem
				 }
			 },0)
		}
	  },
	  lengths () {
		  return this.datas.map((item, index) => {
					return item.items.length * 70 + 60
					})
					.reduce((num, item) => {
				return  num + item
			},0)
	  }
	  
    },
	methods: {
		scrollView(event) {
			let newScrollTop = event.detail.scrollTop;
			if(newScrollTop - this.scrollTop  > 0) {
				this.scrollTop = newScrollTop;
				if(this.scrollTop > (this.newTop(this.creutIndex) - 30)){
					this.creutIndex >= this.datas.length ? this.creutIndex: this.creutIndex++ ;
					this.tapIndex((this.shortcutList)[this.creutIndex]);
				}
			}else {
				this.scrollTop = newScrollTop;
				if(this.scrollTop < this.newTop(this.creutIndex)){
						this.creutIndex <= 0 ? 0 : this.creutIndex-- ;
						this.tapIndex((this.shortcutList)[this.creutIndex]);
					}
			}

		},
		tapIndex(event) {
			if(event == '热'){
				this.keys = 're'
			}else{
			this.keys = event
			}
		},
		tolower() {
			uni.showToast({
                icon:"none",
                title:"已经到底了"
            })
		},
		selectItem(item) {
			this.$emit('select', item)
		}
		
	},

    created() {

    },
    watch: {

    },
    components: {

    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .listview
    position: relative
    width: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: fixed
      z-index: 999
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
	   /* #ifdef MP */
		   .list-shortcut
	  		  transform: translateY(-40%)
	  /* #endif */
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: fixed
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
	.scrollView{
		height : 1000upx;
	}

</style>
