import axios from 'axios'
import interceptors from './interceptors'
// let baseURL = 'http://mock.eolinker.com/3JyfRqj16acdfaa2b7324c6b204b7da2a624ac483d8e5d7?uri='
let baseURL = '/shopAdmin/api'
let service = axios.create({
  baseURL // api 的 base_url
//   timeout: 10000 // 请求超时时间
})
interceptors(service);
export default service;
