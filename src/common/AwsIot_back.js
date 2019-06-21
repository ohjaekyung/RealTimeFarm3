/*
 * Copyright 2015-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

//
// Instantiate the AWS SDK and configuration objects.  The AWS SDK for
// JavaScript (aws-sdk) is used for Cognito Identity/Authentication, and
// the AWS IoT SDK for JavaScript (aws-iot-device-sdk) is used for the
// WebSocket connection to AWS IoT and device shadow APIs.
//
import AWS from 'aws-sdk'
import AWSIoTData from 'aws-iot-device-sdk'
import AWSConfiguration from './AwsConfiguration.js'

/* eslint-disable */
class AwsIot {
  init () {
    console.log('Loaded AWS SDK for JavaScript and AWS IoT SDK for Node.js')

//
// Remember our current subscription topic here.
//
    var currentlySubscribedTopic = 'test'

//
// Remember our message history here.
//
    var messageHistory = ''

//
// Create a client id to use when connecting to AWS IoT.
//
    var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1))

//
// Initialize our configuration.
//
    AWS.config.region = AWSConfiguration.region
    // //
    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: AWSConfiguration.poolId
    // })

//
// Create the AWS IoT device object.  Note that the credentials must be
// initialized with empty strings when we successfully authenticate to
// the Cognito Identity Pool, the credentials will be dynamically updated.
//
    const mqttClient = AWSIoTData.device({
      region: AWS.config.region,
      host:AWSConfiguration.host,
      clientId: clientId,
      protocol: 'wss',
      maximumReconnectTimeMs: 8000,
      debug: true,
      //
      // IMPORTANT: the AWS access key ID, secret key, and sesion token must be
      // initialized with empty strings.
      //
      accessKeyId: 'AKIAT74CGUOYC5AUN6HW',
      secretKey: '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',
    })

    window.mqttClientConnectHandler = function() {
      console.log('connect')
      // document.getElementById("connecting-div").style.visibility = 'hidden'
      // document.getElementById("explorer-div").style.visibility = 'visible'
      // document.getElementById('subscribe-div').innerHTML = '<p><br></p>'
      messageHistory = ''
      mqttClient.subscribe(currentlySubscribedTopic)
    }

//
// Reconnect handler update div visibility.
//
    window.mqttClientReconnectHandler = function() {
      console.log('reconnect')
      // document.getElementById("connecting-div").style.visibility = 'visible'
      // document.getElementById("explorer-div").style.visibility = 'hidden'
    }

//
// Utility function to determine if a value has been defined.
//
    window.isUndefined = function(value) {
      return typeof value === 'undefined' || typeof value === null
    }

//
// Message handler for lifecycle events create/destroy divs as clients
// connect/disconnect.
//
    window.mqttClientMessageHandler = function(topic, payload) {
      console.log('message: ' + topic + ':' + payload.toString())
      messageHistory = messageHistory + topic + ':' + payload.toString() + '</br>'
      // document.getElementById('subscribe-div').innerHTML = '<p>' + messageHistory + '</p>'
    }

//
// Handle the UI for the current topic subscription
//
    window.updateSubscriptionTopic = function() {
      console.log('@@@@@@@@@@@@@@@@@@@@@')
      // var subscribeTopic = document.getElementById('subscribe-topic').value
      // document.getElementById('subscribe-div').innerHTML = ''
      // mqttClient.unsubscribe(currentlySubscribedTopic)
      // currentlySubscribedTopic = subscribeTopic
      // mqttClient.subscribe(currentlySubscribedTopic)
    }

//
// Handle the UI to clear the history window
//
    window.clearHistory = function() {
      if (confirm('Delete message history?') === true) {
        // document.getElementById('subscribe-div').innerHTML = '<p><br></p>'
        messageHistory = ''
      }
    }

//
// Handle the UI to update the topic we're publishing on
//
    window.updatePublishTopic = function() {}

//
// Handle the UI to update the data we're publishing
//
    window.updatePublishData = function() {
      // var publishText = document.getElementById('publish-data').value
      // var publishTopic = document.getElementById('publish-topic').value
      var publishTopic = 'aaa'
      var publishText = 'aaa'
      mqttClient.publish(publishTopic, publishText)
    }
    mqttClient.on('connect', window.mqttClientConnectHandler)
    mqttClient.on('reconnect', window.mqttClientReconnectHandler)
    mqttClient.on('message', window.mqttClientMessageHandler)
  }
}
export default new AwsIot()
