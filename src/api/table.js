import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getTestList(params) {
  return request({
    url: '/vue-admin-template/table/testList',
    method: 'get',
    params
  })
}
