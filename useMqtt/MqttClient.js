import * as mqtt from "mqtt/dist/mqtt.js";
import config from "./config";
import { LiveStatusHandle} from "./subscribe";

// 订阅列表，key表示主题名，value为处理函数
const subscribeMap = {
  LiveStatus:LiveStatusHandle
};
const { host, port, options, endpoint, agreement } = config;
class MqttClient {
  constructor() {
    // 连接对象
    this.client = null;
    // 配置
    this.config = config;
    // 订阅消息的回调函数
    this.subscribeMap = subscribeMap;
    this.subscribes = Object.keys(subscribeMap);
    this.subscribesFn = Object.values(subscribeMap);
    // 发布主题历史记录
    this.publishLog = [];
    // 订阅主题历史记录
    this.subscribeLog = [];
  }

  /**  初始化连接、订阅  **/
  init() {
    this.client = mqtt.connect(
      `ws://${host}:${port}${endpoint}`,
      options
    );
    this.onConnect();	
  }

  /**  监听连接  **/
  onConnect() {
    this.client.on("connect", (e) => {
      console.log("成功连接服务器:", e);
      /**  订阅  **/
      if (this.subscribes) {
        this.client.subscribe(this.subscribes, (err, res) => {
          if (!err) {
            console.log("订阅消息成功");
            this.onSubscribeMessage();
          } else {
            console.log("消息订阅失败！");
          } 
        });
      }
    });
    this.onMqttError();
    this.onReconnect();
  }

  /**  监听订阅消息  **/
  onSubscribeMessage() {
    this.client.on("message", (topic, message) => {
        console.log(`收到来自${topic}的信息`, message.toString());
      if (message && this.subscribeMap[topic]) {
        this.addSubscribeLog(topic, message, 1);
        this.subscribeMap[topic](this, message.toString());
      }
    });
  }

  /**  监听连接失败事件  **/
  onMqttError() {
    this.client.on("error", (error) => {
      console.log("连接失败：", error);
      this.client.end();
    });
  }

  /**  监听重连事件  **/
  onReconnect() {
    this.client.on("reconnect", (error) => {
      console.log("正在重连:", error);
    });
  }

  /**
   * @description 发布主题
   * @param {string} topic 主题名
   * @param {string} message 消息
   */
  publish(topic, message) {
    if (!this.isConnected()) return;
    this.client.publish(topic, message, (err) => {
      if (!err) {
        console.log(`主题${topic}发布成功 `);
        this.addPublishLog(topic, message, 0);
      } else {
        console.log(`主题${topic}发布失败`);
        this.addPublishLog(topic, message, 1);
      }
    });
  }

  /**
   * @description 取消订阅
   * @param {string} topic 主题名
   */
  unsubscribe(topic) {
    this.client.unsubscribe(topic, (err) => {
      if (!err) {
        console.log(`主题${topic}取消订阅成功`);
      } else {
        console.log(`主题${topic}取消订阅失败`);
      }
    });
  }

  /**
   * @description 断开连接
   */
  unConnect() {
    this.client.end();
    this.client = null;
    console.log("服务器已断开连接！");
  }

  /**
   * @description 判断客户端当前是否连接
   * @return {boolean} 是否连接
   */
  isConnected() {
    if (!this.client.connected) {
      console.log("客户端未连接!");
      return false;
    }
    return true;
  }

  /**
   * @description 新增发布主题历史记录
   * @param {string}  topic 主题名
   * @param {string}  message 消息
   * @param {boolean} status 成功状态，1为成功，0为失败
   */
  addPublishLog(topic, message, status) {
    this.publishLog.push({ topic, message, status });
  }

  /**
   * @description 新增订阅主题历史记录
   * @param {string} topic 主题名
   * @param {string} message 消息
   * @param {boolean} status 成功状态，1为成功，0为失败
   */
  addSubscribeLog(topic, message, status) {
    this.subscribeLog.push({ topic, message, status });
  }
  
}

export default MqttClient;
