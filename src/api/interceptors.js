/*
 * @Description: 请求全局拦截器
 * @Author: xfchen
 * @Date: 2018-10-22 11:25:45
 * @LastEditors: xfchen
 * @LastEditTime: 2018-11-06 10:40:02
 */
export default (router) => {
    router.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    )
    router.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error)
        }
    )
}
