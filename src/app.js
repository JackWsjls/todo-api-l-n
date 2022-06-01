const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const models = require("../models")

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser 在2019年已经废弃
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ———————————————完成增删改查功能———————————————————
/**
 * @description 创建数据
 */
app.post("/create", async (req, res, next) => {
  let { name, deadline, content } = req.body;
  try {
    // 数据持久化到数据库
    let todo = await models.Todo.create({
      name,
      deadline,
      content
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
    if (todo && status != todo.status) {
      todo = await todo.update({
        status
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
  try {
  let { name, deadline, content, id } = req.body;
      // 数据持久化到数据库
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
  if (todo) {
    todo = await todo.update({
      name,
      deadline,
      content
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

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message:err.message
    })
  }
})

app.listen("2000", function () {
  console.log("脚本成功")
})