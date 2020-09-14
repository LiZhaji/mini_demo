const fetch = require("node-fetch");

function getOpenId(JSCODE ) {
  const { APPID, SECRET } = process.env;
  console.log(APPID, SECRET);
  const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`;
  return fetch(api)
    .then((res) => res.json())
    .then((json) => json);
}

module.exports = {
  async login(JSCODE) {
    // 1. 获取openid
    const openid = await getOpenId(JSCODE)
    return openid

    // 2. 根据openid读取数据库，返回用户信息

  },

};

function getUser(openid) {
  
}