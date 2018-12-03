/*
 * window、document等信息
*/
export function getWindowInfo() {
    return {
        d_width: document.body.clientWidth || document.documentElement.clientWidth,
        d_height: document.body.clientHeight || document.documentElement.clientHeight,
        w_width: window.innerWidth,
        w_height: window.innerHeight,
        leftPos: (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX, //浏览器距离屏幕左边距离
        leftPos: (typeof window.screenTop === 'number') ? window.screenTop : window.screenY //浏览器距离屏幕顶部距离
    }
}
export function isDevelopment () {
    return process.env.NODE_ENV === 'development'
}
/*
 * 过滤前后空格
*/
export let trim = function (text) {
    return text.toString().replace(/^\s+|\s+$/gm, '');
}
/*
 * 深拷贝
*/
export let deepCopy = function (obj) {
    let proto = Object.getPrototypeOf(obj);
    return Object.assign({}, Object.create(proto), obj);
}
/*
 * 非空
*/
export let isDef = function (v) {
  return v !== undefined && v !== null && v !== ''
}
/*
 * 布尔值true判断
*/
export let isTrue = function isTrue(v) {
  return v === true
}
/*
 * 布尔值false判断
*/
export let isFalse = function isFalse(v) {
  return v === false
}
/*
 * 是否为基本类型
*/
export let isPrimitive = function isPrimitive(v) {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean'
  )
}
/*
 * 是否为对象
*/
export let isObject = function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
/*
 * 分割IP与掩码
*/
export function spliceIpAndMask(ipAddress) {
    if (ipAddress) {
        let netIp = trim(ipAddress)
        let index = netIp.lastIndexOf('/');
        if (index !== -1) {
            let prefix = netIp.substring(index + 1);
            let ip = netIp.substring(0, index);
            return {
                prefix,
                ip
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/*
 * 正则
*/
export let reg = {
    ipv4AndMask: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([1-9]|1[0-9]|2[0-9]|3[0-2])$/,
    ipv6AndMask: /^(([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4})\/([1-9]|1[0-9]|2[0-9]|3[0-2])$/,
    ipv4: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    ipv6: /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)|::([\da−fA−F]1,4:)0,4((25[0−5]|2[0−4]\d|[01]?\d\d?)\.)3(25[0−5]|2[0−4]\d|[01]?\d\d?)|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)|([\da−fA−F]1,4:)2:([\da−fA−F]1,4:)0,2((25[0−5]|2[0−4]\d|[01]?\d\d?)\.)3(25[0−5]|2[0−4]\d|[01]?\d\d?)|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)|([\da−fA−F]1,4:)4:((25[0−5]|2[0−4]\d|[01]?\d\d?)\.)3(25[0−5]|2[0−4]\d|[01]?\d\d?)|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}|:((:[\da−fA−F]1,4)1,6|:)|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)|([\da−fA−F]1,4:)2((:[\da−fA−F]1,4)1,4|:)|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)|([\da−fA−F]1,4:)4((:[\da−fA−F]1,4)1,2|:)|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?|([\da−fA−F]1,4:)6:/
}
 /*
 * 正则校验
 */
export let regText = function (reg, text) {
    if (!reg.test(text)) {
        return false
    };
    return true;
}
 /*
 * 获取key值
 */
export let getKeys = function (obj) {
    return Object.keys(obj);
}
/**
 * 初始化配置数据
 * @param r 校验规则对象
 * @param v 被校验对象
 */
export function regInformation(r, v) {
    if (r.success) delete r.success;
    let obj = Object.assign({}, r);
    formatObj(obj, v);
    obj.success = true;
    getKeys(obj).forEach(key => {
        if (key !== 'success') {
            let result = {
                flag: true
            }
            let item = obj[key];
            let value = item.value;
            if (!item.hasOwnProperty('isNull')) { //默认不能为空
                item.isNull = false;
            }
            if ((!isDef(value)) && !item.isNull) { //属性为空时
                item.msg = '不能为空';
                result.flag = false;
                item.result = result;
            } else {
                if (item.isNull && !item.value) { //配置了可为空后，当值为空时，不做校验
                    item.result = result;
                } else {
                    main(item, result);
                }
            }
        }
    })
    isSuccess();
    /*
       格式化对象
     */
    function formatObj () {
        for (let key in obj) {
            if (v[key] || v[key] === '') obj[key].value = v[key];
        }
    }
    /*
        校验主函数
    */
    function main(item, result) {
        let value = trim(item.value);
        if (item.reg === '') { //非空校验
            formatResult(true, result, item);
        } else if (Array.isArray(item.reg)) {
            if (item.specific) {
                formatResult(contrastValue(item.reg, value), result, item);
            } else {
                let max = Math.max.apply(null, item.reg),
                    min = Math.min.apply(null, item.reg);
                formatResult((value >= min && value <= max), result, item);
            }
        } else if (item.reg.constructor.name == 'RegExp') {
            if (item.isIpv6) { //IPV6校验
                let ipAndMask = spliceIpAndMask(value);
                formatResult(regText(item.reg, ipAndMask.ip), result, item); //IP校验
                let max = Math.max.apply(null, item.reg2),
                    min = Math.min.apply(null, item.reg2);
                formatResult(ipAndMask.prefix >= min && ipAndMask.prefix <= max, result, item); //掩码校验
            } else {
                formatResult(regText(item.reg, value), result, item);
            }
        } else if (parseFloat(item.reg).toString() !== 'NAN') {
            formatResult((value === item.reg.toString()), result, item);
        } else {
            console.warn('校验格式不正确');
        }
    }
    /*
       特定值校验
     */
    function contrastValue(v1, v2) {
        let flag = false;
        for (let i = 0; i < v1.length; i++) {
            if ((v1[i].toString()) === v2.toString()) {
                flag = true
                break;
            }
        }
        return flag;
    }
    /*
       校验完毕后，对象重赋值
     */
    function formatResult(flag, result, item) {
        if (flag) {
            item.result = result;
        } else {
            result.flag = false;
            item.result = result;
        }
        return result.flag;
    }
    /*
       所有校验完毕后,判断校验是否通过
     */
    function isSuccess() {
        for (let key in obj) {
            if (key !== 'success' && !obj[key].result.flag) {
                obj.success = false
            }
        }
    }
    return obj;
}
/**
 * 将深层次JSON对象转化为单层次对象
 * @param obj JSON对象
 */
export function flatObject(obj) {
    let newObj = {};
    if (obj.constructor.name === 'Object') {
        eachObj(obj);
    } else {
        console.warn('参数类型不正确，只能是JSON对象');
    }
    function eachObj(object) {
        for (let key in object) {
            if (object[key].constructor.name === 'Object') {
                eachObj(object[key])
            } else {
                newObj[key] = object[key];
            }
        }
    }
    return newObj;
}
/**
 * 对象深层递归覆盖旧值
 * @param object1 源JSON对象
 * @param object2 宿JSON对象
 */
export function objRecurisonSearch(object1, object2) {
    let newObj = deepCopy(object1);
    if (object1.constructor.name === 'Object') {
        eachObj(newObj, object2);
    } else {
        console.warn('参数类型不正确，只能是JSON对象');
    }
    return newObj;
    function eachObj(object1, object2) {
        let maxKeysObj = getMaxKeys(object1, object2);
        for (let key in maxKeysObj) {
            if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
                if (object1[key].constructor.name == 'Object' && object2[key].constructor.name == 'Object') {
                    eachObj(object1[key], object2[key]);
                } else {
                    object1[key] = object2[key];
                }
            } else if (!object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
                object1[key] = object2[key];
            }
        }
    }
    function getMaxKeys(object1, object2) {
        if (Object.keys(object1).length >= Object.keys(object2).length) {
            return object1;
        } else {
            return object2;
        }
    }
}

