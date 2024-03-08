const langCNObj = {
  'operation': '操作',
  'name': '姓名',
  'address': '地址',
};

const langENObj = {
  'operation': 'Operation',
  'name': 'Name',
  'address': 'Address',
};
module.exports = [
  // 获取语言
  {
    url: '/vue-admin-template/lang/getLangPack',
    type: 'get',
    response: config => {
      // const { token } = config.query

      // const aaa = JSON.parse(JSON.stringify(config));
      // console.log("test aaa", aaa);
      const info = langCNObj || langENObj;
      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: '获取多语言失败！'
      //   }
      // }
      // info.config = config || '';
      return {
        code: 20000,
        data: info,
        // config: config,
      }
    }
  },
]
