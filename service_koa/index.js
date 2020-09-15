const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router();

const api = require('./api/index')
const bodyParser = require("koa-bodyparser");

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

app.listen(3000);
console.log(`项目已启动，地址为 http://127.0.0.1:3000`);
