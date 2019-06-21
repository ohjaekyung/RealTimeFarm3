import AWS from 'aws-sdk'
import AWSIoTData from 'aws-iot-device-sdk'
import AWSConfiguration from './AwsConfiguration.js'
import store from '@/store/'

/* eslint-disable */
class AwsIot {
  mqttClientConnectHandler () {
    alert('connected!!')
    console.log('connect')
    store.state.mqttClient.subscribe('/sense')
  }

  mqttClientReconnectHandler () {
    console.log('reconnect')
  }

  mqttClientMessageHandler (topic, payload) {
    // setMqttSenseData
    let data = payload.toString()
    data = JSON.parse(data)
    // data= JSON.parse(data)
    if (topic === '/sense') {
      console.log(data)
      store.commit('setMqttSenseData', {data: data})
    }
  }

  updatePublishData () {
    var publishTopic = 'test'
    var publishText = 'ttttt'
    store.state.mqttClient.publish(publishTopic, publishText)
  }

  updatePublishTopic () {
    store.state.mqttClient.publish()
  }

  init () {

    let currentlySubscribedTopic = 'test'
    let messageHistory = ''
    let clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1))

    AWS.config.region = AWSConfiguration.region
    const mqttClient = AWSIoTData.device({
      region: AWS.config.region,
      host:AWSConfiguration.host,
      clientId: clientId,
      protocol: 'wss',
      maximumReconnectTimeMs: 8000,
      debug: false,
      accessKeyId: 'AKIAT74CGUOYC5AUN6HW',
      secretKey: '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'
    })
    store.commit('setMqttClient', {mqttClient: mqttClient})

    window.isUndefined = function(value) {
      return typeof value === 'undefined' || typeof value === null
    }


    store.state.mqttClient.on('connect', this.mqttClientConnectHandler)
    store.state.mqttClient.on('reconnect', this.mqttClientReconnectHandler)
    store.state.mqttClient.on('message', this.mqttClientMessageHandler)
  }
}
export default new AwsIot()
