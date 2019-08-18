import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {playMode} from '../api/config.js'
Vue.use(Vuex)
	
	
const store = new Vuex.Store({
	state: {
			login: false,
			singer: {},
			userInfo: {
			},
			playing: false,//播放状态
			fullScree: false,
			playList: [],
			sequenceList: [],
			mode: playMode.sequence,//播放模式
			currentIndex: -1// 当前播放歌曲
	},
	mutations: {
		login(state, provider) {
			state.login = true;
			state.userInfo = provider
		},
		setSinger(state, provider) {
			state.singer = provider
		},
		setPlaying(state, Playing) {
			state.playing = Playing
		},
		setFullScree(state, FullScree) {
			state.fullScree = FullScree
		},
		setPlayList(state, PlayList) {
			state.playList = PlayList
		},
		setSequenceList(state, SequenceList) {
			state.sequenceList = SequenceList
		},
		setPlayMode(state, PlayMode) {
			state.mode = PlayMode
		},
		setCurrentIndex(state, CurrentIndex) {
			state.currentIndex = CurrentIndex
		}
	},
	getters:{
		currnSong(state) {
			return state.playList[state.currentIndex] || {}
		}
	},
	strict: true,
	plugins: [createLogger()]
})
export default store