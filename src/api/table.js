import request from '@/utils/request'

export function getList(project, drawingNo) {
  return request({
    url: '/pipeSketchList/list',
    method: 'get',
    params: { project, drawingNo }
  })
}

export function getA(project, drawingNo) {
  return request({
    url: '/pipeSketchList/all',
    method: 'get',
    params: { project, drawingNo }
  })
}

export function getexcel(project, drawingNo) {
  return request({
    url: '/pipeSketchList/exportExcel',
    method: 'get',
    params: { project, drawingNo },
    responseType: 'blob'

  })
}

export function getTXList(project, drawingNo) {
  return request({
    url: '/outfTxjList/list',
    method: 'get',
    params: { project, drawingNo }
  })
}

export function getATx(project, drawingNo) {
  return request({
    url: '/outfTxjList/txall',
    method: 'get',
    params: { project, drawingNo }
  })
}

export function getTXexcel(project, drawingNo) {
  return request({
    url: '/outfTxjList/exportExcel',
    method: 'get',
    params: { project, drawingNo },
    responseType: 'blob'

  })
}

export function getPdf(fd) {
  return request({
    url: '/files/upload',
    method: 'post',
    data: fd
  })
}

export function getPdfList(project) {
  return request({
    url: '/files/list',
    method: 'get',
    params: { project }
  })
}

export function getListDist() {
  return request({
    url: '/pipeSketchList/getListDist',
    method: 'get'
  })
}

export function getPdfDel(project, fileName) {
  return request({
    url: '/files/del',
    method: 'get',
    params: { project, fileName }
  })
}


export function getDYList(czbh, dymc) {
  return request({
    url: '/dyTree/list',
    method: 'get',
    params: { czbh, czbh }
  })
}
export function getADy(czbh,zzth) {
  return request({
    url: '/dyMx/dyall',
    method: 'get',
    params: { czbh,zzth }
  })
}