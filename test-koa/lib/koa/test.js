// const Koa = require('koa');
const Koa = require('./like-koa2');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log("第一个中间件开始")
  await next();
  console.log("第一个中间件结束")
  const rt = ctx['X-Response-Time'];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log("第二个中间件开始")

  const start = Date.now();
  await next();
  console.log("第二个中间件结束")
  const ms = Date.now() - start;
  ctx["X-Response-Time"] = `${ms}ms`
});

// response

app.use(async ctx => {
  ctx.res.end("Hello World");
});

app.listen(3000);