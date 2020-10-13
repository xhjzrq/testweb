import defaultSettings from '@/settings'

const title = defaultSettings.title || '舾装三维可视化仿真制造数据管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
