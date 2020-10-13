import request from '@/utils/request'

export function getlist(name) {
  return request({
    url: '/user/list',
    method: 'get',
    params: {
      name
    }
  })
}

export function deleteuser(id) {
  return request({
    url: '/user/del',
    method: 'get',
    params: {
      id
    }
  })
}

export function insertuser(user) {
  return request({
    url: '/user/save',
    method: 'post',
    data: user

  })
}
export function updateuser(user) {
  console.log('ss')
  console.log(user)
  return request({
    url: '/user/update',
    method: 'post',
    data: user

  })
}
