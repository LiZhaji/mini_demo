const fetch = require("node-fetch");
const { User, Advice } = require("../mysql/index");

function getOpenId(JSCODE) {
  const { APPID, SECRET } = process.env;
  const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`;
  return fetch(api)
    .then((res) => res.json())
    .then((json) => json);
}

// 获取用户信息
async function getUser(openid) {
  if (!openid) {
    return 'error: openid is null'
  }
  let user = null;
  user = await User.findOne({ where: { openid } });
  // 用户不存在，新增用户
  if (!user) {
    await addUser(openid);
    user = await User.findOne({ where: { openid } });
  }
  return user;
}

// 新增用户
async function addUser(openid) {
  await User.create({ openid, createTime: new Date().toLocaleString() });
}

// 新增建议
async function addOneAdvice(openid, advice) {
  const user = await getUser(openid);
  try {
    await Advice.create({
      content: advice,
      userId: user.id,
      createTime: new Date().toLocaleString(),
    });
    return "success";
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
}

module.exports = {
  async login(JSCODE) {
    try {
      // 1. 获取openid
      const { openid = '' } = await getOpenId(JSCODE);
      console.log("openid: ", openid);
      // 2. 根据openid读取数据库，返回用户信息
      const user = await getUser(openid);
      console.log("user: ", user);
      return user;
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
  },
  async addAdvice() {
    const result = await addOneAdvice(...arguments);
    return result;
  },
};
