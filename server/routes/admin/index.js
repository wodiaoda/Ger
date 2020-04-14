module.exports = app => {
    const express = require("express");
    const jwt = require("jsonwebtoken")
    const AdminUser = require("../../models/AdminUser")
    const assert = require("http-assert")
    const router = express.Router({
        mergeParams: true
    })

    // 创建资源
    router.post("/", async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改资源
    router.put("/:id", async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除资源
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    // 资源列表
    router.get("/", async (req, res, next) => {
        const token = String(req.headers.authorization || "").split(" ").pop()
        assert(token, 401, "请先登录")
        console.log(token);
        // verify 校验
        const { id } = jwt.verify(token, app.get('secret'))
        assert(id, 401, "请先登录")
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, "请先登录")
        await next()
    }, async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === "Category") {
            queryOptions.populate = "parent"
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    // 资源详情
    router.get("/:id", async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 登录效验中间件
    const authMiddleware = require("../../middleware/auth")
    // 获取模型
    const resourceMiddleware = require("../../middleware/resource")
    app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router)


    const multer = require("multer");
    const upload = multer({ dest: __dirname + "/../../uploads" })
    app.post("/admin/api/upload", authMiddleware(), upload.single("file"), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录页面
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body
        // 1. 根据用户名找用户
        const user = await AdminUser.findOne({ username }).select("+password")
        assert(user, 422, "用户不存在")
        //判断用户
        // if (!user) {
        //     // status设定状态码
        //     return res.status(422).send({
        //         message: '用户名不存在'
        //     })
        // }
        // 2.校验密码
        // compareSync 比较明文密文
        const isValid = require("bcrypt").compareSync(password, user.password)
        assert(isValid, 422, "密码错误")
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: "密码错误"
        //     })
        // }

        // 3.返回token
        // 需要下载 npm i jsonwebtoken

        // sign签名生成一个token,第二个参数：是秘钥
        const token = jwt.sign({ id: user._id, }, app.get("secret"))
        res.send({ token })
    })
    
    // 错误处理的函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
        console.log(err.statusCode);
        
    })

}