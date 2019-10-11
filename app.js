const express = require('express');
//引入获取post请求体参数的包
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const path = require('path')
    // const router = express.Router();
    //是用哪个唯一内置中间件,托管静态资源文件
app.use(express.static(path.join(__dirname, './Static')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
        res.send('我是首页')
    })
    //第一个请求
app.get('/first', (req, res) => {
    res.send('heloo world')
})

app.post('/getjosn', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

//参数的请求
app.get('/getInfo', (req, res) => {
    if (req.query.username == "admin" && req.query.pwd == "123") {
        console.log('登录成功')
    } else {
        console.log('登录失败')
    }
})
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`)
})