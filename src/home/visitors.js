const axios = require("axios")
const { getClientIp } = require("../../libs/utils")
module.exports = (app, models) => {
  /**
   * 日活 PV
   * PV:页面访问量,即PageView,用户每次对网站的访问均被记录,用户对同一页面的多次访问,访问量累计。
   * UV:独立访问用户数:即UniqueVisitor,访问网站的一台电脑客户端为一个访客。
   * @description 创建更新数据
   */
  app.get("/visitor/save", async (req, res, next) => {
    const visitor_ip = getClientIp(req)
    let address_detail = null
    let point = null
    if (visitor_ip.length > 5) {
      await axios.get(`http://api.map.baidu.com/location/ip?ak=6SzbKrxC5vwupOECpO4AhL8sPDyWf2Xa&ip=${visitor_ip}&coor=gcj02`).then(res => {
        if (res.data.content) {
          address_detail = res.data.content.address_detail;
          point = res.data.content.point
        }
      })
    }
    let count = 1;

    // 如果ip相同，获取当前的count
    let visitor = await models.visitor.findOne({
      where: {
        ip: visitor_ip
      }
    })

    let id = null;
    if (visitor) {
      id = visitor.dataValues.id
      count = visitor.dataValues.count + 1;

      try {
        // 已经有数据更新
        await visitor.update({
          ip: visitor_ip,
          address_detail: JSON.stringify(address_detail),
          point: JSON.stringify(point),
          count: count
        })
        res.json({
          message: "更新++++++"
        })
      } catch (error) {
        next(error);
      }
    } else {
      // 没有数据时创建
      try {
        await models.visitor.create({
          ip: visitor_ip,
          address_detail: JSON.stringify(address_detail),
          point: JSON.stringify(point),
          count: count
        })
        res.json({
          message: "新增++++++"
        })
      } catch (error) {
        next(error);
      }
    }
  })
}