// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'mdi:view-dashboard',
      auth: false
    },
    {
      title: 'Songs',
      path: '/songs',
      icon: 'mdi:book',
      auth: false
    }
  ]
}

export default navigation
