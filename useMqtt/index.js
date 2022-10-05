import { log } from 'mqtt/dist/mqtt'
import MqttClient from './MqttClient'

export default function useMqtt() {
  const client = new MqttClient()
  client.init()
  
  } 	