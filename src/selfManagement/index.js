module.exports = (app, models) => {
  /**
   * @description 创建数据
   */
  app.post("/self/management/create", async (req, res, next) => {
    // let { name, deadline, content } = req.body;
    // try {
    //   // 数据持久化到数据库
    //   let todo = await models.Todo.create({
    //     name,
    //     deadline,
    //     content
    //   })
    //   res.json({
    //     todo,
    //     message: "创建成功"
    //   })
    // } catch (error) {
    //   next(error);
    // }
  })
}