import { log } from 'mqtt/dist/mqtt'
import MqttClient from './MqttClient'
import Vue from "vue"
export default  function useMqtt() {
  const client =   new MqttClient()
		client.init()
		Vue.prototype.$mqtt = client
  } 	