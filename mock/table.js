const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

const testTableData = Mock.mock({
  'items|30': [{
    id: '@id',
    bussinessKey: '@sentence(10)',
    contactName: '@sentence(10, 20)',
    'flowStatus|1': ['published', 'draft', 'deleted'],
    createBy: 'taocheng',
    createTime: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/testList',
    type: 'get',
    response: config => {
      const items = testTableData; // data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
