const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router();

const api = require('./api/index')
// app.use(async ctx => {
//   ctx.body = 'hello zhaji'
// })

router.get("/", async (ctx) => {
  ctx.body = "hello zhaji";
});

// 登录
router.get('/login', async ctx => {
  const {js_code} = ctx.query
  const res = await api.login(js_code)
  ctx.body = res
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log(`项目已启动，地址为 http://127.0.0.1:3000`);
