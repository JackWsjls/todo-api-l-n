module.exports = (app, models) => {
  // 获取用户IP
  const getIPAdress = () => {
    const os = require('os')
    const interfaces = os.networkInterfaces();
    for(const devName in interfaces) {
      const iface = interfaces[devName];
      for(let i=0;i<iface.length;i++){
      const alias = iface[i];
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
          return alias.address;
        }
      }
    }
  }
  // ———————————————完成增删改查功能———————————————————
  /**
   * @description 创建数据
   */
  app.post("/create", async (req, res, next) => {
    const visitor_ip = getIPAdress()
    let { name, deadline, content } = req.body;
    try {
      // 数据持久化到数据库
      console.log(visitor_ip)
      let todo = await models.Todo.create({
        name,
        deadline,
        content,
        ip: visitor_ip
      })
      res.json({
        todo,
        message: "创建成功"
      })
    } catch (error) {
      next(error);
    }
  })

  /**
   * @description 删除数据-逻辑删除
   */
  app.post("/update_status", async (req, res, next) => {
    try {
      let { id, status } = req.body;
      // 数据持久化到数据库
      let todo = await models.Todo.findOne({
        where: {
          id
        }
      })
      const visitor_ip = getIPAdress()
      if (todo && status != todo.status) {
        todo = await todo.update({
          status,
          ip: visitor_ip
        })
      }
      res.json({
        code: '10000',
        todo,
        message: "删除成功"
      })
    } catch (error) {
      next(error)
    }
  })

  /**
   * @description 删除数据-物理删除
   */
  app.post("/delete", async (req, res, next) => {
    try {
      let { id } = req.body;
      console.log(id)
      // 数据持久化到数据库
      let todo = await models.Todo.findOne({
        where: {
          id
        }
      })
      console.log(todo)
      if (todo) {
        todo = await todo.destroy({
          where: {id}
        })
      }
      res.json({
        code: '10000',
        todo,
        message: "删除成功"
      })
    } catch (error) {
      next(error)
    }
  })
  /**
   * @description 编辑数据
   */
  app.post("/update", async (req, res, next) => {
    getIPAdress()
    try {
    let { name, deadline, content, id } = req.body;
        // 数据持久化到数据库
      let todo = await models.Todo.findOne({
        where: {
          id
        }
      })
    if (todo) {
      const visitor_ip = getIPAdress()
      todo = await todo.update({
        name,
        deadline,
        content,
        ip: visitor_ip
      })
    }
      res.json({
        code: '10000',
        todo,
        message: "更新成功"
      })
    } catch (error) {
      next(error)
    }
  })
  /**
   * @description 查询任务列表
   * @param status 状态
   * @param page 页数
   * @param pageSize 每页展示数量
   */
  app.get("/list/:status/:page/:pageSize", async (req, res, next) => {
    console.log(req.params)
    let { status, page, pageSize } = req.params;
    let limit = Number(pageSize);
    let offset = (page - 1) * limit;
    let where = {};
    if (status != -1) {
      where = {
        status
      };
    }
    // 状态: 1 待办 2 完成 3 删除 -1 全部
    let list = await models.Todo.findAndCountAll({
      where,
      offset,
      limit,
      order: [
        ['deadline', 'DESC']
        // ['deadline'] // 正序
      ]
    });
    res.json({
      list,
      message: "分页查询成功"
    })
  })
}