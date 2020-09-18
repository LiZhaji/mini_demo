const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router();

const api = require('./api/index')
const bodyParser = require("koa-bodyparser");

const https =  require('https')

// app.use(async ctx => {
//   ctx.body = 'hello zhaji'
// })
app.use(bodyParser());

console.log(
  "临时环境变量，数据库名：",
  process.env.DATABASE,
  "\n用户名：",
  process.env.USER,
  "\n密码：",
  process.env.PWD,
  "\n小程序id：",
  process.env.APPID,
  "\n密钥：",
  process.env.SECRET
);
router.get("/", async (ctx) => {
  ctx.body = "hello zhaji";
});

// 登录
router.get('/login', async ctx => {
  const {js_code} = ctx.query
  const res = await api.login(js_code)
  ctx.body = res
})

// 新增建议
router.post('/addAdvice', async ctx => {
  const {openid, advice} = ctx.request.body
  const res = api.addAdvice(openid, advice)
  ctx.body = res
})
app.use(router.routes()).use(router.allowedMethods());

// index.js

const https = require("https")

// SSL options
// 若读取不到文件，则启动http服务
try {
  const options = {
    key: fs.readFileSync("/root/https/xxx.key"), //ssl文件路径  下载下来的证书文件
    cert: fs.readFileSync("/root/https/xxx.pem") //ssl文件路径	下载下来的证书文件
  };
  // 创建https 服务
  const httpsServer = https.createServer(options, app.callback());
  httpsServer.listen(443); // 默认监听443
  console.log("已启动https服务");

} catch (error) {
  app.listen(3000);
  console.log("无证书文件！已启动http服务，端口3000");
}
