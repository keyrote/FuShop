import ajax from './ajax'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax('position/${geohash}')
    // 2、获取食品分类列表
export const reqFoodTypes = () => ajax('/index_category')
    // 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax('/shops', { latitude, longitude })
    // 4、根据经纬度和关键字搜索商铺列表
export const req = () => ajax('')
    // 5、获取一次性验证码
export const req = () => ajax('')
    // 6、用户名密码登陆
export const req = () => ajax('')
    // 7、发送短信验证码
export const req = () => ajax('')
    // 8、手机号验证码登陆
export const req = () => ajax('')
    // 9、根据会话获取用户信息
export const req = () => ajax('')
    // 10、用户登出
export const req = () => ajax('')