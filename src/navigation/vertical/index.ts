// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'mdi:view-dashboard'
    },
    {
      title: 'Songs',
      path: '/songs',
      icon: 'mdi:book'
    }
  ]
}

export default navigation
