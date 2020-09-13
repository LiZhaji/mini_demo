const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello zhaji'
})

app.listen(3000)
console.log(`项目已启动，地址为 http://127.0.0.1:3000`);