import { http } from './config.js'	
import { createSong } from '../common/js/song.js'
const url = [http + '/SingerList',http + '/getDetail?singerId=']
export const  getSingerList = (_this) => {
	uni.showLoading({
		title: "加载中"
	})
	uni.request({
  	url: url[0],
	success: (res) => {
		_this.singers = _this._normalizeSinger(res.data.data.list)
	},
	fail(err) {
		console.log(err)
	},
	complete() {
		uni.hideLoading()
	}
  })
}
export const  getSingerDetail = (_this, singerId) => {
	uni.showLoading({
		title: "加载中"
	})

	uni.request({
  	url: url[1] + singerId,
	success: (res) => {
		_this.songs = _normalizeSongs(res.data.data)
	},
	fail(err) {
		console.log(err)
	},
	complete() {
		uni.hideLoading()
	}
  })
  function _normalizeSongs(list) {
    let ret = []
    list.forEach((item) => {
      let {musicData} = item
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    return ret
  }
  
}