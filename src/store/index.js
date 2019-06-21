import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isMainHeader: false,
    isReservationActive: false,
    mqttClient: null,
    senseData: {
      temperature: 0,
      water: 0
    }
  },
  getters: {
    getMqttSenseData (state) {
      // console.log(JSON.stringify(state.senseData))
      return state.senseData
    }
  },
  mutations: {
    setIsMainHeader (state, {isMainHeader = false}) {
      state.isMainHeader = isMainHeader
    },
    setIsReservationActive (state, {isReservationActive = false}) {
      state.isReservationActive = isReservationActive
    },
    setMqttClient (state, {mqttClient = {}}) {
      state.mqttClient = mqttClient
    },
    setMqttSenseData (state, {data = {}}) {
      state.senseData = data
    }
  }
})
