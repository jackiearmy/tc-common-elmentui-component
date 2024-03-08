import request from '@/utils/request'

export function getLangList(params) {
  return request({
    url: '/vue-admin-template/lang/getLangPack',
    method: 'get',
    params
  })
}
