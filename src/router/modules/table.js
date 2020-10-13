/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '生产设计数据管理',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'dynamic-table',
    //   component: () => import('@/views/table/dynamic-table/index'),
    //   name: 'DynamicTable',
    //   meta: { title: '管系生产设计数据管理' }
    // },
    {
      path: 'tablegj',
      name: 'gj',
      component: () => import('@/views/table/index'),
      meta: { title: '管系生产设计数据管理' }
    },
    {
      path: 'tree1tx',
      name: 'tx',
      component: () => import('@/views/table/index1'),
      meta: { title: '铁舾生产设计数据管理' }
    }
    // {
    //   path: 'complex-table',
    //   component: () => import('@/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // }
  ]
}
export default tableRouter
